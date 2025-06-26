import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, PlayCircle, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

function CourseCard({course}) {
    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);

    const handleEnroll = async () => {
        try {    
        setLoading(true);
        const result = await axios.post('/api/enroll-course', {
            cid: course?.cid,
        });
            console.log(result.data);
         
         toast.success("Course Enrolled Successfully");
          setLoading(false);
        } catch (error) {
            if(error.response.status === 400){
                toast.warning("Course Already Enrolled")
              }
              else if(error.response.status === 500){
                toast.error("Server Error");
              }
              else{
                toast.error("Server Error");
              }
            console.log(error);
            setLoading(false);
        }
    }
  return (
    <div className='shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] pb-3'>
        <Image src={course?.bannerImageUrl} alt={course?.name} width={400} height={300} className=' object-cover w-full rounded-t-2xl' />
        <div className='flex flex-col gap-3 p-3'>
            <h3 className='text-lg font-bold'>{courseJson?.name}</h3>
            <p className='text-sm text-gray-500 line-clamp-3'>{courseJson?.description}</p>
            <div className='flex items-center gap-5 my-2'>
               <h2 className="flex items-center md:gap-2 gap-1 p-1 md:p-2 px-3 md:px-4 outline-2 rounded-sm"> <Book className='md:text-xl text-lg text-purple-700'/> {courseJson?.noOfChapters} Chapters</h2>
               <h2 className="flex items-center md:gap-2 gap-1 p-1 md:p-2 px-3 md:px-4 outline-2 rounded-sm"> <TrendingUp className='md:text-xl text-lg text-red-700'/> {courseJson?.level.charAt(0).toUpperCase() + courseJson?.level.slice(1)} </h2>
              
            </div>
            {course?.courseContent?.length > 0 ?
             <Button onClick={handleEnroll} disabled={loading} className='flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-900 text-white hover:bg-gradient-to-r hover:from-purple-900 hover:to-purple-500'>
                {loading ? <LoaderCircle className='animate-spin' /> : <PlayCircle/>} EnrollCourse
               </Button>  :
               <Link href={`/workspace/edit-course/${course?.cid}`}>
               <Button variant="outline" className='flex items-center gap-2 shadow-sm w-full'>
                    <Settings/> Generate Course 
               </Button></Link>
            }
        </div>
    </div>
  )
}

export default CourseCard