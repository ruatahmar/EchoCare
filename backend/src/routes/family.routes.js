import express from "express";
import { readJSON, writeJSON } from "../utils/fileSave.js";

const router = express.Router();
const PATH = "src/db/family.json";

/* GET all family (minimal) */
router.get("/", (req, res) => {
    const data = readJSON(PATH);

    const simplified = data.family.map((f) => ({
        id: f.id,
        name: f.name,
        relation: f.relation,
    }));

    res.json(simplified);
});

/* ADD family member */
router.post("/", (req, res) => {
    const { name, relation, phone, notes } = req.body;

    const data = readJSON(PATH);

    const newMember = {
        id: Date.now(),
        name,
        relation,
        phone,
        notes
    };

    data.family.push(newMember);
    writeJSON(PATH, data);

    res.json({ message: "Family member added", data: newMember });
});

/* UPDATE family member */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, relation, phone, notes } = req.body;

    const data = readJSON(PATH);

    const index = data.family.findIndex(f => f.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    data.family[index] = { ...data.family[index], name, relation, phone, notes };

    writeJSON(PATH, data);

    res.json({ message: "Updated", data: data.family[index] });
});

/* DELETE family member */
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const data = readJSON(PATH);

    data.family = data.family.filter(f => f.id != id);

    writeJSON(PATH, data);

    res.json({ message: "Deleted" });
});

export default router;
