import { BookOpen, BoxIcon, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function CourseInfo({course}) {
    const courseLayout = course?.courseJson?.course;
    console.log(courseLayout?.bannerImageUrl);
  return (
    <div className='sm:flex gap-4 justify-between shadow-lg p-4 bg-white rounded-xl' >
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
           
            <Button className='text-lg m-2 hover:bg-purple-900 hover:scale-[1.02] hover:shadow-lg ease-in-out duration-300 hover:text-white'> <BoxIcon/>Generate Content</Button>
            </div>
            <div>
            <Image src='https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1750574321773.png?alt=media&token=aeed1330-872f-4372-8771-53dafac871a8' alt="banner image" width={600} height={400} className='pt-3 rounded-xl shadow-sm w-[600px] h-[240px] object-cover'/></div>
        
    </div>
  )
}

export default CourseInfo