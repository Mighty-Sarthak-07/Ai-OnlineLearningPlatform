
import React from 'react'
import { PricingTable } from '@clerk/nextjs';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/app/workspace/_components/AppSidebar';


function Billing() {
  return (
    <div>
        <SidebarProvider> 
            <AppSidebar>
      </AppSidebar>
      <div className='p-10 m-10'>
        <h2 className='text-4xl font-bold p-2 mb-4 text-verdana bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent text-shadow-sm' >Select Plan</h2>
            <div className='grid grid-col-1 md:grid-col-2'>
            <PricingTable />
            </div>
            </div>
      </SidebarProvider>
      
    </div>
    
  )
}

export default Billing
