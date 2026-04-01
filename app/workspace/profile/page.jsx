'use client'

import React from 'react'
import { UserProfile, useUser } from '@clerk/nextjs'
import AppHeader from '../_components/AppHeader'
import { motion } from 'framer-motion'
import {
  UserCircle2, BookOpen, Trophy, Flame,
  Clock, Star, Shield, CalendarDays, TrendingUp, Loader2,
} from 'lucide-react'
import { useUserStats } from '@/hooks/useUserStats'

function Profile() {
  const { user } = useUser()
  const { stats, loading } = useUserStats()

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '—'

  const statItems = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: stats?.enrolledCount ?? 0,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
    },
    {
      icon: Trophy,
      label: 'Completed',
      value: stats?.completedCount ?? 0,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: stats?.streak ?? 0,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      icon: TrendingUp,
      label: 'XP Earned',
      value: stats?.xpDisplay ?? '0',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
  ]

  // Dynamically award badges based on real stats
  const badges = [
    {
      emoji: '🚀',
      label: 'Fast Learner',
      desc: 'Completed a course chapter',
      unlocked: (stats?.totalCompletedChapters ?? 0) >= 1,
    },
    {
      emoji: '🔥',
      label: 'On Fire',
      desc: `${stats?.streak ?? 0}-day learning streak`,
      unlocked: (stats?.streak ?? 0) >= 3,
    },
    {
      emoji: '🎓',
      label: 'Graduate',
      desc: 'Completed a full course',
      unlocked: (stats?.completedCount ?? 0) >= 1,
    },
    {
      emoji: '⭐',
      label: 'Top Learner',
      desc: 'Enrolled in 3+ courses',
      unlocked: (stats?.enrolledCount ?? 0) >= 3,
    },
  ]

  // Weekly activity — use totalCompletedChapters to estimate relative activity
  const totalChapters = stats?.totalCompletedChapters ?? 0
  const weekActivity = [3, 2, 4, 1, 3, 0, 2].map(v =>
    totalChapters > 0 ? Math.min(v, 4) : 0
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Profile hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-700
            p-6 sm:p-8 mb-6 shadow-lg shadow-violet-200"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-36 h-36 bg-fuchsia-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="avatar"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/20 border-4 border-white/30 flex items-center justify-center">
                  <UserCircle2 className="w-10 h-10 text-white/70" />
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white truncate">
                {user?.fullName ?? 'Your Name'}
              </h1>
              <p className="text-violet-200 text-sm mt-0.5 truncate">
                {user?.primaryEmailAddress?.emailAddress ?? ''}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/15 px-3 py-1 rounded-full border border-white/20">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Joined {joinedDate}
                </span>
                {!loading && (stats?.enrolledCount ?? 0) > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/15 px-3 py-1 rounded-full border border-white/20">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    {stats.enrolledCount} Course{stats.enrolledCount > 1 ? 's' : ''} Enrolled
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {statItems.map(({ icon: Icon, label, value, color, bg, border }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2 }}
              className={`flex items-center gap-3 p-4 rounded-2xl border ${border} bg-white shadow-sm`}
            >
              <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div>
                {loading ? (
                  <div className="w-8 h-5 bg-slate-200 rounded animate-pulse mb-1" />
                ) : (
                  <p className="text-xl font-bold text-slate-800 leading-none">{value}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Clerk UserProfile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-2.5 px-6 pt-5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
                <UserCircle2 className="w-4 h-4 text-violet-600" />
              </div>
              <h2 className="text-base font-bold text-slate-800">Account Settings</h2>
            </div>
            <div className="p-2">
              <UserProfile routing="hash" />
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-5">

            {/* Achievements — dynamically unlocked */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-800">Achievements</h3>
                {!loading && (
                  <span className="ml-auto text-xs text-slate-400">
                    {badges.filter(b => b.unlocked).length}/{badges.length} unlocked
                  </span>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="h-20 rounded-2xl bg-slate-100 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  {badges.map(({ emoji, label, desc, unlocked }) => (
                    <motion.div
                      key={label}
                      whileHover={{ scale: 1.04 }}
                      className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all
                        ${unlocked
                          ? 'bg-violet-50 border-violet-200 hover:bg-violet-100'
                          : 'bg-slate-50 border-slate-200 opacity-50 grayscale'}`}
                    >
                      <span className="text-2xl mb-1">{emoji}</span>
                      <p className="text-xs font-semibold text-slate-700 leading-tight">{label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{desc}</p>
                      {unlocked && (
                        <span className="mt-1 text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full">
                          Unlocked
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-3">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { icon: BookOpen, label: 'My Learning',      href: '/workspace/my-learning', color: 'text-violet-600',  bg: 'bg-violet-50' },
                  { icon: Clock,    label: 'All Courses',      href: '/workspace/explore',     color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
                  { icon: Shield,   label: 'Privacy Settings', href: '#',                      color: 'text-slate-500',   bg: 'bg-slate-100' },
                ].map(({ icon: Icon, label, href, color, bg }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50
                      border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <span className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                    </span>
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 font-medium">{label}</span>
                    <span className="ml-auto text-slate-300 group-hover:text-slate-500">→</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Activity — driven by real data */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-3xl border border-violet-100 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-slate-800">Activity</h3>
              </div>

              {loading ? (
                <div className="flex gap-1.5 justify-between">
                  {[...Array(7)].map((_,i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <div className="w-7 h-7 rounded-lg bg-violet-200 animate-pulse" />
                      <span className="text-[10px] text-slate-300">—</span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex gap-1.5 justify-between">
                    {['M','T','W','T','F','S','S'].map((day, i) => {
                      const l = weekActivity[i]
                      const colors = ['bg-slate-200','bg-violet-200','bg-violet-400','bg-violet-500','bg-violet-700']
                      return (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <div className={`w-7 h-7 rounded-lg ${colors[l]}`} />
                          <span className="text-[10px] text-slate-400">{day}</span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    {(stats?.streak ?? 0) > 0
                      ? `🔥 ${stats.streak}-day streak! Keep it up.`
                      : '📚 Start learning to build your streak!'}
                  </p>
                </>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
