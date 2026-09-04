import { cn } from '@/lib/utils'

/** Flat light-blue wash backdrop for hero sections (no gradients). */
export function GridBackdrop({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 bg-blue-50/60', className)} aria-hidden="true">
      {children}
    </div>
  )
}
