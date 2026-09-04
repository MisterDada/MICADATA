import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { fadeUp } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
  variant?: 'default' | 'trust' | 'neutral'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', variant = 'default', className }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('flex flex-col gap-4', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}
    >
      <Badge variant={variant}>
        <span className="size-1.5 rounded-sm bg-blue-600" />
        {eyebrow}
      </Badge>
      <h2 className="max-w-3xl text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-slate-600">{description}</p>}
    </motion.div>
  )
}
