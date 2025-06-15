"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
function AddNewCourse({children}) {
  return (
    <div>
<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-2xl font-bold'>Create New Course using AI</DialogTitle>
      <DialogDescription asChild>
       <div className='flex flex-col p-3 gap-5'>
       <div className='flex flex-col gap-2'>
        <Label className='text-lg font-bold'>Course Name</Label>
        <Input type="text" placeholder="Course Name" />
       </div>
       <div className='flex flex-col gap-2'>
        <Label className='text-lg font-bold'>Course Description {`(optional)`}</Label>
        <Textarea placeholder='Course Description' />
       </div>
       <div className='flex flex-col gap-2'>
        <Label className='text-lg font-bold'>No. of Chapters</Label>
        <Input type="number" placeholder="No. of Chapters" />
       </div>
       <div className='flex items-center gap-2'>
        <Label className='text-lg font-bold'>Include Video</Label>  <Switch className= "align-end" />
       
       </div>
       </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewCourse