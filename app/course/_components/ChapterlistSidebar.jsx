"use client";
import React, { useContext, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SelectedChapterContext } from '@/context/SelectedChapterContext';
import { CheckCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ChapterlistSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollcourses;
  const courseContent = course?.courseContent ?? [];

  const { selectedChapter, setSelectedChapter } = useContext(SelectedChapterContext);
  const completedChapter = enrollCourse?.completedChapters ?? [];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const SidebarContent = () => (
    <div className='w-full md:w-[300px] h-full p-6 overflow-y-auto bg-gray-100 border-r'>
      <h2 className='text-2xl font-bold mb-6 text-primary'>Course Chapters</h2>

      <Accordion type="single" collapsible className='space-y-3'>
        {Array.isArray(courseContent) && courseContent.length > 0 ? (
          courseContent.map((chapter, index) => {
            const isCompleted = completedChapter.includes(index);
            const isSelected = selectedChapter === index;

            return (
              <AccordionItem
                value={chapter?.courseData?.chapterName}
                key={index}
                className={`border rounded-lg ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-muted bg-white'}`}
              >
                <AccordionTrigger
                  className='flex justify-between items-center px-4 py-3 font-semibold text-lg text-left'
                  onClick={() => setSelectedChapter(index)}
                >
                  <span>{index + 1}. {chapter?.courseData?.chapterName}</span>
                  {isCompleted && (
                    <CheckCircle className='text-green-600 size-5 ml-2' />
                  )}
                </AccordionTrigger>

                <AccordionContent className='px-4 pb-4'>
                  {chapter?.courseData?.topics?.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className={`rounded-md p-3 mb-2 transition duration-200 ${
                        isCompleted ? 'bg-green-100 border border-green-400' : 'bg-muted/40 border'
                      }`}
                    >
                      <h4 className='text-base font-medium text-gray-800'>
                        {topic?.topic}
                      </h4>
                      <p className='text-sm text-muted-foreground mt-1'>
                        {topic?.topicDescription}
                      </p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })
        ) : (
          <p className='text-center text-gray-500'>No Chapters Available</p>
        )}
      </Accordion>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar with Toggle Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow z-20">
        <h2 className="text-xl font-bold">Chapters</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile Drawer using Framer Motion */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div
              className="fixed left-0 top-0 h-full w-[85%] max-w-xs bg-white shadow-lg z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <h2 className="text-lg font-bold">Course Chapters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)}>
                  <X />
                </Button>
              </div>
              {SidebarContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen">
        {SidebarContent()}
      </div>
    </>
  );
}

export default ChapterlistSidebar;
