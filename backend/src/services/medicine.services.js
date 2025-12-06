import fs from "fs";
import path from "path";

// Load medicine data
const filePath = path.resolve("src/db/medicine.json");
const rawData = fs.readFileSync(filePath);
const { medicines } = JSON.parse(rawData);

// Get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();

    return now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Check if a time is within X minutes of now
function isWithinMinutes(time, now, window = 10) {
    const [h1, m1] = time.split(":").map(Number);
    const [h2, m2] = now.split(":").map(Number);

    const t1 = h1 * 60 + m1;
    const t2 = h2 * 60 + m2;

    return Math.abs(t1 - t2) <= window;
}

// ✅ 1. What medicine is due right now?
export function getMedicinesForNow() {
    const now = getCurrentTime();

    const due = medicines.filter((med) =>
        med.times.some((t) => isWithinMinutes(t, now))
    );

    return { now, due };
}

// ✅ 2. What is the NEXT medicine?
export function getNextMedicine() {
    const now = getCurrentTime();
    const currentMins = parseInt(now.split(":")[0]) * 60 + parseInt(now.split(":")[1]);

    let closest = null;
    let closestTime = Infinity;

    for (const med of medicines) {
        for (const time of med.times) {
            const [h, m] = time.split(":").map(Number);
            const total = h * 60 + m;

            if (total > currentMins && total < closestTime) {
                closest = { ...med, nextTime: time };
                closestTime = total;
            }
        }
    }

    return closest;
}

// ✅ 3. Get specific medicine by name
export function getMedicineByName(name) {
    if (!name) return null;

    return medicines.find(
        (m) => m.name.toLowerCase() === name.toLowerCase()
    );
}

// ✅ 4. Get all medicines
export function getAllMedicines() {
    return medicines;
}
