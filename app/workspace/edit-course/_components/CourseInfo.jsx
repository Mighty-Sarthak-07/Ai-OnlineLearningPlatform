import { BookOpen, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';

function CourseInfo({course}) {
    const courseLayout = course?.courseJson?.course;
  return (
    <div>
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>{courseLayout?.name}</h2>
            <p className='text-xl text-gray-700'>{courseLayout?.description}</p>
            <div className='gap-2 grid grid-cols-1 md:grid-cols-3'>
                <div className='flex items-center gap-6 p-3 rounded-xl mt-2 bg-purple-100 shadow-sm'>
                    <Clock className='w-10 h-10 text-purple-500'/>
                    <section>
                        <h1 className="font-bold">Course Duration</h1>
                        <h2>4 hours</h2>
                    </section>
                </div>
                <div className='flex items-center gap-6 p-3 rounded-xl mt-2 bg-blue-100 shadow-sm'>
                    <BookOpen className='w-10 h-10 text-blue-500'/>
                    <section>
                        <h1 className="font-bold">Chapters</h1>
                        <h2>{courseLayout?.chapters?.length}</h2>
                    </section>
                </div>
                <div className='flex items-center gap-6 p-3 rounded-xl mt-2 bg-red-100 shadow-sm'>
                    <TrendingUp className='w-10 h-10 text-red-500'/>
                    <section>
                        <h1 className="font-bold">Difficulty Level</h1>
                        <h2>{courseLayout?.level}</h2>
                    </section>
                </div>
            </div>
            <Image src={courseLayout?.bannerImageUrl} alt="banner image" width={400} height={400} className='rounded-xl w-full h-[240px] object-cover'/>
        </div>
    </div>
  )
}

export default CourseInfo