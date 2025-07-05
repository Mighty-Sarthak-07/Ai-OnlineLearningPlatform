'use client';

import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

function EnrollCourseCard({ course, enrollCourse }) {

  const courseJson = course?.courseJson?.course;

  const calculateProgress = () => {
    const completedChapters = enrollCourse?.completedChapters?.length || 0;
    const totalChapters = courseJson?.chapters?.length ;
    const progress = (completedChapters / totalChapters) * 100;
    return Math.round(progress);
  };

  const progress = calculateProgress();

  return (
    <div className='shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] pb-3'>
      <div className='relative aspect-video'>
        <Image
          src={course.bannerImageUrl || '/online.jpg'}
          alt={courseJson?.name || 'Course Banner'}
          fill
          className='object-cover rounded-t-2xl'
          priority
        />
      </div>
      <div className='flex flex-col gap-3 p-4'>
        <h3 className='text-lg font-bold line-clamp-1'>
          {courseJson?.name || 'Untitled Course'}
        </h3>
        <p className='text-sm text-gray-500 line-clamp-2'>
          {courseJson?.description || 'No description available'}
        </p>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm font-medium'>
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>
        <Link href={`/workspace/view-course/${course.cid}`} className='w-full'>
          <Button className='w-full gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'>
            <PlayCircle className='w-5 h-5' />
            Continue Learning
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
