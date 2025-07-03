import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/app/workspace/_components/AppSidebar';



function WorkspaceLayout({children}) {
  return (
    <div> 

      <SidebarProvider> 
      <AppSidebar/>
     
        <div className='w-full'>
            {children}
        </div> 
      </SidebarProvider>
    </div>
  )
}

export default WorkspaceLayout 