import React from 'react'

import AppHeader from './_components/AppHeader' 
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'

function WorkspaceProvider({children}) {
  return (
   
      
        <div className='w-full'> 
            <AppHeader/>
            <div className="p-10">
                {children}
                <WelcomeBanner/>
                <EnrollCourseList/>
                <CourseList/>
            </div>
        </div>
   
  )
}

export default WorkspaceProvider