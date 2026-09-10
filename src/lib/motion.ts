import { motion, type Variants } from 'framer-motion'

/** Apple-quiet easing used across all scroll transitions. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Primary scroll reveal — opacity-0 y-6 → opacity-100 y-0.
 * Use with `whileInView="visible"` + `viewport={{ once: true, margin: '-80px' }}`.
 */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
}

/** Legacy preset — subtle rise for small elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  }),
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

export const MotionDiv = motion.div
