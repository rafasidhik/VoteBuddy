# VoteBuddy 🗳️

**VoteBuddy** is an intelligent, step-by-step election assistant designed to guide citizens through the entire voting process with ease and confidence. Using AI-powered conversations, it simplifies complex election requirements into actionable steps tailored to each user.

---

## ✨ Features

- **Personalized Guidance**: Tailors instructions based on your age, location, and whether you're a first-time voter.
- **AI-Powered Chat**: Features a smart assistant powered by **Google Gemini AI** to answer your specific questions about registration, polling booths, and required documents.
- **Step-by-Step Progress Tracking**:
  1. **Eligibility**: Check if you meet the criteria to vote.
  2. **Registration**: Get guided through the registration process.
  3. **Documents**: Learn exactly what ID you need to bring.
  4. **Voting Day**: Prepare for the polling station experience.
- **Dynamic UI**: A modern, responsive interface built with React and Tailwind CSS.
- **Secure Sessions**: Uses a lightweight SQLite backend to manage user profiles and chat history locally.

---

## 🚀 Tech Stack

### Frontend
- **React 19** & **Vite 8**
- **Tailwind CSS 4** (Modern styling)
- **Lucide React** (Beautiful iconography)
- **React Router Dom 7** (Seamless navigation)
- **React Markdown** (Formatted AI responses)

### Backend
- **Node.js** & **Express 5**
- **Google Gemini AI SDK** (`@google/genai`)
- **Better-SQLite3** (Fast, local storage)
- **Dotenv** (Environment management)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js installed on your machine.
- A **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/)).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/VoteBuddy.git
   cd VoteBuddy
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3001
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start the Backend Server**:
   ```bash
   cd backend
   node server.js
   ```

2. **Start the Frontend Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser to the URL provided by Vite (usually `http://localhost:5173`).

---

## 📁 Project Structure

```text
VoteBuddy/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, StepsPanel)
│   │   ├── pages/          # Page views (LandingPage, AssistantPage)
│   │   └── assets/         # Images and icons
│   └── public/             # Static assets (Favicon, Landing images)
├── backend/                # Express server
│   ├── routes/             # API endpoints (AI integration)
│   └── database.js         # SQLite schema and initialization
└── .gitignore              # Global git ignore rules
```

---

## 🔒 Security & Privacy
- **API Keys**: Never commit your `.env` file. It is included in the `.gitignore`.
- **Local Storage**: All session data is stored in a local SQLite database (`database.sqlite`).
