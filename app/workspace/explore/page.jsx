"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import AppHeader from "../_components/AppHeader";
import CourseCard from "../_components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

function Explore() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([])  
  const {user} = useUser();
  
  useEffect(() => {
    user && GetCoursesList()
  }, [user])

  const GetCoursesList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/courses?courseId=0')
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AppHeader/>
    <div className="p-4 m-7 flex flex-col">
      <h2 className="text-4xl font-bold p-2 mb-4 text-verdana bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Explore More Courses
      </h2>

      <div className="flex gap-4 items-center">
        <Input placeholder="Search" />
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-[1.05] hover:shadow-lg ease-in-out duration-300 hover:text-white flex items-center gap-2 ml-4">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="flex flex-col mt-6">
        <h2 className="text-3xl font-bold p-3">My Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            [0,1,2,3].map((item)=>(
              <Skeleton key={item} className="w-full h-[240px]"/>
            ))
          ) : courses.length > 0 ? (
            courses.map((course,index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 p-4">No courses found.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Explore;
