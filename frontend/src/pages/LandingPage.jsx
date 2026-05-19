import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, AlertTriangle, Clock, UserCheck, MapPin } from 'lucide-react';

function LandingPage() {
  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex-1 bg-white dark:bg-slate-900 transition-colors duration-300">

      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-brand-200 dark:bg-brand-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Your trusted election guide</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                Understand Elections. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
                  Vote with Confidence.
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
                A simple, step-by-step assistant to guide you through the entire voting process. No jargon, just clear instructions tailored to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/assistant"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex justify-center items-center px-8 py-4 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-full border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-purple-100 dark:from-brand-900/40 dark:to-purple-900/40 rounded-3xl transform rotate-3 scale-105 -z-10" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/50 dark:border-slate-700/50">
                {images.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Slide ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === currentImageIdx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info Cards Section ── */}
      <div id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Everything you need to know</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Our assistant guides you through every step — from checking eligibility to casting your ballot.
            </p>
          </div>

          {/* 3-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* ── Card 1: Eligibility & Registration ── */}
            <div className="flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-3">
                  <UserCheck className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Eligibility &amp; Registration</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Check if you're eligible to vote and register online easily.</p>
              </div>
              {/* Card body */}
              <div className="px-6 py-4 flex-1 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Who Can Vote?</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">You are eligible if you:</p>
                  <ul className="space-y-1.5">
                    {['Are 18+ years old', 'Are an Indian citizen', 'Have a valid residential address', 'Are not disqualified by law'].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">How to Register</p>
                  <ol className="space-y-1.5 list-none">
                    {[
                      <span key="step1">Create an account on the <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-semibold hover:underline">voter portal</a></span>,
                      'Select Form 6',
                      'Fill in your details',
                      'Upload documents',
                      'Submit and track your application',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* ── Card 2: Required Documents ── */}
            <div className="flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Required Documents</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Carry at least one valid photo ID to vote.</p>
              </div>
              <div className="px-6 py-4 flex-1 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Accepted IDs</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['Aadhaar Card', 'Voter ID (EPIC)', 'Passport', 'Driving License', 'PAN Card', 'Passbook with photo', 'Ration Card', 'Student ID (if applicable)'].map(id => (
                      <div key={id} className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        {id}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Before Voting</p>
                  <ul className="space-y-1.5">
                    {['Check your name on the voter list', 'Carry original documents', 'Know your polling booth details'].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-xl p-3">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 dark:text-red-400 font-medium">Without valid ID, you may not be allowed to vote.</p>
                </div>
              </div>
            </div>

            {/* ── Card 3: Voting Day Preparation ── */}
            <div className="flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Voting Day Preparation</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get ready for a smooth voting experience.</p>
              </div>
              <div className="px-6 py-4 flex-1 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Before You Go</p>
                  <ul className="space-y-1.5">
                    {['Check your polling booth location', 'Carry a valid photo ID', 'Visit during official voting hours'].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Voting Process</p>
                  <ol className="space-y-1.5">
                    {[
                      'Show your ID for verification',
                      'Get ink mark on your finger',
                      'Enter the voting booth',
                      'Cast your vote using the EVM',
                      'Receive confirmation beep/light',
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Important Guidelines</p>
                  <ul className="space-y-1.5">
                    {['Follow polling officer instructions', 'Maintain queue discipline', 'Mobile phones may not be allowed', 'Keep your vote private'].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
