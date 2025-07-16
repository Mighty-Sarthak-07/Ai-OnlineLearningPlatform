"use client"
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-move">
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 opacity-30 rounded-full filter blur-3xl animate-blob1" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-30 rounded-full filter blur-3xl animate-blob2" />
      <div className="relative z-10 p-8 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30 animate-fade-in">
        <SignUp/>
      </div>
    </div>
  )
}