import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const PROMPT = `You are an expert learning coach. Given a course title and its chapters, generate 5-10 actionable, bite-sized tasks for a student to complete. 
The tasks should be spread out logically from the current date until the specified deadline.

Format each task as a JSON object within a list:
{
  "tasks": [
    {
      "title": "Short actionable title",
      "description": "Brief instruction what to do",
      "priority": "High" | "Medium" | "Low",
      "deadlineDate": "YYYY-MM-DD"
    }
  ]
}

- Start dates from TODAY ({currentDate}).
- Spread them evenly until the deadline ({deadline}).
- Ensure the JSON is valid.
- Return ONLY the JSON.

Course: {courseTitle}
Chapters: {chapters}
Deadline (Target Completion Date): {deadline}
Current Date: {currentDate}
`;

export async function POST(req) {
    try {
        const { courseTitle, chapters, deadline } = await req.json();
        const currentDate = new Date().toISOString().split('T')[0];

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const modelName = 'gemini-2.5-flash';
        const config = {
            responseMimeType: 'text/plain',
        };

        const promptText = PROMPT
            .replace(/{courseTitle}/g, courseTitle || 'Unknown Course')
            .replace(/{chapters}/g, JSON.stringify(chapters || []))
            .replace(/{deadline}/g, deadline)
            .replace(/{currentDate}/g, currentDate);

        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: promptText,
                    },
                ],
            },
        ];
        
        let response;
        try {
            response = await ai.models.generateContent({
                model: modelName,
                config,
                contents,
            });
        } catch (genErr) {
             console.error("GenAI Library Error:", genErr);
             throw new Error(genErr.message || "Model failed to generate response.");
        }
        
        const rawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text || '{"tasks":[]}';
        let cleanJson = rawResp.replace(/```json/gi, '').replace(/```/g, '').trim();
        
        let tasks = [];
        try {
            tasks = JSON.parse(cleanJson);
        } catch(parseErr) {
             console.error("Failed to parse JSON:", cleanJson);
             throw new Error("AI returned invalid JSON format.");
        }

        return NextResponse.json(tasks.tasks ? tasks : { tasks });
    } catch (error) {
        console.error("AI Task Generation Error:", error);
        const isQuotaExceeded = error.message?.includes('429') || error.message?.toLowerCase().includes('quota');
        return NextResponse.json({ 
            error: isQuotaExceeded ? "AI Quota Exceeded. Please try again in 1-2 minutes." : "Failed to generate tasks", 
            details: error.message 
        }, { status: isQuotaExceeded ? 429 : 500 });
    }
}
