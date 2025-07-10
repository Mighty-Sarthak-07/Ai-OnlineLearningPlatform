"use client"

import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,  
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, UserCircle2Icon, BookOpenIcon, CompassIcon,  CreditCardIcon, BrainIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import AddNewCourse from './AddNewCourse'
import { motion } from 'framer-motion';

const SidebarOptions = [ 
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/workspace",
    },
    {
        label: "My Learning",
        icon: BookOpenIcon,
        path: "/workspace/my-learning",
    },
    {
        label: "Explore",
        icon: CompassIcon,
        path: "/workspace/explore",
    },
    {
        label: "AI Tools",
        icon: BrainIcon,
        path: "/workspace/ai-tools",
    },
    {
        label: "Billing",
        icon: CreditCardIcon,
        path: "/workspace/billing",
    },
    {
        label: "Profile",
        icon: UserCircle2Icon,
        path: "/workspace/profile",
    },

]


function AppSidebar() {

    const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full"
    >
      <Sidebar>
        <SidebarHeader className='p-4'>
            <div className="flex gap-5 items-center text-2xl font-bold  font-verdana">
              <Image src="/logo.jpg" alt="logo" width={50} height={50} className='rounded-full m-2' /> SkillWorld
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <AddNewCourse>
                <Button className='bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-[1.05] hover:shadow-lg ease-in-out duration-300 hover:text-white flex items-center gap-2 ml-4'>
                    Create New Course
                </Button>
            </AddNewCourse>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {SidebarOptions.map((option) => (
                        <SidebarMenuItem key={option.label}>
                            <SidebarMenuButton asChild className = {"p-5 text-extrabold hover:text-purple-500 after:text-purple-700"}>
                                <Link href={option.path} className={`text-[17px] flex items-center gap-3 ${pathname.includes(option.path) && "text-primary bg-purple-50 rounded-lg" }`}   >
                                <option.icon className='w-7 h-7 hover:text-purple-500'/>
                                <span>{option.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
           </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </motion.div>
  )
}

export default AppSidebar