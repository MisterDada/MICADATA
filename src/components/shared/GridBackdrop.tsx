import { cn } from '@/lib/utils'

/**
 * Near-invisible ambient wash for hero sections.
 * A single restrained sapphire aura at 7% — no saturated gradients.
 */
export function GridBackdrop({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-[480px] w-[820px] max-w-none -translate-x-1/2 rounded-full bg-[#0066CC]/[0.07] blur-[120px]" />
      {children}
    </div>
  )
}
