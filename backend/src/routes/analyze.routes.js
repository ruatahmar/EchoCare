import express from "express";
import { askGemini } from "../utils/gemini.js";
import { getMedicinesForNow, getNextMedicine, getMedicineByName, getAllMedicines } from "../services/medicine.services.js";
import { getAllFamily, getFamilyMemberByName } from "../services/family.services.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();


const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const result = await askGemini(message);

    // ACTION LOGIC
    let action = null;
    const lower = message.toLowerCase();
    switch (result.category) {
        case "MEDICINE":
            let medicineAction = null;


            // 1. Asking for a specific medicine
            if (result.data.medicine_name) {
                const med = getMedicineByName(result.data.medicine_name);

                if (med) {
                    medicineAction = {
                        type: "SPECIFIC_MEDICINE",
                        data: med,
                        reply: `You take ${med.name} at ${med.times.join(" and ")}. ${med.notes}`
                    };
                } else {
                    medicineAction = {
                        type: "NOT_FOUND",
                        reply: `I couldn’t find that medicine dear.`
                    };
                }
            }

            // 2. Asking for next medicine
            else if (lower.includes("next")) {
                const next = getNextMedicine();

                if (next) {
                    medicineAction = {
                        type: "NEXT_MEDICINE",
                        data: next,
                        reply: `Your next medicine is ${next.name} at ${next.nextTime}.`
                    };
                } else {
                    medicineAction = {
                        type: "NO_MORE",
                        reply: `You have no more medicines for today.`
                    };
                }
            }
            else if (lower.includes("show", "list")) {
                const medicines = getAllMedicines()
                medicineAction = {
                    type: "SHOW_MEDICINE",
                    data: medicines,
                    reply: `Here are all your medications`
                };
            }
            // 4. Asking for now
            else {
                const { due } = getMedicinesForNow();

                if (due.length > 0) {
                    const med = due[0];

                    medicineAction = {
                        type: "TAKE_NOW",
                        data: med,
                        reply: `It’s time to take ${med.name}. ${med.dose}, ${med.notes}.`
                    };
                } else {
                    medicineAction = {
                        type: "NOT_NOW",
                        reply: `You don’t have any medicine to take right now.`
                    };
                }
            }

            action = medicineAction;
            break;

        case "MEMORY":

            // 1. If they say: "who is my family", "show my family", "list family"
            if (
                lower.includes("my family") ||
                lower.includes("who are my") ||
                lower.includes("list") ||
                lower.includes("family members")
            ) {
                const list = getAllFamily();

                action = {
                    type: "FAMILY_LIST",
                    data: list
                };

                break;
            }

            // 2. If a name is detected: "Who is Dela?"
            if (result.data.person) {
                const member = getFamilyMemberByName(result.data.person);

                if (member) {
                    result.reply = `${member.name} is your ${member.relation}. Contacts: ${member.phone}. Heres a short note to remember; ${member.notes}`
                    action = {
                        type: "FAMILY_MEMBER",
                        data: {
                            name: member.name,
                            relation: member.relation,
                            phone: member.phone,
                            notes: member.notes
                        }
                    };
                } else {
                    result.reply = "This person is not found in our database"
                    action = {
                        type: "NOT_FOUND"
                    };
                }

                break;
            }

            // 3. Fallback if confused
            action = {
                type: "ASK_FAMILY_CLARIFICATION"
            };

            break;

        case "EMERGENCY":

            const emergencyData = JSON.parse(
                fs.readFileSync(path.join(__dirname, "src/db/emergency.json"), "utf-8")
            );
            const contacts = emergencyData.emergency_contacts;

            if (result.data.person) {
                const found = contacts.find(c =>
                    c.relation.toLowerCase().includes(result.data.person.toLowerCase()) ||
                    c.name.toLowerCase().includes(result.data.person.toLowerCase())
                );

                if (found) {
                    action = {
                        type: "CALL_EMERGENCY",
                        data: found
                    };
                    break;
                }
            }

            action = {
                type: "CALL_EMERGENCY",
                data: contacts[0]
            };
            break;

        default:
            action = {
                type: "GENERAL_RESPONSE"
            };
    }

    res.json({
        reply: action.reply || result.reply,
        action
        // raw: result
    });
});

export default router;
