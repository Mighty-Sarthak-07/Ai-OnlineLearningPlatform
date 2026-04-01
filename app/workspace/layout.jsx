'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/app/workspace/_components/AppSidebar'
import PageLoadingProvider from '@/app/workspace/_components/PageLoadingProvider'

function WorkspaceLayout({ children }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className='w-full'>
          <PageLoadingProvider>
            {children}
          </PageLoadingProvider>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default WorkspaceLayout