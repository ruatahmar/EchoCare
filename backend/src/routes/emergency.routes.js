import emergencyData from "../db/emergency.json" with { type: "json" };
import express from "express"
import { readJSON, writeJSON } from "../utils/fileSave.js";

const router = express.Router();
const PATH = "src/db/emergency.json";

router.get("/", (req, res) => {
    const data = readJSON(PATH);
    console.log(data)
    const simplified = data.emergency_contacts.map((f) => ({
        id: f.id,
        name: f.name,
        relation: f.relation,
        phone: f.phone
    }));

    res.json(simplified);
});

export default router