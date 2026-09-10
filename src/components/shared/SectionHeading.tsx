import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared/Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">{eyebrow}</p>
      )}
      <h2 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-[#F5F5F7] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-lg font-normal leading-relaxed text-[#86868B]">{description}</p>
      )}
    </Reveal>
  )
}
