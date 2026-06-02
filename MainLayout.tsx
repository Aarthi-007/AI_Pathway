import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

export const MainLayout = () => {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 relative max-w-[1440px] mx-auto w-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-6 md:p-10 pb-24 md:pb-10 space-y-12">
          <Outlet />
        </main>
      </div>
      <BottomNav />
      {/* Floating Action Button for chat/help */}
      <button className="fixed bottom-24 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all md:bottom-8 md:right-10 z-40">
        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
      </button>
    </div>
  );
};
