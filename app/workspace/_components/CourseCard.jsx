'use client';

import { motion } from 'framer-motion';
import { Book, LoaderCircle, PlayCircle, Settings, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notify } from '@/lib/notify';
import axios from 'axios';

const levelColor = {
  beginner:     { pill: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/90 dark:bg-emerald-500/10',  dot: 'bg-emerald-400' },
  intermediate: { pill: 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20 bg-amber-50/90 dark:bg-amber-500/10',    dot: 'bg-amber-400'   },
  advanced:     { pill: 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20 bg-red-50/90 dark:bg-red-500/10',      dot: 'bg-red-400'     },
};

function CourseCard({ course }) {
  const courseJson = course?.courseJson?.course;
  const level = courseJson?.level?.toLowerCase() ?? 'beginner';
  const lc = levelColor[level] ?? levelColor.beginner;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEnroll = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/enroll-course', { cid: course?.cid });
      
      if (res.data?.alreadyEnrolled) {
        notify.chapterDone(courseJson?.name ?? 'this course', 'You were already enrolled!', 0); 
        // Showing a success/neutral style isn't bad! Let's just use normal notify for "already enrolled" 
        // to not sound like an error
      } else {
        notify.enroll(courseJson?.name ?? 'this course');
      }
      
      router.push(`/course/${course?.cid}`);
    } catch (error) {
      notify.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none hover:shadow-md hover:border-violet-200 dark:hover:border-violet-500/50 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Banner */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={course?.bannerImageUrl ?? '/online.jpg'}
          alt={courseJson?.name ?? 'Course'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Level overlay badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${lc.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
            {courseJson?.level?.charAt(0).toUpperCase() + courseJson?.level?.slice(1)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base leading-snug line-clamp-2">
          {courseJson?.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {courseJson?.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full">
            <Book className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
            {courseJson?.noOfChapters} Chapters
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full">
            <Users className="w-3.5 h-3.5 text-fuchsia-500 dark:text-fuchsia-400" />
            All levels
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          {course?.courseContent?.length > 0 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnroll}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                bg-gradient-to-r from-violet-600 to-fuchsia-600
                text-white text-sm font-semibold
                shadow-sm shadow-violet-200 dark:shadow-violet-900/50 hover:shadow-md hover:shadow-violet-300 dark:hover:shadow-violet-800/80
                transition-all duration-200 disabled:opacity-60"
            >
              {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
              {loading ? 'Enrolling...' : 'Enroll Now'}
            </motion.button>
          ) : (
            <Link href={`/workspace/edit-course/${course?.cid}`} className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                  border border-violet-200 dark:border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10
                  text-sm font-semibold hover:bg-violet-100 dark:hover:bg-violet-500/20 transition-all duration-200"
              >
                <Settings className="w-4 h-4" />
                Generate Course
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CourseCard;