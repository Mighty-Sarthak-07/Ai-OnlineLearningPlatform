"use client"
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import EnrollCourseCard from './EnrollCourseCard';
import { toast } from 'react-hot-toast';


function EnrollCourseList() {
    const [enrollCourses, setEnrollCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        GetEnrollCourses();
    }, []);

    const GetEnrollCourses = async () => {
        try {
            setIsLoading(true);
            const result = await axios.get('/api/enroll-course');
            console.log(result.data);
            setEnrollCourses(result.data?.data);
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
            toast.error('Failed to load enrolled courses');
        } finally {
            setIsLoading(false);
        }
    }
  return  (
    <div>
        <h1 className='text-2xl font-bold m-2 mb-4'>Continue your Learning Process   </h1>
        {isLoading ? (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='text-center text-gray-500 p-4'
          >
            Loading enrolled courses...
          </motion.p>
        ) : enrollCourses && enrollCourses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          >
            {enrollCourses.map((course,index) => (
              <EnrollCourseCard key={index} course={course?.courses} enrollCourse={course?.enrollcourses} />
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='text-center text-gray-500 p-4'
          >
            No enrolled courses found.
          </motion.p>
        )}
    </div>
  ) 
}

export default EnrollCourseList