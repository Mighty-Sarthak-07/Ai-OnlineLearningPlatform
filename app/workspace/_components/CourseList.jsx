"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import AddNewCourse from './AddNewCourse'

function CourseList() {
    const [courses, setCourses] = useState([])
  return (
    <div>
        <h2 className='text-3xl font-bold p-3 mt-3'>My Courses</h2>
        {courses?.length === 0 ?
        <div className='flex flex-col gap-5 justify-center items-center h-full m-5 shadow-lg p-5 rounded-2xl'>
            <Image src="/online.jpg" className='rounded-2xl' alt="No courses" width={400} height={300} />
            <h2 className='text-2xl font-bold'>Look like you don't have any courses yet</h2>
            <AddNewCourse>
                <Button>
                    + Create Your First Course
                </Button>
            </AddNewCourse>
        </div>:
        <div>
            {courses.map((course) => (
                <div key={course.id}>
                    <h3>{course.title}</h3>
                </div>
            ))}
        </div>
    }
    </div>
  )
}

export default CourseList