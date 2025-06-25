'use client'
import AppHeader from '@/app/workspace/_components/AppHeader';
import AppSidebar from '@/app/workspace/_components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

function EditCourse() {
    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);
    const [course,setCourse] = useState(null);

    useEffect(() => {
        GetCourseDetails();
    }, []);

    const GetCourseDetails = async () => {
        setLoading(true);
        const response = await axios.get('/api/courses?courseId='+courseId);
        console.log(response.data);
        setCourse(response.data);
        setLoading(false);  
    }
    

  return (
    <div className='bg-gradient-to-r from-slate-25 to-slate-50 via-slate-100'>
        <SidebarProvider>
            <AppSidebar/>
            <div className='w-full'>
                <AppHeader/>
                <div className='p-10 flex flex-col gap-4'>
                    <CourseInfo course={course}/>
                    <ChapterTopicList course={course}/>
                </div>
            </div>
        </SidebarProvider>
    </div>
  )
}

export default EditCourse