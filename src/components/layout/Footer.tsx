import { Link } from 'react-router-dom'
import { ArrowUpRight, Database, Mail, MapPin } from 'lucide-react'
import { NAV_LINKS, PRODUCT_PILLARS, SITE } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-enterprise grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-blue-600">
              <Database className="size-5 text-white" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[17px] font-extrabold text-slate-900">{SITE.name}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {SITE.fullName}
              </span>
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">{SITE.description}</p>
          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4 text-blue-600" /> {SITE.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-blue-600" /> {SITE.location}
            </span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Company</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-slate-600 transition-colors hover:text-blue-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Products</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {PRODUCT_PILLARS.map((p) => (
              <li key={p.id}>
                <Link to="/products" className="group inline-flex items-center gap-1 text-slate-600 hover:text-blue-700">
                  {p.title}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Compliance</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
            <li>NDPR & GDPR aligned</li>
            <li>Consent receipts on every lookup</li>
            <li>Full audit trails</li>
            <li>In-region data residency (Enterprise)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-enterprise flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name} — {SITE.fullName}. All rights reserved.</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-sm bg-blue-600" />
            All systems operational · {SITE.coverage}
          </span>
        </div>
      </div>
    </footer>
  )
}
