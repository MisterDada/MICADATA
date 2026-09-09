import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Database,
  FileScan,
  Fingerprint,
  Gauge,
  Globe2,
  GraduationCap,
  Landmark,
  ScanLine,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { PRODUCT_PILLARS } from '@/lib/site'
import { fadeUp, staggerParent } from '@/lib/motion'

const ICONS = { Gauge, Fingerprint, ShieldCheck, Building2 } as const

const TRIANGULATION = [
  { icon: Fingerprint, label: 'Owner identity', detail: 'NIN / BVN' },
  { icon: Landmark, label: 'Registry file', detail: 'CAC records' },
  { icon: Wallet, label: 'Cash-flow stream', detail: 'POS transactions' },
]

const SCORE_FEATURES = [
  { icon: Gauge, title: 'Alternative credit scoring (0–850)', text: 'Explainable score calibrated for thin-file SMEs.' },
  { icon: TrendingUp, title: 'Cash-flow insights', text: 'POS turnover, seasonality, and repayment capacity.' },
  { icon: Database, title: 'Utility / telecom signals', text: 'Bill-payment discipline and usage stability.' },
  { icon: Building2, title: 'Peer benchmarking', text: 'Rank borrowers against sector and location cohorts.' },
]

const VERIFY_ROWS = [
  { icon: Fingerprint, title: 'Identity verification', text: 'NIN / BVN validation against authoritative registries with consent receipts.' },
  { icon: GraduationCap, title: 'Educational checks', text: 'Including WAEC verification plus tertiary and professional credentials.' },
  { icon: Landmark, title: 'Corporate registry', text: 'CAC lookups — status, directors, filings and compliance standing.' },
  { icon: Globe2, title: 'Cross-border screening', text: 'International background checks across corridors and watchlists.' },
]

const CROSS_BORDER = ['Angola', 'Eswatini', 'Qatar', 'US Military HR']

const TRADE_STEPS = [
  { step: '01', title: 'Score supplier', text: 'Real-time B2B supplier risk scoring on live trade and registry signals.' },
  { step: '02', title: 'Set exposure', text: 'Automated credit-exposure limit recommendations for each distributor.' },
  { step: '03', title: 'Monitor', text: 'Continuous re-underwriting as orders, payments and filings change.' },
]

