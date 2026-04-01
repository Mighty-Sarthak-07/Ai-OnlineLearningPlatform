"use client"

import React from 'react'
import EnrollCourseList from '../_components/EnrollCourseList'
import WelcomeBanner from '../_components/WelcomeBanner'
import AppHeader from '../_components/AppHeader'
import { BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

function MyLearning() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <WelcomeBanner />

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600
            flex items-center justify-center shadow-md shadow-violet-200">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Learning</h1>
            <p className="text-sm text-slate-400">Track your courses and continue where you left off</p>
          </div>
        </motion.div>

        <EnrollCourseList />
      </div>
    </div>
  )
}

export default MyLearning
