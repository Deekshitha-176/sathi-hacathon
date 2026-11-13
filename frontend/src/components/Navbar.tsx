import React from 'react';
import { Activity, PlusCircle } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard' | 'results';
  onNavigate: (view: 'landing' | 'dashboard' | 'results') => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenUpload
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Report<span className="text-teal-700">Saathi</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Medical lab reports in simple language
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              currentView === 'landing'
                ? 'text-teal-800 bg-teal-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            About
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              currentView === 'dashboard'
                ? 'text-teal-800 bg-teal-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm shadow-teal-700/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Report</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
