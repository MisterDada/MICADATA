import { Link } from 'react-router-dom'
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
import { Reveal } from '@/components/shared/Reveal'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { PRODUCT_PILLARS } from '@/lib/site'

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

const INDEX = ['01', '02', '03']

function ScoreMock() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {TRIANGULATION.map((t) => (
          <div key={t.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <t.icon className="mx-auto size-5 text-white/60" />
            <p className="mt-3 text-[15px] font-semibold text-white">{t.label}</p>
            <p className="mt-1 text-sm text-white/40">{t.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/40">ScoreEngine™</p>
            <p className="mt-3 font-display text-7xl font-semibold tracking-tight text-white sm:text-8xl">
              742<span className="text-2xl font-normal text-white/40"> / 850</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#059669]">
            <span className="size-1.5 rounded-full bg-[#059669]" /> Verified · Prime
          </span>
        </div>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[87%] rounded-full bg-[#0066CC]" />
        </div>
        <p className="mt-5 font-mono text-[13px] text-white/40">Registry match · consent receipt #8F31 · fully explainable</p>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {SCORE_FEATURES.map((f) => (
          <div key={f.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <f.icon className="size-5 text-white/60" />
            <p className="mt-3 text-[15px] font-semibold text-white">{f.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#86868B]">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function VerifyMock() {
  return (
    <div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        {VERIFY_ROWS.map((r) => (
          <div key={r.title} className="flex items-start gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-0 last:pb-0">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white/5">
              <r.icon className="size-4 text-white/70" />
            </span>
            <span className="flex-1">
              <span className="flex items-center justify-between gap-3 text-[15px] font-semibold text-white">
                {r.title}
                <CheckCircle2 className="size-4 shrink-0 text-[#059669]" />
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-[#86868B]">{r.text}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {CROSS_BORDER.map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/70">
            <Globe2 className="size-3.5" /> {c}
          </span>
        ))}
      </div>
      <p className="mt-5 font-mono text-[13px] text-white/40">Report sealed · latency 1.4s · audit #VFA-2204</p>
    </div>
  )
}

function TradeMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/40">FMCG distributor · Lagos</p>
        <p className="mt-5 text-sm text-[#86868B]">Recommended exposure limit</p>
        <p className="mt-2 font-display text-6xl font-semibold tracking-tight text-white sm:text-7xl">₦18.5M</p>
        <p className="mt-2 text-sm font-medium text-[#059669]">+12% vs last cycle · Low risk</p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-[#0066CC]" />
        </div>
        <div className="mt-8 flex flex-col border-t border-white/10">
          {TRADE_STEPS.map((s) => (
            <div key={s.step} className="flex gap-4 border-b border-white/10 py-4">
              <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#2f8cff]">{s.step}</span>
              <span>
                <span className="block text-[15px] font-semibold text-white">{s.title}</span>
                <span className="mt-0.5 block text-sm text-[#86868B]">{s.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-white">
          <ScanLine className="size-4 text-white/60" /> OCR Engine → iXBRL
        </p>
        <p className="mt-4 font-mono text-[13px] leading-relaxed text-white/40">
          <span className="text-white/70">&lt;ix:nonNumeric name=&quot;ifrs:Revenue&quot;</span> … 482,000,000
          <span className="text-white/70"> /&gt;</span>
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#86868B]">
          <FileScan className="size-4 text-[#059669]" /> 34 pages extracted · 99.1% field confidence
        </p>
        <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-[#86868B]">
          Built for FMCG distributors and B2B vendors — every limit ships with reason codes and an audit trail.
        </p>
      </div>
    </div>
  )
}

const MOCKS = [ScoreMock, VerifyMock, TradeMock]

export function Products() {
  return (
    <div className="bg-black">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24">
        <GridBackdrop />
        <div className="container-enterprise relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/70">
              The platform · 3 products
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-8 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-7xl">
              Three products.
              <br />
              <span className="text-white/40">One entity graph.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg font-normal leading-relaxed text-[#86868B] sm:text-xl">
              SME credit intelligence, trust &amp; compliance verification, and B2B trade underwriting —
              resolved to a single graph, delivered through one contract.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {PRODUCT_PILLARS.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
                >
                  {p.badge} <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ── */}
      {PRODUCT_PILLARS.map((p, i) => {
        const Icon = ICONS[p.iconName as keyof typeof ICONS] ?? Gauge
        const Mock = MOCKS[i % MOCKS.length]
        return (
          <section key={p.id} id={p.id} className="scroll-mt-28 border-t border-white/10 py-28 sm:py-36">
            <div className="container-enterprise">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#0066CC]">
                    <Icon className="size-5 text-white" />
                  </span>
                  <p className="font-display text-sm font-semibold tracking-[0.2em] text-white/40">
                    {INDEX[i]} · {p.badge.toUpperCase()}
                  </p>
                </div>
                <h2 className="mt-8 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-white sm:text-6xl">
                  {p.title}
                </h2>
                <p className="mt-5 max-w-2xl text-xl font-normal text-[#86868B] sm:text-2xl">{p.tagline}</p>
                <p className="mt-5 max-w-3xl text-lg font-normal leading-relaxed text-[#86868B]">{p.description}</p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-10 grid gap-x-12 sm:grid-cols-2">
                  {p.capabilities.map((c) => (
                    <p key={c} className="border-t border-white/10 py-3.5 text-[15px] text-white/80">
                      {c}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-8 flex items-center gap-8">
                  {p.metric && (
                    <div>
                      <p className="font-display text-5xl font-semibold tracking-tight text-white">{p.metric.value}</p>
                      <p className="mt-1.5 text-sm text-[#86868B]">{p.metric.label}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" asChild>
                      <Link to="/pricing">Get started</Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/about">Talk to sales <ArrowRight /></Link>
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-14">
                <div className="rounded-[2rem] border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-xl sm:p-10">
                  <Mock />
                </div>
              </Reveal>
            </div>
          </section>
        )
      })}

      {/* ── CLOSE ── */}
      <section className="border-t border-white/10 py-28 sm:py-36">
        <div className="container-enterprise mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <h2 className="text-balance font-display text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-white sm:text-6xl">
              Plug all three into one API.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-normal text-[#86868B]">
              Score an SME, verify its owners, and underwrite its counterparties — without stitching vendors together.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button size="lg" asChild><Link to="/pricing">Start pilot</Link></Button>
              <Button size="lg" variant="secondary" asChild><Link to="/about">Talk to our team</Link></Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
