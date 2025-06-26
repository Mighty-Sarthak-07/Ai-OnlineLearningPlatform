"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CourseCard from './CourseCard';


function EnrollCourseList() {
    const [enrollCourses, setEnrollCourses] = useState([]);
    useEffect(() => {
        GetEnrollCourses();
    }, []);

    const GetEnrollCourses = async () => {
        const result = await axios.get('/api/enroll-course');
        console.log(result.data);
        setEnrollCourses(result.data);  
    }
  return enrollCourses?.length > 0 && (
    <div>
        <h1 className='text-2xl font-bold'>Continue your Learning Process   </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           
        </div>
    </div>
  ) 
}

export default EnrollCourseList