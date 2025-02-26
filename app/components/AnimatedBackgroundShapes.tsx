'use client'
import * as React from 'react'
import { motion } from 'framer-motion'

const MotionImg = motion.create('img')

const AnimatedBackgroundShapes: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Pelota 1 - Esquina superior izquierda */}
      <MotionImg
        src="/ethereum-logo.png"
        alt="Ball"
        className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
        style={{ top: '10%', left: '10%' }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Pelota 2 - Esquina inferior derecha */}
      <MotionImg
        src="/ethereum-logo.png"
        alt="Ball"
        className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
        style={{ bottom: '10%', right: '10%' }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* Cono 1 - Esquina superior derecha */}
      <MotionImg
        src="/voltage.png"
        alt="Cone"
        className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
        style={{ top: '10%', right: '10%' }}
        animate={{ rotate: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* Cono 2 - Esquina inferior izquierda */}
      <MotionImg
        src="/voltage.png"
        alt="Cone"
        className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
        style={{ bottom: '10%', left: '10%' }}
        animate={{ rotate: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}

export default AnimatedBackgroundShapes
