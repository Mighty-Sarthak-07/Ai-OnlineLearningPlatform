import React, { useContext } from "react";
import { SelectedChapterContext } from "@/context/SelectedChapterContext";
import { CheckCircle, Video } from "lucide-react";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollcourses;
  const courseContent = course?.courseContent;
  const { selectedChapter } = useContext(SelectedChapterContext);
  const VideoData = courseContent?.[selectedChapter]?.youtubeVideos;
  const topics = courseContent?.[selectedChapter]?.courseData?.topics;
 let completedChapter = enrollCourse?.completedChapters ?? [];
  const markCompleted = async () => {
    try {
     

      if (!completedChapter.includes(selectedChapter)) {
        completedChapter.push(selectedChapter);

        await axios.put("/api/enroll-course", {
          courseId: courseId,
          completedChapter: completedChapter,
        });

        await refreshData();
        toast.success("Chapter marked as completed");
      } else {
        toast.info("Chapter already completed");
      }
    } catch (error) {
      console.error("Error marking chapter as completed:", error);
      toast.error("Failed to mark chapter as completed");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-7">
      <div className="flex justify-between items-center">
        {courseContent?.[selectedChapter] ? (
          <h2 className="text-2xl font-bold">
            {selectedChapter + 1}.{" "}
            {courseContent[selectedChapter]?.courseData?.chapterName}
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-red-500">
            Chapter data not available.
          </h2>
        )}
        {!completedChapter.includes(selectedChapter) ? (
          <Button
            className="p-1 m-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white"
            onClick={markCompleted}
          >
            <CheckCircle className="mr-2" />
            Mark as Completed
          </Button>
        ) : (
          <Button
            className="p-1 m-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white"
            onClick={markCompleted}
            disabled
          >
            <CheckCircle className="mr-2" />
           Completed
          </Button>
        )}
      </div>

      <div className="flex items-center p-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
          Related Videos
        </h2>
        <Video className="m-1 mx-2" />
      </div>

      <div className="space-y-4 grid grid-col-1 md:grid-cols-2 gap-5">
        {VideoData?.length > 0 ? (
          VideoData.slice(0, 2).map((video, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <YouTube
                videoId={video.id}
                opts={{
                  height: "320",
                  width: "580",
                  playerVars: {
                    autoplay: 0,
                  },
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">
            No videos available for this chapter.
          </p>
        )}
      </div>

      <div>
        {topics?.map((topic, index) => (
          <div
            key={index}
            className="bg-secondary p-4 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold m-2 bg-gradient-to-bl from-slate-100 via-violet-700 to-purple-600 bg-clip-text text-transparent">
              {index + 1}. {topic?.topic}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              className="m-2"
              style={{ lineHeight: "2.5" }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
