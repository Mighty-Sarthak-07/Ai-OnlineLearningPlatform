'use client';

import AppHeader from '@/app/workspace/_components/AppHeader';
import React, { useEffect, useState } from 'react';
import ChapterlistSidebar from '@/app/course/_components/ChapterlistSidebar';
import ChapterContent from '../_components/ChapterContent';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function Course() {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetEnrollCoursesByID();
  }, []);

  const GetEnrollCoursesByID = async () => {
    try {
      setLoading(true);
      const result = await axios.get('/api/enroll-course?courseId=' + courseId);
      setCourseInfo(result.data?.data);
    } catch (error) {
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <AppHeader hideSidebar={true} />

      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-transparent">
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-violet-200 dark:bg-violet-900 animate-ping opacity-60" />
              <div className="relative w-16 h-16 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 flex items-center justify-center shadow-sm dark:shadow-none">
                <Loader2 className="w-7 h-7 text-violet-500 dark:text-violet-400 animate-spin" />
              </div>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Loading course...</p>
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-row flex-1 overflow-hidden h-[calc(100vh-64px)]">
          <ChapterlistSidebar courseInfo={courseInfo} />
          <div className="flex-1 overflow-y-auto">
            <ChapterContent courseInfo={courseInfo} refreshData={GetEnrollCoursesByID} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;
