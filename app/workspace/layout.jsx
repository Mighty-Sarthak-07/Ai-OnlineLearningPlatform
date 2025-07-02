import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/app/workspace/_components/AppSidebar';


function WorkspaceLayout({children}) {
  return (
    <div>

        <div className='w-full'>
            {children}
        </div> 
    </div>
  )
}

export default WorkspaceLayout 