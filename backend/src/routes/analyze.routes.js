import express from "express";
import { askGemini } from "../utils/gemini.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const result = await askGemini(message);

    // ACTION LOGIC
    let action = null;

    switch (result.category) {
        case "MEDICINE":
            action = {
                type: "SHOW_MEDICINE_REMINDER",
                medicine: result.data.medicine_name,
                time: result.data.time
            };
            break;

        case "MEMORY":
            action = {
                type: "FETCH_MEMORY",
                person: result.data.person
            };
            break;

        case "EMOTIONAL":
            action = {
                type: "SHOW_COMFORT"
            };
            break;

        case "EMERGENCY":
            action = {
                type: "CALL_EMERGENCY"
            };
            break;

        default:
            action = {
                type: "GENERAL_RESPONSE"
            };
    }

    res.json({
        reply: result.reply,
        action,
        raw: result
    });
});

export default router;
