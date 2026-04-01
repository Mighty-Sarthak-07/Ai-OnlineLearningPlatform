'use client';

import { motion } from 'framer-motion';
import { Book, LoaderCircle, PlayCircle, Settings, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const levelColor = {
  beginner:     { pill: 'bg-emerald-50 text-emerald-600 border-emerald-200',  dot: 'bg-emerald-400' },
  intermediate: { pill: 'bg-amber-50   text-amber-600   border-amber-200',    dot: 'bg-amber-400'   },
  advanced:     { pill: 'bg-red-50     text-red-600     border-red-200',      dot: 'bg-red-400'     },
};

function CourseCard({ course }) {
  const courseJson = course?.courseJson?.course;
  const level = courseJson?.level?.toLowerCase() ?? 'beginner';
  const lc = levelColor[level] ?? levelColor.beginner;
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/enroll-course', { cid: course?.cid });
      toast.success('Course enrolled successfully 🎉');
    } catch (error) {
      if (error.response?.status === 400) toast.warning('Already enrolled in this course');
      else toast.error('Something went wrong. Try again.');
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
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Banner */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <Image
          src={course?.bannerImageUrl ?? '/online.jpg'}
          alt={courseJson?.name ?? 'Course'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Level overlay badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-white/90 backdrop-blur-sm ${lc.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
            {courseJson?.level?.charAt(0).toUpperCase() + courseJson?.level?.slice(1)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2">
          {courseJson?.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {courseJson?.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            <Book className="w-3.5 h-3.5 text-violet-500" />
            {courseJson?.noOfChapters} Chapters
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            <Users className="w-3.5 h-3.5 text-fuchsia-500" />
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
                shadow-sm shadow-violet-200 hover:shadow-md hover:shadow-violet-300
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
                  border border-violet-200 text-violet-600 bg-violet-50
                  text-sm font-semibold hover:bg-violet-100 transition-all duration-200"
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