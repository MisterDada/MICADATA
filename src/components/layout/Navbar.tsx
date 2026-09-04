import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Database, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/site'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-white transition-all duration-200',
        scrolled ? 'border-b border-slate-200 shadow-sm' : 'border-b border-transparent',
      )}
    >
      <div className="container-enterprise flex h-[72px] items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-3" aria-label={SITE.name}>
          <span className="grid size-10 place-items-center rounded-md bg-blue-600">
            <Database className="size-5 text-white" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[17px] font-extrabold tracking-tight text-slate-900">
              {SITE.name}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Data Intelligence
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/pricing">View pricing</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/about">
              Get started <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-600 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-enterprise flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-4 py-3 text-[15px] font-medium',
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button className="mt-3" asChild>
              <Link to="/about">
                Get started <ArrowRight className="size-4" />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
