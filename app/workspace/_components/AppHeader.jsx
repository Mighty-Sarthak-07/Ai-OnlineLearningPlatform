"use client"

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Bell, Search, X, CheckCheck, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useNotifications } from '@/context/NotificationContext';

const colorMap = {
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-100',  dot: 'bg-violet-500' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', dot: 'bg-emerald-500' },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-100',   dot: 'bg-amber-500' },
  fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', dot: 'bg-fuchsia-500' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-100',  dot: 'bg-orange-500' },
};

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function AppHeader({ hideSidebar = false }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const { notifications, unreadCount, markAllRead, markRead, clearAll } = useNotifications();

  // Close panel on outside click
  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const togglePanel = () => {
    setPanelOpen(v => !v);
    if (!panelOpen && unreadCount > 0) {
      // Slight delay so user sees the badge before it clears
      setTimeout(markAllRead, 600);
    }
  };

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

        {/* Center: search bar */}
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

        {/* Right: bell + avatar */}
        <div className="flex items-center gap-2" ref={panelRef}>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePanel}
              className={`relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200
                ${panelOpen
                  ? 'bg-violet-50 border-violet-200 text-violet-600'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600'}`}
            >
              <Bell className="w-4 h-4" />
              {/* Unread badge */}
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
                      bg-violet-600 text-white text-[10px] font-bold rounded-full
                      flex items-center justify-center shadow-sm shadow-violet-300"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {panelOpen && (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 top-12 w-80 sm:w-96
                    bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60
                    z-50 overflow-hidden"
                >
                  {/* Panel header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-violet-600" />
                      <span className="font-bold text-slate-800 text-sm">Notifications</span>
                      {notifications.length > 0 && (
                        <span className="text-[11px] font-semibold px-1.5 py-0.5
                          bg-violet-50 text-violet-600 border border-violet-100 rounded-full">
                          {notifications.length}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {notifications.length > 0 && (
                        <>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={markAllRead}
                            title="Mark all read"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                          >
                            <CheckCheck className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={clearAll}
                            title="Clear all"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPanelOpen(false)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Notification list */}
                  <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-50">
                    <AnimatePresence initial={false}>
                      {notifications.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-12 gap-3"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-slate-300" />
                          </div>
                          <p className="text-sm font-medium text-slate-400">No notifications yet</p>
                          <p className="text-xs text-slate-300">Complete chapters to earn XP!</p>
                        </motion.div>
                      ) : (
                        notifications.map((n) => {
                          const c = colorMap[n.color] ?? colorMap.violet;
                          return (
                            <motion.div
                              key={n.id}
                              layout
                              initial={{ opacity: 0, x: 16 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -16, height: 0 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => markRead(n.id)}
                              className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer
                                transition-colors duration-150 hover:bg-slate-50
                                ${!n.read ? 'bg-violet-50/40' : ''}`}
                            >
                              {/* Emoji */}
                              <span className="text-xl flex-shrink-0 mt-0.5">{n.emoji}</span>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 leading-tight">{n.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">{n.message}</p>
                                <p className="text-[10px] text-slate-300 mt-1">{timeAgo(n.createdAt)}</p>
                              </div>

                              {/* Unread indicator */}
                              {!n.read && (
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                              )}
                            </motion.div>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Panel footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/60">
                      <p className="text-[11px] text-slate-400 text-center">
                        {unreadCount === 0 ? 'All caught up! ✨' : `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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