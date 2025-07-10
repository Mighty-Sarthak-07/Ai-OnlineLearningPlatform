import { motion } from 'framer-motion';

function WelcomeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='p-5 mb-5 bg-gradient-to-br from-purple-300 via-blue-100 to-red-50 rounded-lg w-full max-w-full'
    >
      <h1 className='text-2xl md:text-3xl font-bold text-center'>Welcome to SkillWorld</h1>
      <p className='text-lg md:text-xl text-purple-800 text-shadow-xl text-center'>
        SkillWorld is a platform for learning and teaching skills.
      </p>
    </motion.div>
  )
}

export default WelcomeBanner