"use client"
import React from 'react'
import { PricingTable } from '@clerk/nextjs';
import AppHeader from '../_components/AppHeader';



function Billing() {
 
  return (
    <div>
      <AppHeader/>
      <div className='p-4 m-7'>
        <h2 className='text-4xl font-bold p-2 mb-4 text-verdana bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent text-shadow-sm' >Select Plan</h2>
            <div className='grid grid-col-1 md:grid-col-2'>
            <PricingTable />
            </div>
            </div>
    </div>
    
  )
}

export default Billing
