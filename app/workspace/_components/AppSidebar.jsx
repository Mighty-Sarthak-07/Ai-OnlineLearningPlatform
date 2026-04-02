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
import Link from 'next/link'
import {
  LayoutDashboard, UserCircle2Icon, BookOpenIcon,
  CompassIcon, CreditCardIcon, BrainIcon, PlusCircle,
  Sparkles,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import AddNewCourse from './AddNewCourse'
import { motion } from 'framer-motion'

const SidebarOptions = [
  { label: "Dashboard",   icon: LayoutDashboard, path: "/workspace" },
  { label: "My Learning", icon: BookOpenIcon,     path: "/workspace/my-learning" },
  { label: "Explore",     icon: CompassIcon,      path: "/workspace/explore" },
  { label: "AI Tools",    icon: BrainIcon,        path: "/workspace/ai-tools" },
  { label: "Billing",     icon: CreditCardIcon,   path: "/workspace/billing" },
  { label: "Profile",     icon: UserCircle2Icon,  path: "/workspace/profile" },
]

function AppSidebar() {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="h-full"
    >
      <Sidebar className="border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">

        <SidebarHeader className="px-4 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="SkillWorld logo"
                width={40}
                height={40}
                className="rounded-xl shadow-md object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
            <div>
              <p className="text-[17px] font-bold text-slate-800 dark:text-slate-200 tracking-tight leading-none">
                Skill<span className="text-violet-600 dark:text-violet-400">World</span>
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium tracking-wide uppercase">
                Learning Platform
              </p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 pt-4">

          <SidebarGroup className="mb-2 px-0">
            <AddNewCourse>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                  bg-gradient-to-r from-violet-600 to-fuchsia-600
                  text-white text-sm font-semibold
                  shadow-md shadow-violet-200 dark:shadow-none hover:shadow-lg hover:shadow-violet-300 dark:hover:shadow-violet-500/20
                  transition-all duration-200"
              >
                <PlusCircle className="w-4 h-4" />
                Create New Course
              </motion.button>
            </AddNewCourse>
          </SidebarGroup>

          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">
            Navigation
          </p>

          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {SidebarOptions.map((option, i) => {
                  const isActive = pathname === option.path ||
                    (option.path !== '/workspace' && pathname.startsWith(option.path))
                  return (
                    <SidebarMenuItem key={option.label}>
                      <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent">
                        <motion.div
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.25 }}
                        >
                          <Link
                            href={option.path}
                            className={`
                              flex items-center gap-3 px-3 py-2.5 rounded-xl w-full
                              text-sm font-medium transition-all duration-200 group
                              ${isActive
                                ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 shadow-sm border border-violet-100 dark:border-violet-500/20'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'}
                            `}
                          >
                            <span className={`
                              flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0
                              transition-colors duration-200
                              ${isActive
                                ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400'
                                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-600 dark:group-hover:text-slate-300'}
                            `}>
                              <option.icon className="w-4 h-4" />
                            </span>
                            <span>{option.label}</span>
                            {isActive && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
                            )}
                          </Link>
                        </motion.div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-4 py-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-50 dark:from-violet-500/10 to-fuchsia-50 dark:to-fuchsia-500/10 border border-violet-100 dark:border-violet-500/20">
            <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pro Plan</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">Unlock all features</p>
            </div>
          </div>
        </SidebarFooter>

      </Sidebar>
    </motion.div>
  )
}

export default AppSidebar