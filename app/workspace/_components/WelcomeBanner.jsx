import React from 'react'

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-br from-purple-300 via-blue-100 to-red-50 rounded-lg'>
        <h1 className='text-2xl font-bold '>Welcome to SkillWorld</h1>
        <p className='text-lg text-purple-800 text-shadow-xl'>
            SkillWorld is a platform for learning and teaching skills. 
        </p>
    </div>
  )
}

export default WelcomeBanner