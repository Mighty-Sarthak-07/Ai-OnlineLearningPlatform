"use client"

import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'

function AppHeader({hideSidebar = false}) {
  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>  
    
    {!hideSidebar && <SidebarTrigger/>}
    <UserButton/>
    </div>
  )
}

export default AppHeader