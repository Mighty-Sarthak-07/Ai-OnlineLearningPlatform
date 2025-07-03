"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EnrollCourseCard from './EnrollCourseCard';


function EnrollCourseList() {
    const [enrollCourses, setEnrollCourses] = useState([]);
    useEffect(() => {
        GetEnrollCourses();
    }, []);

    const GetEnrollCourses = async () => {
        const result = await axios.get('/api/enroll-course');
        console.log(result.data);
        setEnrollCourses(result.data?.data);  
    }
  return  (
    <div>
        <h1 className='text-2xl font-bold m-2 mb-4'>Continue your Learning Process   </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           {enrollCourses && enrollCourses.length > 0 ? enrollCourses.map((course,index) => (
            <EnrollCourseCard key={index} course={course?.courses} enrollCourse={course?.enrollCourses} />
           )) : (
            <p>No enrolled courses found.</p>
           )}
        </div>
    </div>
  ) 
}

export default EnrollCourseList