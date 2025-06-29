import React from 'react'
import { PlayCircle, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';


function EnrollCourseCard({course, enrollCourse}) {
   const courseJson = course?.courseJson?.course;
    const calculateProgress = () => {
        const completedChapters = enrollCourse?.completedChapters?.length || 0;
        const totalChapters = course?.course?.length || 1; // Prevent division by zero
        return Math.min(Math.round((completedChapters / totalChapters) * 100), 100); // Ensure max 100%
    }
  return (
     <div className='shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] pb-3'>
        <Image src={course?.bannerImageUrl} alt={course?.name} width={400} height={300} className=' object-cover w-full rounded-t-2xl' />
        <div className='flex flex-col gap-3 p-3'>
            <h3 className='text-lg font-bold'>{courseJson?.name}</h3>
            <p className='text-sm text-gray-500 line-clamp-3'>{courseJson?.description}</p>
            <div className=''>
                <h2 className='flex justify-between text-semibold text-sm mb-1'>Progress: <span>{calculateProgress()}%</span></h2>
                <Progress value={calculateProgress()} className="h-2" />
            </div>
            <Link href={`/workspace/view-course/${course?.cid}`} className='w-full'>
                <Button className='w-full gap-2'>
                    <PlayCircle className='w-5 h-5' />
                    Continue Learning
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default EnrollCourseCard
