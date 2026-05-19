import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Eligibility', description: 'Check if you meet the voting requirements.' },
  { id: 2, title: 'Registration', description: 'Register to vote in your state.' },
  { id: 3, title: 'Documents', description: 'Gather required IDs and paperwork.' },
  { id: 4, title: 'Voting Day', description: 'Find your booth and cast your ballot.' },
];

function StepsPanel({ currentStep, userProfile }) {
  const hasProfile = userProfile?.age && userProfile?.location;

  return (
    <div className="flex flex-col w-full gap-6">

      {/* Steps Progress */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Your Journey</h4>
        <div className="space-y-3">
          {steps.map((step) => {
            const isDone = step.id < currentStep;
            const isActive = step.id === currentStep;
            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700/50'
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">{step.id}</span>
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isActive ? 'text-brand-700 dark:text-brand-300' : isDone ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voter Profile Card */}
      {hasProfile ? (
        <div className="w-full p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-colors duration-300">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Voter Profile</h4>
          <div className="space-y-2.5 text-sm">
            {userProfile.age && (
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Age</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{userProfile.age}</span>
              </div>
            )}
            {userProfile.location && userProfile.location !== 'India' && (
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">State</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{userProfile.location}</span>
              </div>
            )}
            {userProfile.firstTime !== null && (
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">First-time voter</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{userProfile.firstTime ? 'Yes' : 'No'}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full p-5 bg-slate-100 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">Your profile will appear here once the assistant learns a bit about you 🇮🇳</p>
        </div>
      )}

    </div>
  );
}

export default StepsPanel;
