"use client"
import AppHeader from '@/app/workspace/_components/AppHeader'
import React,{useEffect, useState} from 'react'
import ChapterlistSidebar from '@/app/course/_components/ChapterlistSidebar'

import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner';

function Course() {
       const {courseId} = useParams();
       const [courseInfo,setCourseInfo] = useState();
     useEffect(() => {
        GetEnrollCoursesByID();
    }, []);

    const GetEnrollCoursesByID = async () => {
        const result = await axios.get('/api/enroll-course?courseId=' + courseId);
        console.log(result.data);
        setCourseInfo(result.data?.data); 
        toast.success('Course loaded successfully');
    }
  return (
    
    <div>
      <AppHeader hideSidebar={true}/>
      <div className='flex gap-10'>
      <ChapterlistSidebar courseInfo = {courseInfo}/>
      <ChapterContent  courseInfo = {courseInfo} refreshData={()=> GetEnrollCoursesByID()}/>
    </div>
    </div>
  )
}

export default Course
