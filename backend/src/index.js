import express from "express"
import { askGemini } from "./utils/gemini.js";
import cors from "cors";
import router from "./routes/analyze.routes.js";
import familyRoutes from "./routes/family.routes.js";
import medicineRoutes from "./routes/medicines.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js"

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/medicine", medicineRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/analyze", router)
app.use("/api/emergency", emergencyRoutes)
// app.post("/analyze",)
app.post("/ask", async (req, res) => {

    try {
        const reply = await askGemini(req.body.text);
        res.json({ reply });
    } catch (err) {
        res.status(500).json({
            error: "Gemini failed",
            bruh: err
        });
    }
});

const port = process.env.port

app.listen(port, () => {
    console.log(`Server is now up on port:${port}`)
})