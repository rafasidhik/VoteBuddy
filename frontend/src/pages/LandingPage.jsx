import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MapPin, FileText, CheckCircle2, AlertTriangle, Clock, Lightbulb } from 'lucide-react';

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
    <div className="flex-1 bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100">
        {/* Decorative background blobs */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Your trusted election guide</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Understand Elections. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
                  Vote with Confidence.
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
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
                  className="inline-flex justify-center items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-purple-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/50">
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

      {/* Features Section */}
      <div id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to know</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our smart assistant guides you through every step of the journey, ensuring you're fully prepared for election day.</p>
          </div>

          <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Eligibility & Registration</h3>
              <p className="text-slate-600 leading-relaxed mb-6">Find out if you're eligible to vote and get step-by-step guidance on how to register in your area.</p>
              
              <div className="prose prose-sm prose-slate max-w-none text-left">
                <h4 className="flex items-center gap-2 font-bold text-slate-800"><CheckCircle2 className="w-4 h-4 text-green-500"/> Who is Eligible to Vote?</h4>
                <p>You can register as a voter if you:</p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Are 18 years or older</li>
                  <li>Are a citizen of India</li>
                  <li>Have a valid residential address in your constituency</li>
                  <li>Are not disqualified by law</li>
                </ul>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><FileText className="w-4 h-4 text-blue-500"/> How to Register</h4>
                <p>You can apply online through the official portal: <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-bold hover:underline">Voters' Service Portal</a></p>
                <p className="font-semibold mt-2">Step-by-step process:</p>
                <ol className="list-decimal pl-5 mb-4">
                  <li>Visit the portal and create an account</li>
                  <li>Select "New Voter Registration (Form 6)"</li>
                  <li>Fill in your personal and address details</li>
                  <li>Upload required documents</li>
                  <li>Submit your application</li>
                  <li>Track status using your reference number</li>
                </ol>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><MapPin className="w-4 h-4 text-pink-500"/> Quick Summary</h4>
                <ul className="list-none space-y-1">
                  <li>✔ Check eligibility</li>
                  <li>✔ Register online</li>
                  <li>✔ Upload documents</li>
                  <li>✔ Submit & track</li>
                  <li>✔ Get your Voter ID</li>
                </ul>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Required Documents</h3>
              <p className="text-slate-600 leading-relaxed mb-6">Never get turned away. Here's exactly what you need to bring to the polling station.</p>
              
              <div className="prose prose-sm prose-slate max-w-none text-left">
                <h4 className="flex items-center gap-2 font-bold text-slate-800"><ShieldCheck className="w-4 h-4 text-purple-500"/> Valid ID Proof (Bring Any One)</h4>
                <p>You must carry at least one valid photo ID:</p>
                <ul className="list-disc pl-5 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <li>Aadhaar Card</li>
                  <li>Voter ID (EPIC)</li>
                  <li>Passport</li>
                  <li>Driving License</li>
                  <li>PAN Card</li>
                  <li>Bank/Post Office Passbook with photo</li>
                  <li>Ration Card</li>
                  <li>Student ID (if applicable)</li>
                </ul>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><FileText className="w-4 h-4 text-blue-500"/> Voter Information Slip (Optional but Helpful)</h4>
                <ul className="list-disc pl-5 mb-4">
                  <li>Issued before elections</li>
                  <li>Contains your polling booth details</li>
                  <li>Not mandatory, but speeds up verification</li>
                </ul>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><MapPin className="w-4 h-4 text-pink-500"/> Check Your Name in Voter List</h4>
                <p className="mb-2">Before going to vote:</p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Make sure your name is on the electoral roll</li>
                  <li>Verify through the official portal: <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-bold hover:underline">Voters' Service Portal</a></li>
                </ul>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><AlertTriangle className="w-4 h-4 text-yellow-500"/> Important Guidelines</h4>
                <ul className="list-disc pl-5 mb-4">
                  <li>Carry original documents (not just photocopies)</li>
                  <li>Ensure your ID photo is clear and recognizable</li>
                  <li>Reach the polling booth during voting hours</li>
                  <li>Follow instructions from election officials</li>
                </ul>

                <div className="bg-red-50 p-4 rounded-lg mb-4 border border-red-100">
                  <h4 className="flex items-center gap-2 font-bold text-red-800 mb-2 mt-0"><AlertTriangle className="w-4 h-4"/> What Happens If You Don't Have ID?</h4>
                  <ul className="list-disc pl-5 mb-0 text-red-700">
                    <li>You may not be allowed to vote</li>
                    <li>In some cases, alternative verification may be required</li>
                  </ul>
                </div>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><CheckCircle2 className="w-4 h-4 text-green-500"/> Quick Checklist</h4>
                <ul className="list-none space-y-1">
                  <li>✔ Valid photo ID</li>
                  <li>✔ Confirm your name on voter list</li>
                  <li>✔ Know your polling booth</li>
                  <li>✔ Visit on election day</li>
                </ul>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Voting Day Preparation</h3>
              <p className="text-slate-600 leading-relaxed mb-6">Learn how to find your polling booth and what to expect when you step into the voting booth.</p>
              
              <div className="prose prose-sm prose-slate max-w-none text-left">
                <h4 className="flex items-center gap-2 font-bold text-slate-800"><MapPin className="w-4 h-4 text-pink-500"/> Find Your Polling Booth</h4>
                <p className="mb-2">Before election day:</p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Check your polling station details online: <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-bold hover:underline">Voters' Service Portal</a></li>
                  <li>Look at your Voter Information Slip (if provided)</li>
                  <li>Note the booth number and address</li>
                </ul>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><Clock className="w-4 h-4 text-blue-500"/> Plan Your Visit</h4>
                <ul className="list-disc pl-5 mb-4">
                  <li>Check official voting hours</li>
                  <li>Try to go early to avoid long queues</li>
                  <li>Carry your valid photo ID</li>
                </ul>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><ShieldCheck className="w-4 h-4 text-purple-500"/> What Happens at the Polling Station?</h4>
                <div className="space-y-3 mb-4">
                  <div>
                    <span className="font-bold text-slate-800">Step 1: Verification</span>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Show your ID to election officials</li>
                      <li>Your name will be checked on the voter list</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Step 2: Ink Mark</span>
                    <p className="mt-1">An indelible ink mark is applied on your finger</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Step 3: Enter Voting Booth</span>
                    <p className="mt-1">You'll be directed to a private voting compartment</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Step 4: Cast Your Vote</span>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Use the Electronic Voting Machine (EVM)</li>
                      <li>Press the button next to your chosen candidate</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Step 5: Confirmation</span>
                    <p className="mt-1">A beep sound or confirmation light indicates your vote is recorded</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-100">
                  <h4 className="flex items-center gap-2 font-bold text-yellow-800 mb-2 mt-0"><AlertTriangle className="w-4 h-4"/> Important Guidelines</h4>
                  <ul className="list-disc pl-5 mb-0 text-yellow-800">
                    <li>Mobile phones may not be allowed inside the booth</li>
                    <li>Maintain queue discipline</li>
                    <li>Follow instructions from polling officers</li>
                    <li>Do not share your vote choice with others</li>
                  </ul>
                </div>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><Lightbulb className="w-4 h-4 text-orange-500"/> Tips for a Smooth Experience</h4>
                <ul className="list-disc pl-5 mb-4">
                  <li>Double-check your polling location in advance</li>
                  <li>Keep your ID ready</li>
                  <li>Stay patient during busy hours</li>
                  <li>Ask officials if you need help</li>
                </ul>

                <h4 className="flex items-center gap-2 font-bold text-slate-800"><CheckCircle2 className="w-4 h-4 text-green-500"/> Quick Checklist</h4>
                <ul className="list-none space-y-1">
                  <li>✔ Check polling booth location</li>
                  <li>✔ Carry valid ID</li>
                  <li>✔ Visit during voting hours</li>
                  <li>✔ Follow the process calmly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
