'use client'
import AppHeader from '@/app/workspace/_components/AppHeader';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

function EditCourse({ViewCourse=false}) {
    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);
    const [course,setCourse] = useState(null);

    useEffect(() => {
        GetCourseDetails();
    }, []);

    const GetCourseDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/courses?courseId='+courseId);
            console.log(response.data);
            if (response.data) {
                setCourse(response.data);
            } else {
                console.error("Course not found");
                // Optional: router.push('/workspace')
            }
        } catch (error) {
            console.error("Failed to fetch course details:", error);
        } finally {
            setLoading(false);  
        }
    }
    

  return (
    <div className='bg-gradient-to-r from-slate-50 to-slate-50 via-slate-100 dark:from-slate-950 dark:to-slate-950 dark:via-slate-900 min-h-screen'>
       
            <div className='w-full'>
                <AppHeader/>
                <div className='p-10 flex flex-col gap-4'>
                    <CourseInfo course={course} ViewCourse = {ViewCourse}/>
                    <ChapterTopicList course={course} ViewCourse = {ViewCourse}/>
                </div>
            </div>
     
    </div>
  )
}

export default EditCourse