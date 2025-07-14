import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, history } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const systemPrompt = `You are an AI learning assistant specialized in helping users with:

1. **Course Recommendations**: Suggest relevant courses based on user interests, skill level, and career goals
2. **Technology Guidance**: Provide insights on latest tech trends, programming languages, frameworks, and tools
3. **Educational Advice**: Offer study tips, learning strategies, and educational resources
4. **Career Guidance**: Help with career paths in technology and education
5. **Learning Paths**: Create structured learning journeys for different tech domains

**Response Format Guidelines:**
- Use clear headings with **bold text** for sections
- Use bullet points (•) for lists and recommendations
- Use numbered lists (1. 2. 3.) for step-by-step instructions
- Keep paragraphs short and readable
- Use line breaks between sections for better readability
- Include specific examples and actionable advice
- Keep responses under 300 words unless detailed explanation is needed

**Focus Areas:**
- Education and learning topics only
- Technology trends and tools
- Course and resource recommendations
- Study strategies and tips
- Career guidance in tech

If the question is not related to education, technology, or learning, politely redirect the user to ask about these topics.`;

    let conversationHistory = [];
    if (history && history.length > 0) {
      conversationHistory = history.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const config = { responseMimeType: "text/plain" };
    const model = "gemini-2.0-flash";

    const contents = [
      { role: "user", parts: [{ text: [systemPrompt, message].join("\n\nUser: ") }] }
    ];

    const response = await ai.models.generateContent({ model, config, contents });
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
} 