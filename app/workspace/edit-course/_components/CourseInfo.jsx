import React from 'react'

function CourseInfo({course}) {
    const courseLayout = course?.courseJson?.course;
  return (
    <div>
        <div>
            <h2 className='text-2xl font-bold'>{courseLayout?.name}</h2>
            <p className='text-gray-500'>{courseLayout?.description}</p>
        </div>
    </div>
  )
}

export default CourseInfo