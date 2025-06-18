"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2, Sparkle } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AddNewCourse({children}) {

  const [isLoading, setIsLoading] = useState(false);

    const [formdata, setFormdata] = useState({
        name: "",
        description: "",
        noOfChapters: 0,
        includeVideo: false,
        level: "",
        category: "",
    });
    const onHandleChange = (field, value) => {
        setFormdata(prev => ({...prev, [field]: value}));
        console.log(formdata);
    }

    const onGenerate = async () => { 
      console.log(formdata);
      const courseId = uuidv4();
       try{
         setIsLoading(true);
        const result = await axios.post("/api/generate-course-layout", {
          ...formdata,
          courseId:courseId
        })
        console.log(result.data);
        setIsLoading(false);
       } catch (error) { 
        setIsLoading(false);
        console.log(error);
       }
    }   

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
        <Input type="text" placeholder="Course Name" onChange={(e) => onHandleChange("name", e?.target.value)} />
       </div>
       <div className='flex flex-col gap-2'>
        <Label className='text-lg font-bold'>Course Description {`(optional)`}</Label>
        <Textarea placeholder='description' onChange={(e) => onHandleChange("description", e?.target.value)} />
       </div>
       <div className='flex flex-col gap-2'>
        <Label className='text-lg font-bold'>No. of Chapters</Label>
        <Input type="number" placeholder="No. of Chapters" onChange={(e) => onHandleChange("noOfChapters", e?.target.value)} />
       </div>
       <div className='flex items-center gap-5'>
        <Label className='text-lg font-bold'>Include Video</Label>  <Switch className= "items-end"  onCheckedChange= {() => onHandleChange("includeVideo", !formdata?.includeVideo)} />
       
       </div>
       <div><label className='text-lg font-bold mb-2'> Difficulty </label>
       <Select onValueChange={(e) => onHandleChange("level", e)}>
        <SelectTrigger className='w-full'>
            <SelectValue placeholder="Select Difficulty"  />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
       </Select>
       </div>
       <div className='flex flex-col gap-2'>
        <Label className='text-lg font-bold'>Category</Label>
        <Input type="text" placeholder="e.g. Education,Technology,etc." onChange={(e) => onHandleChange("category", e?.target.value)} />
       </div>
       <div>
        <Button className='w-full mt-5' onClick={onGenerate} disabled={isLoading}> 
          {isLoading ? <Loader2 className='animate-spin' /> : <Sparkle/>}
         Create Course</Button>
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