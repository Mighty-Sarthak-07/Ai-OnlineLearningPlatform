import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
const PROMPT = `Generate content for each topic in HTML format and return ONLY valid JSON. Do not include any text before or after the JSON.

Required JSON Schema:
{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "HTML content string"
    }
  ]
}

Important: 
- Return ONLY the JSON object, no markdown formatting
- Ensure all JSON is properly formatted with correct quotes and commas
- Do not include any explanatory text outside the JSON
- Make sure all HTML content is properly escaped within the JSON strings

Chapter and Topics to generate content for:`

export async function POST(req) {
    try {
        const {courseJson,courseTitle,courseId} = await req.json();
        
        if (!courseJson?.chapters) {
            return NextResponse.json({ error: "No chapters found" }, { status: 400 });
        }

        const promises = courseJson.chapters.map(async(chapter)=>{
            try {
                const ai = new GoogleGenAI({
                    apiKey: process.env.GEMINI_API_KEY,
                });
                const config = {
                    responseMimeType: 'text/plain',
                };
                const model = 'gemini-2.0-flash';
                const contents = [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: PROMPT + JSON.stringify(chapter),
                            },
                        ],
                    },
                ];
                
                const response = await ai.models.generateContent({
                    model,
                    config,
                    contents,
                });
                
                console.log("AI Response:", response.candidates[0].content.parts[0].text);
                const RawResp = response?.candidates[0]?.content?.parts[0]?.text;
                let RawJson = RawResp.replace('```json', '').replace('```', '').trim();
                
                    RawJson = RawJson.replace(/,\s*}/g, '}');
                RawJson = RawJson.replace(/,\s*]/g, ']');
                
                let JSONResponse;
                try {
                    JSONResponse = JSON.parse(RawJson);
                } catch (parseError) {
                    console.error("JSON Parse Error:", parseError);
                    console.log("Raw JSON that failed to parse:", RawJson);
                    
                    const jsonMatch = RawJson.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        try {
                            JSONResponse = JSON.parse(jsonMatch[0]);
                        } catch (secondError) {
                            console.error("Second JSON parse attempt failed:", secondError);
                            JSONResponse = {
                                chapterName: chapter.chapterName,
                                topics: chapter.topics?.map(topic => ({
                                    topic: topic,
                                    content: `<p>Content generation failed for this topic. Please try again.</p>`
                                })) || [],
                                error: "Failed to parse AI response"
                            };
                        }
                    } else {
                        
                        JSONResponse = {
                            chapterName: chapter.chapterName,
                            topics: chapter.topics?.map(topic => ({
                                topic: topic,
                                content: `<p>Content generation failed for this topic. Please try again.</p>`
                            })) || [],
                            error: "No valid JSON found in AI response"
                        };
                    }
                }
                const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
                console.log(youtubeData);
                return {
                    youtubeVideos:youtubeData,
                   courseData:JSONResponse,
                };
            } catch (error) {
                console.error("Error generating content for chapter:", error);
                return {
                    chapterName: chapter.chapterName,
                    topics: chapter.topics?.map(topic => ({
                        topic: topic,
                        content: `<p>Content generation failed for this topic. Please try again.</p>`
                    })) || [],
                    error: "Failed to generate content for this chapter"
                };
            }
        });

        const CourseContent = await Promise.all(promises);

        //save to DB
        const dbResp = await db.update(coursesTable).set({
            courseContent: CourseContent,
        }).where(eq(coursesTable.cid, courseId));

        return NextResponse.json({
            courseName: courseTitle,
            CourseContent: CourseContent,
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ 
            error: "Failed to generate course content",
            details: error.message 
        }, { status: 500 });
    }
}
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYoutubeVideo = async (topic) => {  
    const params = {
        part: "snippet",
        q: topic,
        maxResults: 4,
        type: "video",
        key: process.env.YOUTUBE_API_KEY,
    }
    const response = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListData = response.data.items;
    const youtubeVideoList = [];
    youtubeVideoListData.forEach(item => {
        const data = {
            id: item.id?.videoId,
            title: item?.snippet?.title,
        }
        youtubeVideoList.push(data);
    })
    console.log(youtubeVideoList);
    return youtubeVideoList;
}