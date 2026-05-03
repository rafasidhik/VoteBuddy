import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AssistantPage from './pages/AssistantPage';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
