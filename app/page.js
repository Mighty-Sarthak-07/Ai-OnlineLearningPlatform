'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Home() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-white">
      {/* Hero Section */}
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Learn Smarter,<br />
              Not Harder with AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Your personalized learning journey<br />
              begins here
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/workspace">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/workspace/explore">
                <Button variant="outline" className="border-white text-black hover:bg-white/10 px-8 py-6 rounded-md text-lg">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:w-1/2 relative"
          >
            <Image 
              src="/online.jpg" 
              alt="AI Learning Platform" 
              width={700} 
              height={500} 
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-purple-900 to-purple-800 p-8 rounded-xl shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25m0 0v5.714a2.25 2.25 0 01-1.5 2.25m0 0a24.301 24.301 0 01-4.5 0m0 0v-5.714a2.25 2.25 0 001.5-2.25m0 0V3.104m0 0a24.301 24.301 0 00-4.5 0" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">AI Tutor</h3>
            <p className="text-center text-sm text-gray-300">Personalized assistance with a robot tutor</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-xl shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Progress Tracking</h3>
            <p className="text-center text-sm text-gray-300">Track progress of your learning journey</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-800 to-blue-700 p-8 rounded-xl shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Interactive Courses</h3>
            <p className="text-center text-sm text-gray-300">Learn effectively with interactive content</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-700 to-blue-600 p-8 rounded-xl shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">24/7 Support</h3>
            <p className="text-center text-sm text-gray-300">Experience finest support anytime</p>
          </motion.div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-900/30 p-8 rounded-xl backdrop-blur-sm max-w-3xl mx-auto"
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-700 rounded-full mr-4 overflow-hidden">
              <Image 
                src="/logo.jpg" 
                alt="User" 
                width={64} 
                height={64} 
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xl italic">"This AI platform has transformed the way I learn. The personalized support is incredible!"</p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-blue-500 rounded-full mx-1"></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Categories Section */}
         <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Browse by Category
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-purple-900/50 hover:bg-purple-800/60 transition-all duration-300 p-6 rounded-xl text-center cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <Image 
                src="/exploratory-analysis.png" 
                alt="Data Science" 
                width={60} 
                height={60} 
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Data Science</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-blue-900/50 hover:bg-blue-800/60 transition-all duration-300 p-6 rounded-xl text-center cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <Image 
                src="/programming.png" 
                alt="Programming" 
                width={60} 
                height={60} 
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Programming</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-indigo-900/50 hover:bg-indigo-800/60 transition-all duration-300 p-6 rounded-xl text-center cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <Image 
                src="/ai.png" 
                alt="AI & Machine Learning" 
                width={60} 
                height={60} 
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">AI & Machine Learning</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-blue-800/50 hover:bg-blue-700/60 transition-all duration-300 p-6 rounded-xl text-center cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <Image 
                src="/business-report.png" 
                alt="Business" 
                width={60} 
                height={60} 
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Business</h3>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 p-12 rounded-2xl text-center max-w-4xl mb-5 mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Start your learning journey today</h2>
          <Link href="/workspace/billing">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 p-12 py-20 rounded-2xl text-center max-w-7xl my-10 mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6"> Designed by <span className="text-slate-100 text-shadow-2xl">Sarthak Kesarwani</span> </h2>
          <div className='flex gap-5 items-center justify-center'>
          <motion.a
                  href="https://www.linkedin.com/in/sarthak-kesarwani-48b4702a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className='hover:text-black'/>
                </motion.a>
                <motion.a
                  href="https://twitter.com/your-twitter-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className='hover:text-black' />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/savage_sarthak_07?igsh=MTBtbWlzd2Z1emU0cg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className='hover:text-black' />
                </motion.a>
                </div>
        </motion.div>
      </div>
    </div>
  );
}
