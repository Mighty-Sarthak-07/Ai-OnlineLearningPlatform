import { Button } from '@/components/ui/button';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, BoxIcon, Clock, Loader2, PlayCircleIcon, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTaskModal } from '@/context/TaskContext';
import { Sparkles, Calendar as CalendarIcon } from 'lucide-react';

function CourseInfo({course,ViewCourse}) {

    const courseLayout = course?.courseJson?.course;
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const { openTaskModal, setNewTasksAdded } = useTaskModal();
    const [aiLoading, setAiLoading] = useState(false);
    const [showDeadlineModal, setShowDeadlineModal] = useState(false);
    const [deadlineInput, setDeadlineInput] = useState(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const GetCourseContent = async () => {
      setLoading(true);
      try{
        const result = await axios.post("/api/generate-course-content",{
          courseJson : courseLayout,
          courseTitle : course?.name,
          courseId : course?.cid,
        })
        console.log(result.data);
        setLoading(false);
        router.replace(`/workspace`);
        toast.success("Course Content Generated Successfully");
      }catch(error){
        console.log(error);
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response.data?.error || error.response.data?.details || 'Server error occurred';
          toast.error(`Error: ${errorMessage}`);
        } else if (error.request) {
          toast.error("Network error: Please check your connection");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }

    const executeAiPlan = async (deadline) => {
      setShowDeadlineModal(false);
      if (!deadline) return;

      setAiLoading(true);
      toast.info("AI is crafting your study plan...");

      try {
        const response = await axios.post('/api/ai-tasks', {
          courseTitle: courseLayout?.name,
          chapters: courseLayout?.chapters,
          deadline: deadline
        });

        const newTasks = response.data.tasks.map(t => ({
          ...t,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          status: 'Pending',
          createdAt: new Date().toISOString()
        }));

        // Get existing tasks to append
        const savedTasks = JSON.parse(localStorage.getItem('skillworld_tasks') || '[]');
        const updatedTasks = [...newTasks, ...savedTasks];
        localStorage.setItem('skillworld_tasks', JSON.stringify(updatedTasks));
        
        setNewTasksAdded(true);
        setAiLoading(false);
        toast.success("Study plan generated and added to your Task Manager!");
        openTaskModal();
      } catch (error) {
        console.error(error);
        setAiLoading(false);
        const serverDetail = error.response?.data?.details || error.response?.data?.error;
        toast.error(`Error: ${serverDetail || 'Failed to generate AI plan'}`);
      }
    }

    console.log(course?.bannerImageUrl);
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='sm:flex gap-8 justify-between shadow-2xl p-8 bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl items-center border border-transparent dark:border-slate-800'
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='flex flex-col gap-6 flex-2'
        >
          <h2 className='text-3xl font-extrabold text-purple-900 dark:text-purple-300'>{courseLayout?.name}</h2>
          <p className='text-lg text-gray-700 dark:text-gray-300'>{courseLayout?.description}</p>
          <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
            <div className='flex items-center gap-6 p-4 rounded-2xl mt-2 bg-purple-100 dark:bg-purple-500/10 shadow-md dark:shadow-none hover:scale-[1.03] transition-transform border border-transparent dark:border-purple-500/20'>
              <Clock className='w-10 h-10 text-purple-500 dark:text-purple-400'/>
              <section>
                <h1 className="font-bold dark:text-slate-200">Course Duration</h1>
                <h2>4 hours</h2>
              </section>
            </div>
            <div className='flex items-center gap-6 p-4 rounded-2xl mt-2 bg-blue-100 dark:bg-blue-500/10 shadow-md dark:shadow-none hover:scale-[1.03] transition-transform border border-transparent dark:border-blue-500/20'>
              <BookOpen className='w-10 h-10 text-blue-500 dark:text-blue-400'/>
              <section>
                <h1 className="font-bold dark:text-slate-200">Chapters</h1>
                <h2>{courseLayout?.chapters?.length}</h2>
              </section>
            </div>
            <div className='flex items-center gap-6 p-4 rounded-2xl mt-2 bg-red-100 dark:bg-red-500/10 shadow-md dark:shadow-none hover:scale-[1.03] transition-transform border border-transparent dark:border-red-500/20'>
              <TrendingUp className='w-10 h-10 text-red-500 dark:text-red-400'/>
              <section>
                <h1 className="font-bold dark:text-slate-200">Difficulty Level</h1>
                <h2>{courseLayout?.level}</h2>
              </section>
            </div>
            {!ViewCourse ?
             <Button className='text-lg mx-2 bg-gradient-to-r from-purple-500 to-indigo-500  hover:scale-[1.05] hover:shadow-lg ease-in-out duration-300 md:w-[250px] hover:text-white flex items-center gap-2' onClick={GetCourseContent} disabled={loading}>
            {loading ? <Loader2 className='w-10 h-10 text-purple-500 animate-spin'/> : <BoxIcon/>} Generate Content
            </Button> : 
            <div className='flex flex-col md:flex-row gap-3'>
              <Link href={`/course/${course?.cid}`}>
                <Button className='text-lg mx-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-[1.05] hover:shadow-lg ease-in-out duration-300 md:w-[250px] hover:text-white flex items-center gap-2'>
                  <PlayCircleIcon/> Continue Learning
                </Button>
              </Link>
              <Button 
                variant="outline"
                className='text-lg mx-2 border-2 border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:scale-[1.05] ease-in-out duration-300 md:w-[250px] flex items-center gap-2'
                onClick={() => setShowDeadlineModal(true)}
                disabled={aiLoading}
              >
                {aiLoading ? <Loader2 className='w-5 h-5 animate-spin'/> : <Sparkles className='w-5 h-5'/>} 
                {aiLoading ? 'AI Planning...' : 'Let AI plan my schedule'}
              </Button>
            </div>
          }
          </div>
         
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='flex-1 flex justify-center items-center'
        >
          {course?.bannerImageUrl ? (
            <Image 
              src={course.bannerImageUrl}
              alt="banner image"
              width={600}
              height={400}
              className='pt-3 rounded-2xl shadow-xl w-[400px] h-[240px] object-cover border-4 border-white dark:border-slate-800'
            />
          ) : null}
        </motion.div>

        <AnimatePresence>
          {showDeadlineModal && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[20px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-violet-50/50 dark:bg-violet-900/10">
                  <div className="flex items-center gap-2.5 text-violet-600 dark:text-violet-400 font-bold tracking-tight">
                    <Sparkles className="w-5 h-5" />
                    AI Study Assistant
                  </div>
                  <button 
                    onClick={() => setShowDeadlineModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                    Choose your target completion date. The AI will distribute bite-sized learning tasks evenly across your calendar to perfectly match your schedule.
                  </p>
                  <div className="mb-6">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                      <CalendarIcon className="w-3.5 h-3.5"/> Target Date
                    </label>
                    <input 
                      type="date"
                      value={deadlineInput}
                      onChange={(e) => setDeadlineInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium text-slate-800 dark:text-slate-200"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl h-11 border-slate-200 dark:border-slate-800"
                      onClick={() => setShowDeadlineModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 rounded-xl h-11 bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200 dark:shadow-none" 
                      onClick={() => executeAiPlan(deadlineInput)}
                    >
                      Plan Schedule
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    )
}

export default CourseInfo