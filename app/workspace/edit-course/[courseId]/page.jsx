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
        setLoading(true);
        const response = await axios.get('/api/courses?courseId='+courseId);
        console.log(response.data);
        setCourse(response.data);
        setLoading(false);  
    }
    

  return (
    <div className='bg-gradient-to-r from-slate-25 to-slate-50 via-slate-100'>
       
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