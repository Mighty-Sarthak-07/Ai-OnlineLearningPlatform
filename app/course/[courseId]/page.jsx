'use client';

import AppHeader from '@/app/workspace/_components/AppHeader';
import React, { useEffect, useState } from 'react';
import ChapterlistSidebar from '@/app/course/_components/ChapterlistSidebar';
import ChapterContent from '../_components/ChapterContent';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

function Course() {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState();

  useEffect(() => {
    GetEnrollCoursesByID();
  }, []);

  const GetEnrollCoursesByID = async () => {
    try {
      const result = await axios.get('/api/enroll-course?courseId=' + courseId);
      setCourseInfo(result.data?.data);
      toast.success('Course loaded successfully');
    } catch (error) {
      toast.error('Failed to load course');
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <AppHeader hideSidebar={true} />
      <div className='flex flex-row'>
        <ChapterlistSidebar courseInfo={courseInfo} />
        <ChapterContent courseInfo={courseInfo} refreshData={GetEnrollCoursesByID} />
      </div>
    </div>
  );
}

export default Course;
