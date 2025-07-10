"use client"

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';

function AppHeader({hideSidebar = false}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex items-center justify-between p-4 shadow-sm w-full max-w-full'
    >
      {!hideSidebar && <SidebarTrigger />}
      <UserButton />
    </motion.div>
  )
}

export default AppHeader