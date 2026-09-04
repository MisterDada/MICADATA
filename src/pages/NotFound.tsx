import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="container-enterprise flex flex-col items-center py-28 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-blue-700">404</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-slate-900">Record not found</h1>
      <p className="mt-3 max-w-md text-slate-600">This registry entry doesn&apos;t exist — but the pages you need do.</p>
      <Button className="mt-7" asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  )
}
