import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader' 
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'

function WorkspaceProvider({children}) {
  return (
    <SidebarProvider>
        <AppSidebar/>
      
        <div className='w-full'> 
            <AppHeader/>
            <div className="p-10">
                {children}
                <WelcomeBanner/>
                <CourseList/>
            </div>
        </div>
    </SidebarProvider>
  )
}

export default WorkspaceProvider