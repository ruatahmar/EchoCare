import express from "express"
import { askGemini } from "./utils/gemini.js";
import router from "./routes/analyze.routes.js";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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
app.use("", router)
const port = process.env.port

app.listen(port, () => {
    console.log(`Server is now up on port:${port}`)
})