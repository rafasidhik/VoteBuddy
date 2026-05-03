import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-brand-600" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">Vote<span className="text-brand-600">Buddy</span></span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              onClick={() => window.scrollTo(0, 0)}
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Home
            </Link>
            <Link 
              to="/assistant" 
              className={`text-sm font-medium transition-colors ${isActive('/assistant') ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Assistant
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
