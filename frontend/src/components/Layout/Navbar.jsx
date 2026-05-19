import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

function Navbar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700/60 sticky top-0 z-50 shadow-sm backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-brand-600" />
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Vote<span className="text-brand-600">Buddy</span></span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-brand-600' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Home
            </Link>
            <Link
              to="/assistant"
              className={`text-sm font-medium transition-colors ${isActive('/assistant') ? 'text-brand-600' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Assistant
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

