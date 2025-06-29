import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function ChapterlistSidebar({ courseInfo }) {  
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollcourses;
  const courseContent = courseInfo?.courses?.courseContent;

  return (
    <div className='w-96 bg-gradient-to-r from-slate-200 to-slate-400 h-screen p-5'>
        <h2 className='my-3 text-2xl font-bold'>Chapters</h2>
      <Accordion type="single" collapsible>
      {Array.isArray(courseContent) && courseContent.length > 0 ? (courseContent?.map((chapter,index)=>(
  <AccordionItem value={chapter?.courseData?.chapterName} key={index}>
    <AccordionTrigger className="text-lg font-bold">{index+1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
    <AccordionContent asChild>
      <div>
        {chapter?.courseData?.topics?.map((topic,index)=>(
          <div key={index}>
            <h3 className='text-sm p-2 m-2 rounded-sm bg-white'>{topic?.topic}</h3>
            <p className='text-lg'>{topic?.topicDescription}</p>
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
