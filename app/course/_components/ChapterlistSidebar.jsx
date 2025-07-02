import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterContext } from '@/context/SelectedChapterContext';
import { CheckCircle } from 'lucide-react';

function ChapterlistSidebar({ courseInfo }) {  
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollcourses;
  const courseContent = courseInfo?.courses?.courseContent;
    const {selectedChapter, setSelectedChapter} = useContext(SelectedChapterContext);
     let completedChapter = enrollCourse?.completedChapters ?? [];


  return (
    <div className='w-[33%] bg-secondary h-screen p-5'>
        <h2 className='my-3 text-2xl font-bold'>Chapters</h2>
      <Accordion type="single" collapsible>
      {Array.isArray(courseContent) && courseContent.length > 0 ? (courseContent?.map((chapter,index)=>(
  <AccordionItem value={chapter?.courseData?.chapterName} key={index} onClick={()=>setSelectedChapter(index)}>
    <AccordionTrigger className="text-lg font-bold">{index+1}. {chapter?.courseData?.chapterName}{completedChapter.includes(index) ? <CheckCircle className='text-green-800 items-center justify-between mt-4 size-8'/> : ''}</AccordionTrigger>
    <AccordionContent asChild>
      <div>
        {chapter?.courseData?.topics?.map((topic,index1)=>(
          <div key={index1}>
            <h3 className={`text-sm p-2 m-2 rounded-md ${completedChapter.includes(index) ? 'bg-green-300' : 'bg-white'}`}>{topic?.topic}</h3>
            <p className={`text-lg`}>{topic?.topicDescription}</p>
          </div>
        ))}
      </div>
      
    </AccordionContent>
  </AccordionItem>
          ))
        ):(
          <p> No Chapter Available</p>
        )}
</Accordion>
    </div>
  )
}

export default ChapterlistSidebar
