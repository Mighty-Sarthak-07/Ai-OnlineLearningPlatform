import React from 'react'
import AppHeader from './_components/AppHeader'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'

function WorkspaceProvider({ children }) {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <AppHeader />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
        <WelcomeBanner />
        <EnrollCourseList />
        <CourseList />
      </div>
    </div>
  )
}

export default WorkspaceProvider