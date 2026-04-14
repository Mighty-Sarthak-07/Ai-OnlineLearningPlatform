import { GoogleGenAI } from "@google/genai";

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

async function test() {
    const ai = new GoogleGenAI({
        apiKey: "AQ.Ab8RN6L3N7Vcmopyg4fiGnjZta9qBsKvi8wXm7ollDTNI02ZGQ",
    });

    const modelName = 'gemini-2.5-flash';
    const config = {
        responseMimeType: 'text/plain',
    };

    const promptText = PROMPT
        .replace(/{courseTitle}/g, "Test Course")
        .replace(/{chapters}/g, JSON.stringify([{name: 'ch1'}]))
        .replace(/{deadline}/g, "2026-05-01")
        .replace(/{currentDate}/g, "2026-04-14");

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

    try {
        console.log("Calling generateContent...");
        const response = await ai.models.generateContent({
            model: modelName,
            config,
            contents,
        });
        console.log("SUCCESS!");
        console.log(response?.candidates[0]?.content?.parts[0]?.text);
    } catch (e) {
        console.error("ERROR!");
        console.error(e);
        if (e.statusDetails) console.error(e.statusDetails);
    }
}

test();
