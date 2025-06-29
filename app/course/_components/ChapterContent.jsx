import React from 'react'

function ChapterContent({courseInfo}) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollcourses;
  const courseContent = courseInfo?.courses?.courseContent;
  return (
    <div className='flex flex-col w-full h-full p-7'>
   <h2 className='text-2xl font-bold'>{course?.courseName}</h2>
    </div>
  )
}

export default ChapterContent
