import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Eligibility', description: 'Check if you meet the voting requirements.' },
  { id: 2, title: 'Registration', description: 'Register to vote in your state.' },
  { id: 3, title: 'Documents', description: 'Gather required IDs and paperwork.' },
  { id: 4, title: 'Voting Day', description: 'Find your booth and cast your ballot.' },
];

function StepsPanel({ currentStep, userProfile }) {
  return (
    <div className="flex flex-col h-full items-center justify-center w-full">
      {/* Mini Profile Card */}
      {userProfile && (
        <div className="w-full p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">Voter Profile</h4>
          <div className="space-y-3 text-base">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Age:</span>
              <span className="font-bold text-slate-900">{userProfile.age}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Location:</span>
              <span className="font-bold text-slate-900">{userProfile.location}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">First-time:</span>
              <span className="font-bold text-slate-900">{userProfile.firstTime ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepsPanel;
