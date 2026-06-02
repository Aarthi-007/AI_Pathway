import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { user, login, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Roadmap', path: '/dashboard' },
    { name: 'Dashboard', path: '/dashboard' }, // Adjusted to match the design
    { name: 'Community', path: '/community' },
  ];

  return (
    <header className="bg-background text-primary font-body font-medium text-on-surface flex justify-between items-center px-8 py-4 w-full sticky top-0 z-50 shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.6)]">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-headline font-semibold text-primary tracking-tight">
          PathwayAI
        </Link>
        <nav className="hidden md:flex gap-8 ml-8">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to={link.path}
              className={`${location.pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} transition-colors duration-200`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex neomorph-inset rounded-full px-4 py-2 items-center gap-2">
          <span className="material-symbols-outlined text-outline text-sm">search</span>
          <input 
            type="text" 
            placeholder="Search paths..." 
            className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-outline w-48 outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button className="neomorph-raised w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="neomorph-raised w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div 
                onClick={logout}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shadow-sm cursor-pointer hover:opacity-80 transition-opacity bg-surface-container flex items-center justify-center"
                title="Sign out"
              >
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
            </>
          ) : (
            <button 
              onClick={login}
              className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
