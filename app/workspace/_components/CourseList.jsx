"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddNewCourse from './AddNewCourse'
import CourseCard from './CourseCard'
import { BookPlus, GraduationCap } from 'lucide-react'

function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    user && GetCoursesList()
  }, [user])

  const GetCoursesList = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/courses')
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">My Created Courses</h2>
          {courses.length > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20 rounded-full">
              {courses.length}
            </span>
          )}
        </div>
        <AddNewCourse>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
              bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
              shadow-sm shadow-violet-200 hover:shadow-md transition-all"
          >
            <BookPlus className="w-4 h-4" />
            New Course
          </motion.button>
        </AddNewCourse>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse h-72" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-4 py-14
            border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/60 dark:bg-slate-900/50"
        >
          <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center">
            <BookPlus className="w-6 h-6 text-violet-500 dark:text-violet-400" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-300">No courses yet</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">Create your first course and start teaching!</p>
          </div>
          <AddNewCourse>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white
                shadow-md shadow-violet-200 hover:shadow-lg transition-all"
            >
              <BookPlus className="w-4 h-4" />
              Create First Course
            </motion.button>
          </AddNewCourse>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default CourseList