'use client';

import React, { useContext, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SelectedChapterContext } from '@/context/SelectedChapterContext';
import { CheckCircle2, BookOpen, Menu, X, GraduationCap, Lock, ChevronRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ChapterlistSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollcourses;
  const courseContent = course?.courseContent ?? [];
  const { selectedChapter, setSelectedChapter } = useContext(SelectedChapterContext);
  const completedChapter = enrollCourse?.completedChapters ?? [];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const progress = courseContent.length > 0
    ? Math.round((completedChapter.length / courseContent.length) * 100)
    : 0;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white overflow-hidden">

      {/* ── Course Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-br from-white to-violet-50/40">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-full px-3 py-1 mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-violet-600" />
          <span className="text-[11px] font-semibold text-violet-600 uppercase tracking-wider">
            Course Content
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-2 mb-4">
          {course?.courseTitle ?? 'Course Chapters'}
        </h2>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">Progress</span>
            <span className="text-xs font-bold text-violet-600">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {completedChapter.length} / {courseContent.length} chapters
            </span>
            {progress === 100 && (
              <span className="text-[11px] text-amber-500 font-semibold flex items-center gap-1">
                <Trophy className="w-3 h-3" /> Completed!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Chapter List ── */}
      <div className="flex-1 overflow-y-auto py-3 px-3 scrollbar-thin-light">
        {Array.isArray(courseContent) && courseContent.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            defaultValue={courseContent[selectedChapter]?.courseData?.chapterName}
          >
            {courseContent.map((chapter, index) => {
              const isCompleted = completedChapter.includes(index);
              const isSelected = selectedChapter === index;
              const topics = chapter?.courseData?.topics ?? [];

              return (
                <AccordionItem
                  value={chapter?.courseData?.chapterName}
                  key={index}
                  className="border-0 mb-1.5"
                >
                  <AccordionTrigger
                    onClick={() => setSelectedChapter(index)}
                    className={`
                      group flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                      no-underline hover:no-underline w-full
                      transition-all duration-200 cursor-pointer
                      ${isSelected
                        ? 'bg-violet-50 border border-violet-200 shadow-sm'
                        : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'}
                    `}
                  >
                    {/* Index / Check badge */}
                    <div className={`
                      flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                      transition-all duration-200 shadow-sm
                      ${isCompleted
                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                        : isSelected
                          ? 'bg-violet-600 text-white shadow-violet-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'}
                    `}>
                      {isCompleted
                        ? <CheckCircle2 className="w-4 h-4" />
                        : <span>{index + 1}</span>
                      }
                    </div>

                    <span className={`flex-1 text-sm font-semibold leading-tight line-clamp-2
                      ${isSelected ? 'text-violet-700' : isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>
                      {chapter?.courseData?.chapterName}
                    </span>

                    {isCompleted && (
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600
                        rounded-full border border-emerald-200 flex-shrink-0 font-semibold">
                        ✓ Done
                      </span>
                    )}
                  </AccordionTrigger>

                  <AccordionContent className="pt-1 pb-0">
                    <div className="ml-4 pl-3 border-l-2 border-slate-100 space-y-0.5 py-1">
                      {topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: topicIndex * 0.04 }}
                          className="flex items-start gap-2 py-1.5 px-2 rounded-lg hover:bg-violet-50/60 transition-colors group/topic"
                        >
                          <BookOpen className="w-3 h-3 text-slate-300 group-hover/topic:text-violet-400 flex-shrink-0 mt-0.5 transition-colors" />
                          <span className="text-[11px] text-slate-400 group-hover/topic:text-slate-600 leading-tight transition-colors">
                            {topic?.topic}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-400">No chapters yet</p>
            <p className="text-xs text-slate-300 mt-0.5">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-6 left-6 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsDrawerOpen(true)}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600
            shadow-lg shadow-violet-300 flex items-center justify-center text-white"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-10 flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Drawer header bar */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5 text-violet-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Chapters</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="flex-1 overflow-hidden">
                <SidebarContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-[280px] xl:w-[300px] flex-shrink-0
        h-[calc(100vh-64px)] sticky top-16
        border-r border-slate-100 shadow-[1px_0_8px_rgba(0,0,0,0.04)]">
        <SidebarContent />
      </div>
    </>
  );
}

export default ChapterlistSidebar;
