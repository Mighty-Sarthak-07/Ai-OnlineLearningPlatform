'use client';

import React, { useContext, useState } from 'react';
import { SelectedChapterContext } from '@/context/SelectedChapterContext';
import { CheckCircle2, PlayCircle, BookOpen, Loader2, Sparkles } from 'lucide-react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollcourses;
  const courseContent = course?.courseContent;
  const { selectedChapter } = useContext(SelectedChapterContext);
  const VideoData = courseContent?.[selectedChapter]?.youtubeVideos;
  const topics = courseContent?.[selectedChapter]?.courseData?.topics;
  const chapterName = courseContent?.[selectedChapter]?.courseData?.chapterName;
  const [isMarking, setIsMarking] = useState(false);

  let completedChapter = enrollCourse?.completedChapters ?? [];
  const isCompleted = completedChapter.includes(selectedChapter);

  const markCompleted = async () => {
    if (isCompleted || isMarking) return;
    setIsMarking(true);
    try {
      if (!completedChapter.includes(selectedChapter)) {
        completedChapter.push(selectedChapter);
        await axios.put('/api/enroll-course', {
          courseId: courseId,
          completedChapter: completedChapter,
        });
        await refreshData();
        toast.success('Chapter marked as completed! 🎉');
      } else {
        toast.info('Chapter already completed');
      }
    } catch (error) {
      console.error('Error marking chapter as completed:', error);
      toast.error('Failed to mark chapter as completed');
    } finally {
      setIsMarking(false);
    }
  };

  if (!courseContent?.[selectedChapter]) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 min-h-screen">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7 text-slate-300" />
          </div>
          <p className="text-slate-400 text-sm">Select a chapter to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-slate-50 text-slate-800 overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedChapter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto px-6 py-8"
        >
          {/* Chapter header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8
            bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-violet-600 uppercase tracking-widest">
                  Chapter {selectedChapter + 1}
                </span>
                {isCompleted && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5
                    bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {chapterName}
              </h1>
            </div>

            {/* Mark as completed button */}
            {!isCompleted ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={markCompleted}
                disabled={isMarking}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-violet-600 to-fuchsia-600
                  text-white text-sm font-semibold
                  shadow-md shadow-violet-200
                  hover:shadow-lg hover:shadow-violet-300 transition-all duration-200
                  disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isMarking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {isMarking ? 'Saving...' : 'Mark as Completed'}
              </motion.button>
            ) : (
              <div className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-emerald-50 text-emerald-600 border border-emerald-200
                text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </div>
            )}
          </div>

          {/* Videos section */}
          {VideoData?.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
                  <PlayCircle className="w-4 h-4 text-violet-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Related Videos</h2>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {Math.min(VideoData.length, 4)} videos
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {VideoData.slice(0, 4).map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-2xl overflow-hidden border border-slate-200 bg-white
                      shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <div className="absolute inset-0">
                        <YouTube
                          videoId={video.id}
                          opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: { autoplay: 0, modestbranding: 1, rel: 0 },
                          }}
                          className="w-full h-full"
                          iframeClassName="w-full h-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Topics section */}
          {topics?.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-fuchsia-50 border border-fuchsia-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-fuchsia-500" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Chapter Content</h2>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {topics.length} topics
                </span>
              </div>

              <div className="space-y-4">
                {topics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="group rounded-2xl border border-slate-200 bg-white
                      shadow-sm hover:shadow-md hover:border-violet-200
                      transition-all duration-300 overflow-hidden"
                  >
                    {/* Topic header */}
                    <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b border-slate-50">
                      <div className="w-6 h-6 rounded-md bg-violet-50 border border-violet-200
                        flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-600">
                        {index + 1}
                      </div>
                      <h3 className="text-base font-semibold text-slate-800 leading-snug">
                        {topic?.topic}
                      </h3>
                    </div>

                    {/* Topic content */}
                    <div
                      className="px-5 pb-5 pt-3 prose-light text-slate-600 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: topic?.content }}
                      style={{ lineHeight: '1.9' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!topics?.length && !VideoData?.length && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                <BookOpen className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm">No content available for this chapter yet.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ChapterContent;
