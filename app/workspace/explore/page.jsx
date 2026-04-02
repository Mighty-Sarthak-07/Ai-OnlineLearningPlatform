"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, CompassIcon, SlidersHorizontal, X } from "lucide-react"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import AppHeader from "../_components/AppHeader"
import CourseCard from "../_components/CourseCard"
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

const CATEGORIES = ["All", "Development", "Design", "Business", "Data Science", "Marketing"]

function Explore() {
  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const { user } = useUser()

  useEffect(() => {
    user && GetCoursesList()
  }, [user])

  const GetCoursesList = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/courses?courseId=0')
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
      toast.error('Failed to load courses')
      setCourses([])
    } finally {
      setIsLoading(false)
    }
  }

  const filtered = courses.filter(c => {
    const name = c?.courseJson?.course?.name?.toLowerCase() ?? ""
    const desc = c?.courseJson?.course?.description?.toLowerCase() ?? ""
    return name.includes(search.toLowerCase()) || desc.includes(search.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-transparent">
      <AppHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600
              flex items-center justify-center shadow-md shadow-violet-200 dark:shadow-none">
              <CompassIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Explore Courses</h1>
              <p className="text-sm text-slate-400 dark:text-slate-500">Discover and enroll in courses that match your goals</p>
            </div>
          </div>
        </motion.div>

        {/* Search + filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses by name or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900
                text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-300 dark:focus:ring-violet-500/30 dark:focus:border-violet-500
                transition-all shadow-sm dark:shadow-none"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 flex-wrap mb-8"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${activeCategory === cat
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200 dark:shadow-none'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">
            {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
            {search && <span> for "<span className="text-slate-600 dark:text-slate-300 font-medium">{search}</span>"</span>}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} className="rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse h-72" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence>
              {filtered.map((course, index) => (
                <motion.div
                  key={course.cid ?? index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20
            border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
            <p className="font-semibold text-slate-500 dark:text-slate-400">No courses found</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore
