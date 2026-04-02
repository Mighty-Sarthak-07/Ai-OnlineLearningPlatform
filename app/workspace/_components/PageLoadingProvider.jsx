'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainCircuit } from 'lucide-react'

/**
 * Intercepts every pathname change inside the workspace and shows a
 * 1-second branded loading overlay before revealing the new page.
 */
export default function PageLoadingProvider({ children }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [prevPath, setPrevPath] = useState(pathname)

  useEffect(() => {
    // Only trigger on actual navigation, not on first mount
    if (pathname !== prevPath) {
      setLoading(true)
      setPrevPath(pathname)

      const timer = setTimeout(() => {
        setLoading(false)
      }, 900) // 0.9 s loading screen

      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Label for the loading screen based on destination
  const PAGE_LABELS = {
    '/workspace':             'Dashboard',
    '/workspace/my-learning': 'My Learning',
    '/workspace/explore':     'Explore',
    '/workspace/ai-tools':    'AI Tools',
    '/workspace/billing':     'Billing',
    '/workspace/profile':     'Profile',
  }
  const pageLabel = PAGE_LABELS[pathname] ?? 'Loading'

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center
              bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm"
          >
            {/* Animated ring */}
            <div className="relative mb-5">
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-4 border-violet-100 dark:border-violet-900/50 border-t-violet-600 dark:border-t-violet-500"
              />
              {/* Icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600
                    flex items-center justify-center shadow-md shadow-violet-300"
                >
                  <BrainCircuit className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </div>

            {/* Page name */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Loading</p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {pageLabel}
              </p>
            </motion.div>

            {/* Progress bar at bottom */}
            <motion.div
              className="fixed bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 8 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  )
}
