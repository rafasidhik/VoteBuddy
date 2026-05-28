const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const db = require('../database');

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// POST /api/users - Create a new user session (age/location optional; collected via chat)
router.post('/users', (req, res) => {
  const { age = 0, location = 'India', firstTime = true } = req.body;

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
    let user = userStmt.get(userId);
    let currentUserId = userId;
    
    if (!user) {
      // Create user on the fly if it doesn't exist (e.g. wiped ephemeral DB or local-ID fallback)
      const stmt = db.prepare('INSERT INTO users (age, location, first_time) VALUES (?, ?, ?)');
      const info = stmt.run(0, 'India', 1);
      currentUserId = info.lastInsertRowid;
      user = { age: 0, location: 'India', first_time: 1 };
    }

    // 2. Save user message
    const insertMsgStmt = db.prepare('INSERT INTO messages (user_id, role, content) VALUES (?, ?, ?)');
    insertMsgStmt.run(currentUserId, 'user', message);

    // 3. Construct Gemini Prompt
    const systemInstruction = `You are VoteBuddy, an expert assistant exclusively for **Indian voters**. 
This platform is built solely for Indian citizens and covers Indian election processes governed by the Election Commission of India (ECI).

IMPORTANT RULES:
- Only provide information relevant to Indian elections, Indian voter registration, and Indian voting procedures.
- If the user asks about elections or voting in any other country, politely clarify that VoteBuddy is exclusively for Indian voters and redirect them to Indian election topics.
- Always refer to official Indian resources: voters.eci.gov.in, NVSP, Form 6, EPIC (Voter ID card), EVM (Electronic Voting Machine), Booth Level Officer (BLO), etc.

COLLECTING USER INFO:
- If the user hasn't shared their age and Indian state yet, ask for it naturally in your first response.
- Once you know their age and state, provide personalized guidance for that Indian state.
- If age < 18, explain they are not yet eligible but can pre-register at 17 years and 6 months using Form 6.
- If they are a first-time voter, walk them through the full process step by step.

USER PROFILE (from stored session):
- Age: ${user.age > 0 ? user.age : 'Not provided yet — ask the user'}
- State: ${user.location !== 'India' ? user.location : 'Not provided yet — ask the user'}
- First Time Voter: ${user.first_time ? 'Yes' : 'No'}

Current Step context: Step ${currentStep} of 4 (1: Eligibility, 2: Registration, 3: Documents, 4: Voting Day).

RESPONSE GUIDELINES:
1. Be concise, clear, and encouraging. Use short paragraphs and bullet points.
2. Use markdown formatting (bold, bullets, numbered lists).
3. Always cite the official ECI portal (https://voters.eci.gov.in/) when relevant.
4. Provide state-specific details (e.g., state election commission links) when the user's state is known.
5. Be warm and approachable — many users may be first-time voters who feel nervous.`;

    // Fetch history (optional: limit to last N messages for context window)
    const historyStmt = db.prepare('SELECT role, content FROM messages WHERE user_id = ? ORDER BY timestamp ASC');
    const dbHistory = historyStmt.all(currentUserId);
    
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
    insertMsgStmt.run(currentUserId, 'model', aiResponseText);

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
      suggestedStep: nextStep,
      newUserId: currentUserId !== userId ? currentUserId : undefined
    });

  } catch (error) {
    console.error('Assistant error:', error);
    if (error.status === 503 || (error.message && error.message.includes('high demand'))) {
      res.status(503).json({ error: 'VoteBuddy AI is currently experiencing high demand. Please try again in a few minutes.' });
    } else if (error.status === 429 || (error.message && error.message.includes('quota'))) {
      res.status(429).json({ error: 'You are asking questions a bit too fast! Please wait 60 seconds and try again.' });
    } else {
      res.status(500).json({ error: 'Failed to process request', details: error.message });
    }
  }
});

module.exports = router;