export function Products() {
  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-14 pt-16 sm:pt-20">
        <GridBackdrop />
        <div className="container-enterprise relative">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              One integration. Every decision-grade dataset.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-slate-600">
              SME credit intelligence, trust &amp; compliance verification, and B2B trade underwriting —
              resolved to a single entity graph and delivered through one contract.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {PRODUCT_PILLARS.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                >
                  {p.badge} <ArrowUpRight className="size-3.5 text-slate-500" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="pb-24">
        <div className="container-enterprise flex flex-col gap-6">
          {PRODUCT_PILLARS.map((p, i) => {
            const Icon = ICONS[p.iconName as keyof typeof ICONS] ?? Gauge
            const flip = i % 2 === 1
            return (
              <motion.div
                key={p.id}
                id={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                className="scroll-mt-24"
              >
                <Card className="overflow-hidden">
                  <div className={`grid lg:grid-cols-[1.1fr_1fr] ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div className="p-8 sm:p-10">
                      <CardHeader className="p-0">
                        <CardTitle className="mt-4 text-2xl text-slate-900 sm:text-3xl">{p.title}</CardTitle>
                        <p className="text-sm font-semibold text-blue-700/90">{p.tagline}</p>
                        <CardDescription className="mt-3 text-[15px]">{p.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                          {p.capabilities.map((c) => (
                            <li key={c} className="inline-flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-700" /> {c}
                            </li>
                          ))}
                        </ul>

                        {/* ── Pillar-specific deep dives ── */}
                        {p.id === 'sme-datahub' && (
                          <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            {SCORE_FEATURES.map((f) => (
                              <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-4">
                                <f.icon className="size-5 text-blue-600" />
                                <p className="mt-2 text-[13px] font-bold text-slate-900">{f.title}</p>
                                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{f.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {p.id === 'verify-africa' && (
                          <div className="mt-7 flex flex-col gap-3">
                            {VERIFY_ROWS.map((r) => (
                              <div key={r.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-300 bg-slate-100">
                                  <r.icon className="size-4 text-blue-700" />
                                </span>
                                <span>
                                  <span className="block text-[13px] font-bold text-slate-900">{r.title}</span>
                                  <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-600">{r.text}</span>
                                </span>
                              </div>
                            ))}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {CROSS_BORDER.map((c) => (
                                <span key={c} className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                  <Globe2 className="size-3.5" /> {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {p.id === 'tradeguard' && (
                          <div className="mt-7 grid gap-3">
                            {TRADE_STEPS.map((s) => (
                              <div key={s.step} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                                <span className="font-display text-xs font-bold tracking-widest text-blue-700">{s.step}</span>
                                <span>
                                  <span className="block text-[13px] font-bold text-slate-900">{s.title}</span>
                                  <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-600">{s.text}</span>
                                </span>
                              </div>
                            ))}
                            <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600">
                              Built for <span className="font-semibold text-slate-700">FMCG distributors and B2B vendors</span> — every
                              limit recommendation ships with reason codes and an audit trail.
                            </p>
                          </div>
                        )}

                        <div className="mt-7 flex flex-wrap gap-3">
                          <Button size="sm" asChild>
                            <Link to="/pricing">Get {p.badge} <ArrowRight /></Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/about">Talk to sales</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>

                    {/* ── Visual panel ── */}
                    <div className="relative border-t border-slate-200 bg-slate-50 p-8 sm:p-10 lg:border-l lg:border-t-0">
                      <div className="hidden" aria-hidden="true" />
                      <div className="relative flex h-full flex-col justify-center gap-4">
                        <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 shadow-sm">
                          <Icon className="size-6 text-white" />
                        </span>
                        {p.metric && (
                          <div>
                            <p className="font-display text-4xl font-extrabold text-slate-900">{p.metric.value}</p>
                            <p className="mt-1 text-sm text-slate-600">{p.metric.label}</p>
                          </div>
                        )}

                        {p.id === 'sme-datahub' && (
                          <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Triangulated entity resolution</p>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                              {TRIANGULATION.map((t) => (
                                <div key={t.label} className="rounded-lg border border-slate-200 bg-white p-2.5">
                                  <t.icon className="mx-auto size-4 text-blue-600" />
                                  <p className="mt-1.5 text-[11px] font-bold text-slate-700">{t.label}</p>
                                  <p className="text-[10px] text-slate-500">{t.detail}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[11px] text-slate-500">ScoreEngine™</span>
                                <span className="font-display text-xl font-extrabold text-blue-700">742<span className="text-xs font-semibold text-slate-500"> / 850</span></span>
                              </div>
                              <div className="mt-2 h-1.5 overflow-hidden rounded-md bg-slate-200">
                                <div className="h-full w-[87%] rounded-md bg-blue-600" />
                              </div>
                              <p className="mt-2 font-mono text-[11px] text-slate-500">✓ verified · registry match · consent receipt #8F31…</p>
                            </div>
                          </div>
                        )}

                        {p.id === 'verify-africa' && (
                          <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs leading-relaxed text-slate-600">
                            <p><span className="text-blue-700">✓ NIN match</span> · biometric 98.2%</p>
                            <p><span className="text-blue-700">✓ WAEC</span> · certificate confirmed</p>
                            <p><span className="text-blue-700">✓ CAC</span> · RC 1748210 · active</p>
                            <p><span className="text-blue-700">◷ cross-border</span> · Angola / Eswatini / Qatar / US Mil. HR</p>
                            <p className="mt-2 text-slate-500">report sealed · latency 1.4s · audit #VFA-2204</p>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-md bg-slate-200">
                              <div className="h-full w-[92%] rounded-md bg-blue-600" />
                            </div>
                          </div>
                        )}

                        {p.id === 'tradeguard' && (
                          <div className="flex flex-col gap-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">FMCG distributor · Lagos</span>
                              </div>
                              <p className="mt-2 text-xs text-slate-600">Recommended exposure limit</p>
                              <p className="font-display text-2xl font-extrabold text-slate-900">₦18.5M <span className="text-xs font-semibold text-blue-700">+12% vs last cycle</span></p>
                              <div className="mt-2 h-1.5 overflow-hidden rounded-md bg-slate-200">
                                <div className="h-full w-[72%] rounded-md bg-blue-600" />
                              </div>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                              <p className="inline-flex items-center gap-2 text-xs font-bold text-slate-900"><ScanLine className="size-4 text-blue-600" /> OCR Engine → iXBRL</p>
                              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-slate-500">
                                <span className="text-slate-600">&lt;ix:nonNumeric name=&quot;ifrs:Revenue&quot;</span> … 482,000,000<span className="text-slate-600"> /&gt;</span><br />
                                extracted 34 pages · 99.1% field confidence
                              </p>
                              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-600"><FileScan className="size-3.5 text-blue-700" /> Financial statements auto-formatted</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container-enterprise mt-10"
        >
          <SectionHeading
            align="left"
            title="Enterprise-grade by default"
            variant="trust"
            className="max-w-2xl"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Consent-first', 'Receipt on every lookup, NDPR & GDPR aligned.'],
              ['Audit-ready', 'Immutable trails for regulators and auditors.'],
              ['Resilient', '99.99% uptime with multi-region failover.'],
              ['Residency controls', 'In-region hosting for central-bank mandates.'],
            ].map(([t, d], i) => (
              <motion.div key={t} variants={fadeUp} custom={i} className="rounded-2xl border border-slate-200 bg-white/[0.03] p-6">
                <h3 className="font-display text-[15px] font-bold text-slate-900">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-blue-50 p-10 text-center sm:p-12">
            <h3 className="mx-auto max-w-2xl text-balance font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Plug all three pillars into one API
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
              Score an SME, verify its owners, and underwrite its trade counterparties — without stitching vendors together.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild><Link to="/pricing">Start pilot <ArrowRight /></Link></Button>
              <Button variant="secondary" asChild><Link to="/about">Talk to our team</Link></Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
