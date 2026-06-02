import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { icon: 'home', label: 'Home', path: '/dashboard' },
    { icon: 'timeline', label: 'My Paths', path: '/paths' },
    { icon: 'military_tech', label: 'Achievements', path: '/profile' },
    { icon: 'psychology', label: 'Mentors', path: '/mentors' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col p-6 space-y-4 bg-background h-[calc(100vh-72px)] w-64 rounded-r-xl sticky top-[72px] shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)] overflow-y-auto">
      <div className="flex flex-col items-center py-4 mb-4">
        <div className="w-16 h-16 neomorph-raised rounded-2xl flex items-center justify-center text-primary mb-3">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
        </div>
        <h2 className="font-headline font-semibold text-primary">PathwayAI</h2>
        <p className="text-xs text-on-surface-variant opacity-70">AI Learning Platform</p>
      </div>

      <nav className="space-y-3 flex-1">
        {links.map((link, idx) => {
          const isActive = location.pathname === link.path || (link.path === '/profile' && location.pathname.startsWith('/profile'));
          return (
            <Link 
              key={idx}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-background neomorph-inset text-primary font-semibold' 
                  : 'text-on-surface-variant hover:shadow-[4px_4px_8px_rgba(0,0,0,0.04)] active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-8 mt-auto">
        <button 
          onClick={() => navigate('/generate')}
          className="w-full neomorph-raised py-4 rounded-xl text-primary font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Start New Goal
        </button>
      </div>
    </aside>
  );
};
