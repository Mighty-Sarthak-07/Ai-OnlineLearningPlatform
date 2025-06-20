import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';

const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspaces tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, Topic under each chapters, Duration for each chapters etc, in JSON format only
Schema:
{
"course": {
"name": "string",
"description": "string",
"category": "string",
"level": "string",
"includeVideo": "boolean",
"noOfChapters": "number",
"bannerImagePrompt": "string",
"chapters": [
{
"chapterName": "string",
"duration": "string",
"topics": [
"string"
]
}
]
}
}
User Input:`

const GenerateImage = async (prompt) => {
  const BASE_URL='https://aigurulab.tech';
  try {
    if (!process.env.AI_GURU_LAB_API_KEY) {
      throw new Error('AI_GURU_LAB_API_KEY is not configured');
    }
    
    const result = await axios.post(BASE_URL+'/api/generate-image',
      {
        width: 1024,
        height: 1024,
        input: prompt,
        model: 'flux',
        aspectRatio: "16:9"
      },
      {
        headers: {
          'x-api-key': process.env.AI_GURU_LAB_API_KEY,
          'Content-Type': 'application/json',
        },
      });

    if (!result.data || !result.data.image) {
      throw new Error('No image data received from AI Guru Lab API');
    }

    console.log('Image generated successfully');
    return result.data.image;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate course banner image: ' + error.message);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    const {courseId,...formData} = body;
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

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
            text: PROMPT+JSON.stringify(formData),
          },
        ],
      },
    ];
  
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
   console.log(response.candidates[0].content.parts[0].text);
   const RawResp = response?.candidates[0]?.content?.parts[0]?.text;
   const RawJson = RawResp.replace('```json', '').replace('```', '');
   const JSONResponse = JSON.parse(RawJson);
   //generate image from image prompt
   const ImagePrompt= JSONResponse.course?.bannerImagePrompt;

   const bannerImageUrl = await GenerateImage(ImagePrompt);

    const result = await db.insert(coursesTable).values({
      ...formData,
      courseJson: JSONResponse,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid:courseId,
      bannerImageUrl:bannerImageUrl,
    })

    return NextResponse.json({courseId:courseId});
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}