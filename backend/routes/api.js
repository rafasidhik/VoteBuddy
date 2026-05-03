const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const db = require('../database');

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// POST /api/users - Create a new user session
router.post('/users', (req, res) => {
  const { age, location, firstTime } = req.body;
  
  if (!age || !location) {
    return res.status(400).json({ error: 'Age and location are required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO users (age, location, first_time) VALUES (?, ?, ?)');
    const info = stmt.run(age, location, firstTime ? 1 : 0);
    res.status(201).json({ userId: info.lastInsertRowid });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// POST /api/assistant - Send message to assistant
router.post('/assistant', async (req, res) => {
  const { userId, message, currentStep } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: 'userId and message are required' });
  }

  try {
    // 1. Get user profile
    const userStmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = userStmt.get(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2. Save user message
    const insertMsgStmt = db.prepare('INSERT INTO messages (user_id, role, content) VALUES (?, ?, ?)');
    insertMsgStmt.run(userId, 'user', message);

    // 3. Construct Gemini Prompt
    const systemInstruction = `You are an expert VoteBuddy assistant for a web app.
    Your goal is to guide the user step-by-step through the voting process.
    
    User Profile:
    - Age: ${user.age}
    - Location: ${user.location}
    - First Time Voter: ${user.first_time ? 'Yes' : 'No'}
    
    Current Step context: Step ${currentStep} of 4 (1: Eligibility, 2: Registration, 3: Documents, 4: Voting Day).
    
    Guidelines:
    1. Keep responses concise, clear, and actionable. Avoid long paragraphs.
    2. Format using markdown (bolding, simple bullet points).
    3. Be encouraging and helpful.
    4. Provide specific information based on their location if possible, otherwise give general US guidelines.
    5. If they ask about polling booths, provide a mocked generic response if you don't know the exact location, mentioning "Based on your location, your polling booth is typically a local school or community center."
    
    Analyze the user's message and provide the next best step or answer their question.`;

    // Fetch history (optional: limit to last N messages for context window)
    const historyStmt = db.prepare('SELECT role, content FROM messages WHERE user_id = ? ORDER BY timestamp ASC');
    const dbHistory = historyStmt.all(userId);
    
    // Format history for Gemini
    const contents = dbHistory.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // In case the last message isn't the one we just received (due to async weirdness, though it should be)
    // We ensure the last message in `contents` is the user's latest message.
    
    // 4. Call Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const aiResponseText = response.text;

    // 5. Save AI response
    insertMsgStmt.run(userId, 'model', aiResponseText);

    // 6. Simple heuristic to determine next step based on keywords in response/message
    let nextStep = currentStep || 1;
    const lowerResp = aiResponseText.toLowerCase();
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('register') || lowerResp.includes('registration deadline')) {
        nextStep = 2;
    } else if (lowerMsg.includes('id') || lowerMsg.includes('bring') || lowerResp.includes('driver\'s license')) {
        nextStep = 3;
    } else if (lowerMsg.includes('booth') || lowerMsg.includes('where') || lowerResp.includes('polling station')) {
        nextStep = 4;
    }

    res.json({
      response: aiResponseText,
      suggestedStep: nextStep
    });

  } catch (error) {
    console.error('Assistant error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;
