"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Send, User, Sparkles, BookOpen, TrendingUp,
  Code2, BrainCircuit, Lightbulb, ChevronRight, Loader2, RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import AppHeader from "../_components/AppHeader";

const SUGGESTED = [
  { icon: BookOpen,     text: "Best courses to learn React in 2024?" },
  { icon: TrendingUp,   text: "Suggest a learning path for data science" },
  { icon: Code2,        text: "How can I improve my coding skills?" },
  { icon: BrainCircuit, text: "Resources for machine learning beginners?" },
  { icon: Lightbulb,    text: "What are the latest web dev trends?" },
];

function formatAIResponse(content) {
  if (!content) return null;
  return content.split('\n\n').map((para, i) => {
    if (para.trim().startsWith('•') || para.trim().startsWith('-')) {
      return (
        <ul key={i} className="list-disc list-inside space-y-1 ml-1 mb-2">
          {para.split('\n').map((item, j) => (
            <li key={j} className="text-sm">{item.replace(/^[•\-]\s*/, '')}</li>
          ))}
        </ul>
      );
    }
    if (/^\d+\./.test(para.trim())) {
      return (
        <ol key={i} className="list-decimal list-inside space-y-1 ml-1 mb-2">
          {para.split('\n').map((item, j) => (
            <li key={j} className="text-sm">{item.replace(/^\d+\.\s*/, '')}</li>
          ))}
        </ol>
      );
    }
    if (para.trim().startsWith('**') || para.trim().startsWith('#')) {
      return <h3 key={i} className="font-bold text-sm mb-1 mt-2">{para.replace(/^[*#]+\s*/, '')}</h3>;
    }
    return <p key={i} className="text-sm mb-2 leading-relaxed">{para}</p>;
  });
}

export default function AIToolsPage() {
  const [messages, setMessages] = useState([
    {
      id: 1, role: "assistant",
      content: "Hello! I'm your AI learning assistant 🤖 I can help with course recommendations, tech guidance, learning paths and study tips. What would you like to explore?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = text ?? input;
    if (!msg.trim() || isLoading) return;
    const userMsg = { id: Date.now(), role: "user", content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-10) }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", content: data.response, timestamp: new Date() }]);
    } catch {
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => {
    setMessages([{
      id: 1, role: "assistant",
      content: "Chat cleared! What would you like to explore?",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <AppHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6 h-[calc(100vh-64px)]">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600
              flex items-center justify-center shadow-md shadow-violet-200">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">AI Learning Assistant</h1>
              <p className="text-xs text-slate-400 dark:text-slate-500">Personalized guidance powered by AI</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
              bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
              hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm dark:shadow-none"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear chat
          </motion.button>
        </motion.div>

        {/* Main grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">

          {/* Chat panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/50 flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">AI Chat</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin-light">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20
                        flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      </div>
                    )}
                    <div className={`max-w-[78%] rounded-2xl px-4 py-3 shadow-sm dark:shadow-none
                      ${msg.role === "user"
                        ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-sm"
                        : "bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-tl-sm"}`}
                    >
                      {msg.role === "assistant"
                        ? <div className="prose-sm dark:prose-invert">{formatAIResponse(msg.content)}</div>
                        : <p className="text-sm">{msg.content}</p>
                      }
                      <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/60 dark:text-white/70 text-right" : "text-slate-400 dark:text-slate-500"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-xl bg-violet-600
                        flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20
                    flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex items-center gap-1.5">
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-violet-400"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5
                focus-within:border-violet-300 dark:focus-within:border-violet-500/50 focus-within:ring-2 focus-within:ring-violet-400/20 dark:focus-within:ring-violet-500/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about courses, tech, or learning paths..."
                  className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                  disabled={isLoading}
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white
                    flex items-center justify-center flex-shrink-0
                    disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Suggestions panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* Quick prompts */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Quick Prompts</span>
              </div>
              <div className="space-y-2">
                {SUGGESTED.map(({ icon: Icon, text }, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(text)}
                    disabled={isLoading}
                    className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left
                      bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-500/30 hover:bg-violet-50 dark:hover:bg-violet-500/5
                      transition-all duration-200 group disabled:opacity-50"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-500 flex-shrink-0 mt-0.5 transition-colors" />
                    <span className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 leading-snug line-clamp-2">
                      {text}
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-violet-400 flex-shrink-0 mt-0.5 ml-auto transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-gradient-to-br from-violet-50 dark:from-violet-900/10 to-fuchsia-50 dark:to-fuchsia-900/10 rounded-2xl border border-violet-100 dark:border-violet-500/20 p-4">
              <p className="text-xs font-semibold text-violet-700 dark:text-violet-400 mb-3 uppercase tracking-wider">I can help with</p>
              <ul className="space-y-2">
                {["Course recommendations", "Learning path planning", "Tech trend insights", "Study tips & techniques", "Career guidance"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-violet-700 dark:text-violet-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}