import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message } = req.body || {};
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  if (!message || typeof message !== "string") return res.status(400).json({ error: "Invalid message" });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Add system instruction
    const systemInstruction = `
    You are a career counseling assistant. 
    Only answer questions related to student careers, education, skills, future scope of fields, and guidance for choosing paths. 
    If a user asks something unrelated (like jokes, politics, personal life, or general chat), politely refuse and say:
    "⚠️ I can only help with career counseling and student future guidance."
    `;

    const result = await model.generateContent(systemInstruction + "\n\nStudent: " + message);
    const reply = result?.response?.text() || "I couldn't generate a response.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(200).json({ reply: "⚠️ Sorry, something went wrong. Please try again." });
  }
}


