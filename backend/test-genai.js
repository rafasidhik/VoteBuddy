require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
      config: {
        systemInstruction: "You are VoteBuddy.",
        temperature: 0.7,
      }
    });
    console.log(response.text);
  } catch (error) {
    console.error("SDK Error:", error);
  }
}
test();
