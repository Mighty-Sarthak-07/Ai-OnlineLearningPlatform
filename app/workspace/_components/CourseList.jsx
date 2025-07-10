"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddNewCourse from './AddNewCourse'
import CourseCard from './CourseCard'

function CourseList() {
    const [courses, setCourses] = useState([])  
    const {user} = useUser();
    useEffect(() => {
       user && GetCoursesList()
    }, [user])

    const GetCoursesList = async () => {
        try {
            const response = await axios.get('/api/courses')
            setCourses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
  
  return (
    <div>
        <h2 className='text-3xl font-bold p-3 mt-3'>My Courses</h2>
        {courses?.length === 0 ?
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className='flex flex-col gap-5 justify-center items-center h-full m-5 shadow-lg p-5 rounded-2xl bg-white'
        >
            <Image src="/online.jpg" className='rounded-2xl max-w-full h-auto' alt="No courses" width={400} height={300} />
            <h2 className='text-2xl font-bold text-center'>Look like you don't have any courses yet</h2>
            <AddNewCourse>
                <Button>
                    + Create Your First Course
                </Button>
            </AddNewCourse>
        </motion.div>:
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
        >
            {courses?.map((course,index) => (
              <CourseCard key={index} course={course} />
            ))}
        </motion.div>
    }
    </div>
  )
}

export default CourseList