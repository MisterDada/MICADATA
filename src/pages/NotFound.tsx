import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/shared/Reveal'

export function NotFound() {
  return (
    <div className="bg-black">
      <div className="container-enterprise mx-auto flex max-w-2xl flex-col items-center py-32 text-center sm:py-40">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-white/40">404</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Record not found.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-md text-lg font-normal text-[#86868B]">
            This registry entry doesn&apos;t exist — but the pages you need do.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Button size="lg" className="mt-10" asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </Reveal>
      </div>
    </div>
  )
}
