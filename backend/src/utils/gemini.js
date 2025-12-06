import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are EchoCare, a simple, kind, and supportive voice assistant for elderly people.

Step 1: Classify the user's message into ONE of these categories:
MEDICINE, MEMORY, EMERGENCY, GENERAL
Memory relates to any name shes asking about
Step 2: Extract useful information if present:
- medicine_name (correct any typo or spelling mistake)
- time (if mentioned)
- person (self / family member name)
- emotion (sad, scared, confused, happy, etc)

Step 3: Generate a warm, simple, caring reply (1 to 2 short sentences, very easy language).

Return ONLY this exact format (no markdown, no extra text):

{
  "category": "",
  "data": {
    "medicine_name": null,
    "time": null,
    "person": null,
    "emotion": null
  },
  "reply": ""
}
IMPORTANT RULES:
- You DO NOT know the user’s medicine names, schedule, family members, or personal data.
- You MUST NOT invent any medicine name, time, dosage, or person.
- If the message is about medicine, use a generic reply like:
  "Let me check your medicine schedule for you."
Do not add any extra text.`;

async function askGemini(userMessage) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage,
        config: {
            temperature: 0.3,
            systemInstruction: SYSTEM_PROMPT
        }
    });
    const text = response.text;
    const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    let data;

    try {
        data = JSON.parse(cleanedText);
    } catch (err) {
        console.error("Invalid Gemini JSON:", cleanedText);
        return {
            category: "GENERAL",
            data: {},
            reply: "Sorry, I didn't understand that. Can you say it again?"
        };
    }
    console.log(data)
    return data;
}

export { askGemini };
