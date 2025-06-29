import { Button } from '@/components/ui/button';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, BoxIcon, Clock, Loader2, PlayCircleIcon, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function CourseInfo({course,ViewCourse}) {

    const courseLayout = course?.courseJson?.course;
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const GetCourseContent = async () => {
      setLoading(true);
      try{
        const result = await axios.post("/api/generate-course-content",{
          courseJson : courseLayout,
          courseTitle : course?.name,
          courseId : course?.cid,
        })
        console.log(result.data);
        setLoading(false);
        router.replace(`/workspace`);
        toast.success("Course Content Generated Successfully");
      }catch(error){
        console.log(error);
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response.data?.error || error.response.data?.details || 'Server error occurred';
          toast.error(`Error: ${errorMessage}`);
        } else if (error.request) {
          toast.error("Network error: Please check your connection");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }

    console.log(course?.bannerImageUrl);
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='sm:flex gap-8 justify-between shadow-2xl p-8 bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-2xl items-center'
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='flex flex-col gap-6 flex-2'
        >
          <h2 className='text-3xl font-extrabold text-purple-900'>{courseLayout?.name}</h2>
          <p className='text-lg text-gray-700'>{courseLayout?.description}</p>
          <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
            <div className='flex items-center gap-6 p-4 rounded-2xl mt-2 bg-purple-100 shadow-md hover:scale-[1.03] transition-transform'>
              <Clock className='w-10 h-10 text-purple-500'/>
              <section>
                <h1 className="font-bold">Course Duration</h1>
                <h2>4 hours</h2>
              </section>
            </div>
            <div className='flex items-center gap-6 p-4 rounded-2xl mt-2 bg-blue-100 shadow-md hover:scale-[1.03] transition-transform'>
              <BookOpen className='w-10 h-10 text-blue-500'/>
              <section>
                <h1 className="font-bold">Chapters</h1>
                <h2>{courseLayout?.chapters?.length}</h2>
              </section>
            </div>
            <div className='flex items-center gap-6 p-4 rounded-2xl mt-2 bg-red-100 shadow-md hover:scale-[1.03] transition-transform'>
              <TrendingUp className='w-10 h-10 text-red-500'/>
              <section>
                <h1 className="font-bold">Difficulty Level</h1>
                <h2>{courseLayout?.level}</h2>
              </section>
            </div>
            {!ViewCourse ?
             <Button className='text-lg mx-2 bg-gradient-to-r from-purple-500 to-indigo-500  hover:scale-[1.05] hover:shadow-lg ease-in-out duration-300 md:w-[250px] hover:text-white flex items-center gap-2' onClick={GetCourseContent} disabled={loading}>
            {loading ? <Loader2 className='w-10 h-10 text-purple-500 animate-spin'/> : <BoxIcon/>} Generate Content
            </Button> : <Link href={`/course/${course?.cid}`}>
                <Button className='text-lg mx-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-[1.05] hover:shadow-lg ease-in-out duration-300 md:w-[250px] hover:text-white flex items-center gap-2'>
                  <PlayCircleIcon/> Continue Learning
                </Button>
              </Link>
}
          </div>
         
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='flex-1 flex justify-center items-center'
        >
          {course?.bannerImageUrl ? (
            <Image 
              src={course.bannerImageUrl}
              alt="banner image"
              width={600}
              height={400}
              className='pt-3 rounded-2xl shadow-xl w-[400px] h-[240px] object-cover border-4 border-white'
            />
          ) : null}
        </motion.div>
      </motion.div>
    )
}

export default CourseInfo