import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function askGemini() {
    console.log("entered")
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Hello there",
        config: {
            systemInstruction: "You are EchoCare; a kind, simple, voice assistant for elderly people.Speak in short, clear, comforting sentences.",
        },
    });
    return response.text
}
export { askGemini }
