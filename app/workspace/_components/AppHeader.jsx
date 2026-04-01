"use client"

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { GraduationCap, Bell, Search } from 'lucide-react';
import Link from 'next/link';

function AppHeader({ hideSidebar = false }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center justify-between px-4 h-16 gap-4">

        {/* Left: trigger + brand */}
        <div className="flex items-center gap-3">
          {!hideSidebar && (
            <div className="hover:bg-slate-100 rounded-lg transition-colors">
              <SidebarTrigger className="text-slate-500 hover:text-slate-800" />
            </div>
          )}

          {hideSidebar && (
            <Link href="/workspace" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600
                flex items-center justify-center shadow-md shadow-violet-200
                group-hover:shadow-violet-300 transition-shadow duration-200">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 text-[17px] tracking-tight hidden sm:block">
                Skill<span className="text-violet-600">World</span>
              </span>
            </Link>
          )}
        </div>

        {/* Center: search bar (only when sidebar is hidden / course page) */}
        {hideSidebar && (
          <div className="hidden md:flex flex-1 max-w-sm mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search chapters..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200
                  bg-slate-50 text-slate-700 placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-300
                  transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center
              bg-slate-50 border border-slate-200 text-slate-500
              hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600
              transition-all duration-200"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
          </motion.button>

          {/* User avatar */}
          <div className="flex items-center justify-center w-9 h-9">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8 ring-2 ring-violet-200 hover:ring-violet-400 transition-all rounded-full',
                },
              }}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default AppHeader;