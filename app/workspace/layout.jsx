'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/app/workspace/_components/AppSidebar'
import PageLoadingProvider from '@/app/workspace/_components/PageLoadingProvider'
import { TaskProvider } from '@/context/TaskContext'
import TaskManagerModal from '@/app/workspace/_components/TaskManagerModal'

function WorkspaceLayout({ children }) {
  return (
    <div>
      <SidebarProvider>
        <TaskProvider>
          <AppSidebar />
          <div className='w-full'>
            <PageLoadingProvider>
              {children}
            </PageLoadingProvider>
          </div>
          <TaskManagerModal />
        </TaskProvider>
      </SidebarProvider>
    </div>
  )
}

export default WorkspaceLayout