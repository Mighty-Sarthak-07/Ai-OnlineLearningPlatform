"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function AIToolsPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI learning assistant. I can help you with course-related questions, tech recommendations, and educational guidance. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [showSuggested, setShowSuggested] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What are the best courses for learning React?",
    "Can you recommend resources for machine learning?",
    "How can I improve my coding skills?",
    "What's the latest in web development trends?",
    "Suggest a learning path for data science"
  ];

  // Function to format AI responses with better formatting
  const formatAIResponse = (content) => {
    if (!content) return content;
    
    // Split content into paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if it's a list item
      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
        return (
          <div key={index} className="mb-2">
            <ul className="list-disc list-inside space-y-1 ml-2">
              {paragraph.split('\n').map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm">
                  {item.replace(/^[•-]\s*/, '')}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Check if it's a numbered list
      if (/^\d+\./.test(paragraph.trim())) {
        return (
          <div key={index} className="mb-2">
            <ol className="list-decimal list-inside space-y-1 ml-2">
              {paragraph.split('\n').map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm">
                  {item.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ol>
          </div>
        );
      }
      
      // Check if it's a heading (starts with ** or #)
      if (paragraph.trim().startsWith('**') || paragraph.trim().startsWith('#')) {
        return (
          <h3 key={index} className="font-semibold text-base mb-2 mt-3 first:mt-0">
            {paragraph.replace(/^[*#]+\s*/, '')}
          </h3>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-2 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  // Framer Motion blob animation variants
  const blobVariants = {
    animate1: {
      x: [0, 40, -30, 0],
      y: [0, -30, 20, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: { duration: 18, repeat: Infinity, ease: "easeInOut" }
    },
    animate2: {
      x: [0, -30, 20, -10, 0],
      y: [0, 40, -20, 10, 0],
      scale: [1, 1.05, 0.97, 1.08, 1],
      transition: { duration: 22, repeat: Infinity, ease: "easeInOut" }
    },
    animate3: {
      x: [0, -20, 30, 0],
      y: [0, 30, -10, 0],
      scale: [1, 1.07, 0.93, 1],
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative container mx-auto p-2 sm:p-6 max-w-6xl min-h-screen overflow-hidden">
      {/* Animated background blobs with Framer Motion */}
      <div aria-hidden="true">
        <motion.div
          className="pointer-events-none select-none absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl z-0"
          variants={blobVariants}
          animate="animate1"
        />
        <motion.div
          className="pointer-events-none select-none absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-br from-purple-300 via-blue-300 to-green-300 opacity-20 rounded-full blur-2xl z-0"
          variants={blobVariants}
          animate="animate2"
        />
        <motion.div
          className="pointer-events-none select-none absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-tl from-pink-300 via-purple-200 to-blue-200 opacity-20 rounded-full blur-2xl z-0"
          variants={blobVariants}
          animate="animate3"
        />
      </div>
      {/* Main content (z-10) */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Header restored above the tab buttons */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">AI Learning Assistant</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get personalized help with courses, tech recommendations, and educational guidance
              </p>
            </div>
          </div>
        </div>
        {/* Top Buttons for Popups */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
          <Dialog open={showSuggested} onOpenChange={setShowSuggested}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="font-medium px-4 py-2 text-sm"
                onClick={() => setShowSuggested(true)}
              >
                Suggested Questions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-full">
              <DialogHeader>
                <DialogTitle>Suggested Questions</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 mt-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-2 text-sm"
                    onClick={() => {
                      setInput(question);
                      setShowSuggested(false);
                    }}
                    disabled={isLoading}
                  >
                    <span className="line-clamp-2">{question}</span>
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showHelp} onOpenChange={setShowHelp}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="font-medium px-4 py-2 text-sm"
                onClick={() => setShowHelp(true)}
              >
                What I Can Help With
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-full">
              <DialogHeader>
                <DialogTitle>What I Can Help With</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm mt-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Course recommendations and reviews</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Technology trends and updates</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learning path suggestions</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Study tips and techniques</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Career guidance in tech</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col h-[70vh] sm:h-[600px] min-h-[400px]">
            <Card className="flex flex-col flex-1 min-h-0 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Chat Assistant
                </CardTitle>
                <CardDescription>
                  Ask me anything about courses, technology, or education
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2 custom-scrollbar min-h-0" style={{scrollbarWidth: 'thin'}}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 sm:gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-xl p-3 sm:p-4 shadow-sm ${
                            message.role === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-900 border border-gray-200"
                          }`}
                          style={{wordBreak: 'break-word'}}
                        >
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.role === "assistant" ? (
                              <div className="prose prose-sm max-w-none">
                                {formatAIResponse(message.content)}
                              </div>
                            ) : (
                              message.content
                            )}
                          </div>
                          <p className="text-xs opacity-60 mt-1 text-right">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2 sm:gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 rounded-xl p-3 sm:p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex gap-2 p-2 border-t bg-white sticky bottom-0 z-10">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about courses, tech, or education..."
                    className="flex-1 text-sm sm:text-base"
                    disabled={isLoading}
                    autoFocus
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="px-3 sm:px-4"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar removed: no more suggested/help cards */}
        </div>
      </motion.div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 6px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb #fff;
        }
      `}</style>
    </div>
  );
} 