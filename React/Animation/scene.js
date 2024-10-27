'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Component() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-mono">
      <div className="w-full max-w-md p-6 space-y-4">
        <motion.h1 
          className="text-2xl font-bold text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ARKNIGHTS
        </motion.h1>
        
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
            <motion.div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            Loading assets...
          </motion.span>
          <span>{progress}%</span>
        </div>
        
        <motion.div 
          className="text-center text-xs"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          Rhodes Island Logistics
        </motion.div>
      </div>
    </div>
  )
}