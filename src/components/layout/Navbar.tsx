import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Database, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/site'
import { Button } from '@/components/ui/button'

/** Floating compact pill navbar — blurred black, hairline border. */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-black/50 py-2 pl-4 pr-2 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-2.5" aria-label={SITE.name}>
            <span className="grid size-8 place-items-center rounded-full bg-[#0066CC]">
              <Database className="size-4 text-white" strokeWidth={2.2} />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button size="sm" asChild>
              <Link to="/about">Get started</Link>
            </Button>
          </div>

          <button
            className="grid size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav
            className="mt-2 rounded-3xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'block rounded-2xl px-4 py-3 text-[15px] font-medium',
                    isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button className="mt-2 w-full" asChild>
              <Link to="/about">Get started</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
