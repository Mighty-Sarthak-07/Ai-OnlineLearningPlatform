'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Instagram,
  Linkedin,
  Twitter,
  Bot,
  TrendingUp,
  LayoutTemplate,
  Headset,
  Database,
  Code2,
  BrainCircuit,
  Briefcase,
  ArrowRight,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 selection:bg-violet-200 selection:text-violet-900 dark:selection:bg-violet-500/30 dark:selection:text-violet-200">
      
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600
              flex items-center justify-center shadow-lg shadow-violet-200
              group-hover:shadow-violet-300 transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xl tracking-tight hidden sm:block">
              Skill<span className="text-violet-600 dark:text-violet-400">World</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors px-2">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-violet-600 hover:shadow-md hover:shadow-violet-200 transition-all duration-300">
                  Sign up free
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/workspace">
                <button className="text-sm font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 hover:bg-violet-100 dark:hover:bg-violet-500/20 border border-violet-200 dark:border-violet-500/30 px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <div className="pl-2 border-l border-slate-200">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
              </div>
            </SignedIn>
          </div>
        </div>
      </motion.header>

      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" /> Next-Gen AI Learning
                </span>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                  Learn Smarter,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    Not Harder.
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Your personalized, AI-driven learning journey begins here. Master new skills in half the time with our intelligent curriculum generator.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/workspace">
                    <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-200 transition-all duration-300 hover:-translate-y-1">
                      Start Learning Free <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/workspace/explore">
                    <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
                      Explore Courses
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/10 dark:shadow-none border my-4 border-slate-200/50 dark:border-slate-800 border-white dark:border-transparent bg-white dark:bg-transparent">
                <Image 
                  src="/online.jpg" 
                  alt="AI Learning Platform Dashboard" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating widget */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Skill Level</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+40% this week</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      <div className="py-24 bg-white dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why choose SkillWorld?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">We combine powerful AI with beautifully structured curriculum to give you the ultimate learning experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Bot, title: "AI Tutor", desc: "Instant, personalized assistance whenever you're stuck.", color: "violet" },
              { icon: TrendingUp, title: "Progress Tracking", desc: "Watch your skills grow with real-time analytics.", color: "emerald" },
              { icon: LayoutTemplate, title: "Interactive Courses", desc: "Learn by doing, not just watching.", color: "fuchsia" },
              { icon: Headset, title: "24/7 Support", desc: "Our community and AI are always here to help.", color: "amber" }
            ].map((feature, i) => {
              const colors = {
                violet:  { bg: 'bg-violet-50 dark:bg-violet-500/10',  text: 'text-violet-600 dark:text-violet-400',  border: 'hover:border-violet-200 dark:hover:border-violet-500/30' },
                emerald: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'hover:border-emerald-200 dark:hover:border-emerald-500/30' },
                fuchsia: { bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10', text: 'text-fuchsia-600 dark:text-fuchsia-400', border: 'hover:border-fuchsia-200 dark:hover:border-fuchsia-500/30' },
                amber:   { bg: 'bg-amber-50 dark:bg-amber-500/10',   text: 'text-amber-600 dark:text-amber-400',   border: 'hover:border-amber-200 dark:hover:border-amber-500/30' },
              }[feature.color];

              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 ${colors.border}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colors.bg}`}>
                    <feature.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Browse by Category</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Find the perfect course to advance your career.</p>
            </div>
            <Link href="/workspace/explore" className="hidden sm:inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Database, title: "Data Science", count: "120+ courses" },
              { icon: Code2, title: "Programming", count: "340+ courses" },
              { icon: BrainCircuit, title: "AI & Machine Learning", count: "85+ courses" },
              { icon: Briefcase, title: "Business Strategy", count: "210+ courses" }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-100 dark:hover:shadow-none cursor-pointer transition-all duration-300"
              >
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-600 transition-colors duration-300">
                  <cat.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200 mb-1">{cat.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{cat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/40 p-10 md:p-14 rounded-[40px] border border-violet-100 dark:border-violet-500/20 relative"
          >
            <div className="absolute top-10 right-10 text-violet-200 dark:text-violet-500/20">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl dark:shadow-none flex-shrink-0">
                <Image 
                  src="/logo.jpg" 
                  alt="User" 
                  width={96} 
                  height={96} 
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Sparkles key={index} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
                  "This AI platform has completely transformed the way I learn. The personalized curriculum adapts directly to my pace, cutting my learning time in half!"
                </p>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">Sarah Jenkins</p>
                  <p className="text-sm text-violet-600 dark:text-violet-400 font-medium">Software Engineer • 30+ Courses Completed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 rounded-t-[3rem] mt-12 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/30 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-24"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to superpower your skills?</h2>
            <p className="text-slate-400 text-lg mb-10">Join thousands of learners building their future today. It's completely free to get started.</p>
            <Link href="/workspace">
              <button className="bg-white dark:bg-violet-600 text-slate-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-violet-400 dark:hover:bg-violet-500 hover:text-white transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-violet-500/25">
                Join SkillWorld Now
              </button>
            </Link>
          </motion.div>

          <div className="border-t border-slate-800 pt-12 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">
                Skill<span className="text-violet-400">World</span>
              </span>
            </div>

            <p className="text-sm text-slate-500">
              Designed by <span className="font-semibold text-slate-300">Sarthak Kesarwani</span> &copy; 2026
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/sarthak-kesarwani-48b4702a7?" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Instagram, href: "https://www.instagram.com/savage_sarthak_07" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
