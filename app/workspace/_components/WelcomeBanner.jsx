'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Rocket, Star, Loader2 } from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';

function WelcomeBanner() {
  const { user } = useUser();
  const firstName = user?.firstName ?? 'Learner';
  const { stats, loading } = useUserStats();

  const statItems = [
    {
      icon: Flame,
      label: 'Day Streak',
      value: loading ? null : (stats?.streak ?? 0),
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-500/10',
      border: 'border-orange-100 dark:border-orange-500/20',
    },
    {
      icon: BookOpen,
      label: 'Courses Active',
      value: loading ? null : (stats?.enrolledCount ?? 0),
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-500/10',
      border: 'border-violet-100 dark:border-violet-500/20',
    },
    {
      icon: Star,
      label: 'XP Earned',
      value: loading ? null : (stats?.xpDisplay ?? '0'),
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      border: 'border-amber-100 dark:border-amber-500/20',
    },
    {
      icon: Rocket,
      label: 'Completed',
      value: loading ? null : (stats?.completedCount ?? 0),
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      border: 'border-emerald-100 dark:border-emerald-500/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-8"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-700 dark:from-violet-900 dark:via-violet-950 dark:to-fuchsia-950 p-6 md:p-8 mb-5 shadow-lg shadow-violet-200 dark:shadow-none border border-transparent dark:border-violet-500/20">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-fuchsia-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-violet-200 text-sm font-medium mb-1">Welcome back 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Hey, {firstName}!</h1>
            <p className="text-violet-200 text-sm mt-1.5 max-w-xs">
              {loading
                ? 'Loading your progress...'
                : stats?.enrolledCount > 0
                  ? `You have ${stats.enrolledCount} active course${stats.enrolledCount > 1 ? 's' : ''}. Keep going! 🔥`
                  : 'Ready to start your learning journey? 🚀'}
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl hidden sm:block"
          >
            🎓
          </motion.div>
        </div>
      </div>

      {/* Stat chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map(({ icon: Icon, label, value, color, bg, border }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${border} bg-white dark:bg-slate-900 shadow-sm dark:shadow-none`}
          >
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              {loading ? (
                <div className="w-8 h-5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-1" />
              ) : (
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200 leading-none">{value}</p>
              )}
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default WelcomeBanner;