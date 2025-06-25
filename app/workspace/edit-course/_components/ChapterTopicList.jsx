import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import React from 'react';

function ChapterTopicList({course}) {
    const courseLayout = course?.courseJson?.course;
    console.log(courseLayout);
    return (
      <div className='bg-white p-4 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-extrabold text-center mb-8 tracking-tight'>Chapter & Topics</h2>
        <div className="flex flex-col items-center justify-center mt-6 gap-12">
          <AnimatePresence>
            {courseLayout?.chapters.map((chapter, chapterIdx) => (
              <motion.div
                key={chapterIdx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: chapterIdx * 0.1 }}
                className="flex flex-col items-center w-full mb-2"
              >
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(80,0,200,0.15)' }}
                  className="p-6 border-2 border-purple-200 shadow-lg rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white w-full max-w-xl transition-all duration-300 mb-8"
                >
                  <h2 className="text-center text-lg font-semibold tracking-wide mb-1">Chapter {chapterIdx + 1}</h2>
                  <h2 className="font-bold text-2xl text-center mb-2">{chapter.chapterName}</h2>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span>Duration: {chapter?.duration}</span>
                    <span>Topics: {chapter?.topics?.length}</span>
                  </div>
                </motion.div>
                {/* Timeline for topics */}
                <div className="relative w-full flex flex-col items-center">
                  {/* Central vertical line - hidden on mobile */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 z-0 hidden md:block" style={{transform: 'translateX(-50%)'}} />
                  <AnimatePresence>
                    {chapter?.topics.map((topic, topicIdx) => {
                      const isLeft = topicIdx % 2 === 0;
                      return (
                        <React.Fragment key={topicIdx}>
                          <motion.div
                            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isLeft ? -30 : 30 }}
                            transition={{ duration: 0.3, delay: topicIdx * 0.07 }}
                            className={`relative flex w-full mb-2 z-10`}
                          >
                            {/* Mobile layout - straight vertical list */}
                            <div className="md:hidden w-full flex items-center justify-center">
                              <div className="flex items-center gap-3 bg-gray-100 rounded-lg shadow-sm px-6 py-3 hover:bg-purple-50 transition-colors duration-200 w-full max-w-md">
                                <span className="text-gray-500 font-bold text-lg w-8 text-center">{topicIdx + 1}</span>
                                <span className="flex-1 text-gray-800 font-medium">{topic}</span>
                                {topicIdx === chapter?.topics?.length - 1 && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                  >
                                    <Gift className="text-purple-500 h-7 w-7" />
                                  </motion.span>
                                )}
                              </div>
                            </div>

                            {/* Desktop layout - alternating left/right */}
                            <div className="hidden md:flex w-full">
                              {/* Left side */}
                              <div className={`flex-1 flex ${isLeft ? 'justify-end' : 'justify-start'} pr-4 pl-4`}> 
                                {isLeft && (
                                  <div className="max-w-md w-fit">
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg shadow-sm px-6 py-3 hover:bg-purple-50 transition-colors duration-200">
                                      <span className="text-gray-500 font-bold text-lg w-8 text-center">{topicIdx + 1}</span>
                                      <span className="flex-1 text-gray-800 font-medium">{topic}</span>
                                      {topicIdx === chapter?.topics?.length - 1 && (
                                        <motion.span
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                        >
                                          <Gift className="text-purple-500 h-7 w-7" />
                                        </motion.span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              {/* Timeline dot */}
                              <div className="flex flex-col items-center z-20">
                                <span className="w-5 h-5 rounded-full bg-purple-500 border-4 border-white shadow-md" />
                              </div>
                              {/* Right side */}
                              <div className={`flex-1 flex ${!isLeft ? 'justify-start' : 'justify-end'} pr-4 pl-4`}>
                                {!isLeft && (
                                  <div className="max-w-md w-fit">
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg shadow-sm px-6 py-3 hover:bg-purple-50 transition-colors duration-200">
                                      <span className="text-gray-500 font-bold text-lg w-8 text-center">{topicIdx + 1}</span>
                                      <span className="flex-1 text-gray-800 font-medium">{topic}</span>
                                      {topicIdx === chapter?.topics?.length - 1 && (
                                        <motion.span
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                        >
                                          <Gift className="text-purple-500 h-7 w-7" />
                                        </motion.span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </React.Fragment>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button className='text-lg px-20 py-4 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 hover:scale-105 hover:shadow-2xl ease-in-out duration-300 text-white font-bold rounded-full shadow-lg'>
              Finish
            </Button>
          </motion.div>
        </div>
      </div>
    )
}

export default ChapterTopicList