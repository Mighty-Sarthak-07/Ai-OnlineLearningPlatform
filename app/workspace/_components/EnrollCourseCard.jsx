'use client';

import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { CheckCircle2, PlayCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function EnrollCourseCard({ course, enrollCourse }) {
  const courseJson = course?.courseJson?.course;
  const completed = enrollCourse?.completedChapters?.length ?? 0;
  const total = courseJson?.chapters?.length ?? 1;
  const progress = Math.round((completed / total) * 100);
  const isDone = progress === 100;

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
          priority
        />
        {isDone && (
          <div className="absolute inset-0 bg-emerald-600/40 backdrop-blur-[1px] flex items-center justify-center">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            </div>
          </div>
        )}
        {/* Progress overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div>
          <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-1">
            {courseJson?.name ?? 'Untitled Course'}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {courseJson?.description ?? 'No description available'}
          </p>
        </div>

        {/* Progress section */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-500">Progress</span>
            <span className={`text-xs font-bold ${isDone ? 'text-emerald-600' : 'text-violet-600'}`}>
              {isDone ? '✓ Complete!' : `${progress}%`}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isDone ? 'bg-emerald-400' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[11px] text-slate-400">{completed} / {total} chapters done</p>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          <Link href={`/workspace/view-course/${course?.cid}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                text-sm font-semibold transition-all duration-200
                ${isDone
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-sm shadow-violet-200 hover:shadow-md hover:shadow-violet-300'}
              `}
            >
              {isDone
                ? <><CheckCircle2 className="w-4 h-4" /> Review Course</>
                : <><PlayCircle className="w-4 h-4" /> Continue Learning</>
              }
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default EnrollCourseCard;
