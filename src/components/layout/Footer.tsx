import { Link } from 'react-router-dom'
import { Database } from 'lucide-react'
import { NAV_LINKS, PRODUCT_PILLARS, SITE } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container-enterprise py-16 sm:py-20">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label={SITE.name}>
            <span className="grid size-8 place-items-center rounded-full bg-[#0066CC]">
              <Database className="size-4 text-white" strokeWidth={2.2} />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              {SITE.name}
            </span>
          </Link>
          <p className="max-w-md text-[15px] leading-relaxed text-[#86868B]">{SITE.description}</p>
          <p className="text-sm text-[#86868B]">{SITE.email}</p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Company</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Products</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
              {PRODUCT_PILLARS.map((p) => (
                <li key={p.id}>
                  <Link to="/products" className="text-white/60 transition-colors hover:text-white">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Compliance</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-white/60">
              <li>NDPR &amp; GDPR aligned</li>
              <li>Consent receipts on every lookup</li>
              <li>{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-[13px] text-white/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {SITE.name} — {SITE.fullName}.</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#059669]" />
            All systems operational · {SITE.coverage}
          </span>
        </div>
      </div>
    </footer>
  )
}
