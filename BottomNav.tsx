import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const location = useLocation();

  const links = [
    { icon: 'home', label: 'Home', path: '/dashboard' },
    { icon: 'map', label: 'Roadmap', path: '/paths' },
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'person', label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden bg-background shadow-[0px_-4px_10px_rgba(0,0,0,0.05)] rounded-t-xl pb-6">
      {links.map((link, idx) => {
        const isActive = location.pathname === link.path || (link.path === '/profile' && location.pathname.startsWith('/profile'));
        return (
          <Link 
            key={idx}
            to={link.path}
            className={`flex flex-col items-center justify-center transition-transform active:scale-90 ${
              isActive 
                ? 'text-primary shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] rounded-lg p-1' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {link.icon}
            </span>
            <span className="text-[10px] font-body mt-1 font-semibold">{link.label}</span>
          </Link>
        )
      })}
    </nav>
  );
};
