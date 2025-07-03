"use client"
import React from 'react'
import EnrollCourseList from '../_components/EnrollCourseList'
import WelcomeBanner from '../_components/WelcomeBanner'
import AppHeader from '../_components/AppHeader';

function MyLearning() {
  return (
   <div>
    <AppHeader/>
    <div className='p-4 m-7'>
     <WelcomeBanner/>
      <h2 className='text-4xl font-bold p-2 mb-4 text-verdana bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent text-shadow-sm'>My Learning</h2>
      <EnrollCourseList/>
    </div>
   </div>
  )
}

export default MyLearning
