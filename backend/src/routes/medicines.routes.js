import express from "express";
import { readJSON, writeJSON } from "../utils/fileSave.js";

const router = express.Router();
const PATH = "src/db/medicine.json";

/* GET all medicines */
router.get("/", (req, res) => {
    const data = readJSON(PATH);
    res.json(data.medicines);
});

/* Add medicine */
router.post("/", (req, res) => {
    const { name, times } = req.body;

    const data = readJSON(PATH);

    const newMed = {
        id: Date.now(),
        name,
        times
    };

    data.medicines.push(newMed);
    writeJSON(PATH, data);

    res.json({ message: "Medicine added", data: newMed });
});

/* Update medicine */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, times } = req.body;

    const data = readJSON(PATH);

    const index = data.medicines.findIndex(m => m.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    data.medicines[index] = { ...data.medicines[index], name, times };

    writeJSON(PATH, data);

    res.json({ message: "Updated", data: data.medicines[index] });
});

/* Delete medicine */
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const data = readJSON(PATH);

    data.medicines = data.medicines.filter(m => m.id != id);

    writeJSON(PATH, data);

    res.json({ message: "Deleted" });
});

export default router;
