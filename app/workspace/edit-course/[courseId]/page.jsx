'use client'
import AppHeader from '@/app/workspace/_components/AppHeader';
import AppSidebar from '@/app/workspace/_components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


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
        setLoading(false);
    }
    

  return (
    <div>
        <SidebarProvider>
            <AppSidebar/>
            <div className='w-full'>
                <AppHeader/>
                <div className='p-10'>
                    EditCourse {courseId}
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' id='title' className='border border-gray-300 rounded-md p-2' />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    </div>
  )
}

export default EditCourse