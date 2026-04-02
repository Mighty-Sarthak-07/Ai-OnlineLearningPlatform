"use client"

import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'
import { toast } from 'react-hot-toast'
import { PlayCircle, Loader2 } from 'lucide-react'

function EnrollCourseList() {
  const [enrollCourses, setEnrollCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    GetEnrollCourses()
  }, [])

  const GetEnrollCourses = async () => {
    try {
      setIsLoading(true)
      const result = await axios.get('/api/enroll-course')
      setEnrollCourses(result.data?.data ?? [])
    } catch (error) {
      console.error('Error fetching enrolled courses:', error)
      toast.error('Failed to load enrolled courses')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-8">
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-500/10 border border-fuchsia-100 dark:border-fuchsia-500/20 flex items-center justify-center">
          <PlayCircle className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Continue Learning</h2>
        {!isLoading && enrollCourses.length > 0 && (
          <span className="text-xs font-semibold px-2 py-0.5 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-100 dark:border-fuchsia-500/20 rounded-full">
            {enrollCourses.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse h-72" />
          ))}
        </div>
      ) : enrollCourses.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {enrollCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollcourses} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-12
          border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/60 dark:bg-slate-900/50">
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-500/10 border border-fuchsia-100 dark:border-fuchsia-500/20 flex items-center justify-center">
            <PlayCircle className="w-5 h-5 text-fuchsia-500 dark:text-fuchsia-400" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-600 dark:text-slate-300">No enrolled courses yet</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">Explore courses and start learning!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnrollCourseList