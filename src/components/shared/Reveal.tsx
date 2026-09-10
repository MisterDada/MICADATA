import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  /** Rise distance in px. */
  y?: number
}

/** Quiet scroll-driven entrance: opacity-0 y-6 → opacity-100 y-0, once. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
