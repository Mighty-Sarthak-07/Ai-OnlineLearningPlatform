"use client"

import React from 'react'
import { PricingTable } from '@clerk/nextjs'
import AppHeader from '../_components/AppHeader'
import { motion } from 'framer-motion'
import { CreditCard, Zap, Shield, Star, CheckCircle2, Sparkles } from 'lucide-react'

const PERKS = [
  { icon: Zap,          color: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-100',   text: 'Instant AI course generation' },
  { icon: Star,         color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-100',  text: 'Unlimited course enrollments' },
  { icon: Shield,       color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'Priority support & updates' },
  { icon: Sparkles,     color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', text: 'Early access to new features' },
]

const TESTIMONIALS = [
  { name: 'Aarav M.',   role: 'Full-Stack Dev',     quote: 'The Pro plan paid for itself in a week. Incredible AI tools!', avatar: '👨‍💻' },
  { name: 'Priya S.',   role: 'Data Scientist',     quote: 'The course quality and AI recommendations are unmatched.', avatar: '👩‍🔬' },
  { name: 'Rahul K.',   role: 'UX Designer',        quote: 'I finished 4 courses in a month. Best investment ever!', avatar: '🧑‍🎨' },
]

function Billing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Hero header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Choose your plan
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
            Invest in your
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"> learning journey</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Start free or unlock the full power of SkillWorld. Cancel anytime — no hidden fees.
          </p>
        </motion.div>

        {/* ── Perks strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
        >
          {PERKS.map(({ icon: Icon, color, bg, border, text }) => (
            <div key={text}
              className={`flex items-start gap-3 p-4 rounded-2xl border ${border} ${bg} shadow-sm`}>
              <div className={`w-8 h-8 rounded-lg ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-xs font-medium text-slate-700 leading-snug">{text}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Clerk PricingTable ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-8 mb-10"
        >
          <PricingTable />
        </motion.div>

        {/* ── Trust badges ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
        >
          {[
            { icon: Shield,        label: 'Secure Payments',    sub: '256-bit SSL' },
            { icon: CheckCircle2,  label: 'Cancel Anytime',     sub: 'No lock-in' },
            { icon: CreditCard,    label: 'All Cards Accepted',  sub: 'Visa, Mastercard & more' },
            { icon: Star,          label: '4.9 / 5 Rating',     sub: '2,000+ learners' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-2.5 text-slate-500">
              <Icon className="w-5 h-5 text-violet-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-700 leading-none">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Testimonials ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-center text-lg font-bold text-slate-800 mb-5">
            Loved by thousands of learners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map(({ name, role, quote, avatar }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">"{quote}"</p>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{avatar}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-none">{name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Billing
