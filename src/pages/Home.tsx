import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Bot,
  Building2,
  CheckCircle2,
  Cpu,
  Database,
  FileCheck2,
  Fingerprint,
  Landmark,
  Layers,
  LineChart,
  Lock,
  MessageCircle,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { SITE, TESTIMONIALS, TRUST_SIGNALS } from '@/lib/site'
import { fadeUp, staggerParent } from '@/lib/motion'
import { cn } from '@/lib/utils'

/* ── Data layer pipeline model ─────────────────────────────── */
type PipelineStage = {
  id: string
  step: string
  title: string
  short: string
  description: string
  inputs: string[]
  icon: typeof Database
}

const PIPELINE: PipelineStage[] = [
  {
    id: 'ingestion',
    step: '01',
    title: 'Data Ingestion',
    short: 'Ingest',
    description:
      'Multi-source intake from bureaus, registries, banks and alternative feeds — consent captured at source, every record traceable.',
    inputs: ['Credit bureau feeds', 'Identity registries', 'Bank & POS feeds', 'Financial statements', 'Background data'],
    icon: Database,
  },
  {
    id: 'normalisation',
    step: '02',
    title: 'Data Normalisation',
    short: 'Normalise',
    description:
      'Fragmented formats are cleaned, standardised and mapped to a single MiCA canonical schema — de-duplicated, validated, audit-ready.',
    inputs: ['Schema mapping', 'De-duplication', 'Format standardisation', 'Quality scoring'],
    icon: Workflow,
  },
  {
    id: 'resolution',
    step: '03',
    title: 'Triangulated Entity Resolution',
    short: 'Resolve',
    description:
      'BVN / NIN + CAC + POS activity triangulated into one resolved entity graph — individuals and businesses, matched with confidence scores.',
    inputs: ['BVN / NIN matching', 'CAC corporate linkage', 'POS activity graph', 'Confidence scoring'],
    icon: Fingerprint,
  },
  {
    id: 'risk',
    step: '04',
    title: 'Risk Models & Analytics',
    short: 'Score',
    description:
      'SME ScoreEngine™ and TradeGuard™ convert resolved entities into explainable scores, trade-credit limits and early-warning flags.',
    inputs: ['SME ScoreEngine™', 'TradeGuard™ signals', 'Affordability proxies', 'Delinquency flags'],
    icon: LineChart,
  },
  {
    id: 'gateway',
    step: '05',
    title: 'AI & Decision Intelligence Gateway',
    short: 'Decide',
    description:
      'Automated decisioning with policy rules, AI explanations and human-in-the-loop override — returned via one REST API in under 2 seconds.',
    inputs: ['Policy engine', 'AI explanations', 'Auto-approve / refer', 'Full audit trail'],
    icon: Cpu,
  },
]

const OUTPUT_SEGMENTS = [
  { label: 'Financial Institutions', icon: Landmark, text: 'Underwrite & monitor at portfolio scale.' },
  { label: 'Corporates', icon: Building2, text: 'KYB suppliers & distributors with confidence.' },
  { label: 'Fintechs', icon: Zap, text: 'Embed scoring via one API.' },
  { label: 'SMEs', icon: Store, text: 'Access limits via WhatsApp.' },
]

/* ── Audience tabs ─────────────────────────────────────────── */
type Audience = {
  id: string
  label: string
  icon: typeof Landmark
  headline: string
  value: string
  bullets: string[]
  metric: string
  metricLabel: string
  cta: string
  ctaHref: string
}

const AUDIENCES: Audience[] = [
  {
    id: 'fis',
    label: 'Financial Institutions',
    icon: Landmark,
    headline: 'Underwrite thin-file borrowers with bureau-grade confidence.',
    value:
      'Banks, MFIs and digital lenders use MiCA-DATA to aggregate bureau, identity and cash-flow data into a single decision — cutting manual review and default rates.',
    bullets: ['Multi-bureau credit profiles + SME ScoreEngine™', 'BVN / NIN identity resolution with liveness', 'Portfolio monitoring & early-warning triggers'],
    metric: '-38%',
    metricLabel: 'default rate in pilot portfolios',
    cta: 'Explore lending solutions',
    ctaHref: '/products',
  },
  {
    id: 'corporates',
    label: 'Corporates',
    icon: Building2,
    headline: 'KYB every supplier, distributor and trade partner.',
    value:
      'FMCGs, manufacturers and trade houses verify CAC records, beneficial ownership and TradeGuard™ exposure before extending trade credit.',
    bullets: ['CAC + UBO ownership graphs', 'TradeGuard™ counterparty exposure scoring', 'Supplier onboarding in hours, not weeks'],
    metric: '12M+',
    metricLabel: 'business records indexed continent-wide',
    cta: 'Explore KYB & trade data',
    ctaHref: '/products',
  },
  {
    id: 'fintechs',
    label: 'Fintechs',
    icon: Zap,
    headline: 'Ship credit and KYC features in days, not quarters.',
    value:
      'One REST API, webhooks and sandbox test-data let product teams embed verification, scoring and automated decisioning without bureau contracts.',
    bullets: ['One API for identity + credit + KYB', 'Sandbox, webhooks & <2s latency', 'Usage-based pricing that scales with you'],
    metric: '<2s',
    metricLabel: 'median verification latency',
    cta: 'See plans & sandbox',
    ctaHref: '/pricing',
  },
  {
    id: 'smes',
    label: 'SMEs',
    icon: Store,
    headline: 'Your cash flow is your collateral — now lenders can see it.',
    value:
      'Small businesses connect POS and bank feeds once, then get a live risk score and trade-credit limit — accessible anytime via the MiCA WhatsApp bot.',
    bullets: ['POS + bank feeds build your score automatically', 'Real-time limits via WhatsApp, no paperwork', 'Share verified profile with any lender'],
    metric: '24hrs',
    metricLabel: 'from POS connect to first credit limit',
    cta: 'Meet the WhatsApp bot',
    ctaHref: '/about',
  },
]

/* ── Compliance bar ────────────────────────────────────────── */
const COMPLIANCE = [
  { icon: ShieldCheck, title: 'NDPA 2023 Compliant', text: 'Consent receipts & data-subject rights built into every lookup.' },
  { icon: Lock, title: 'CRA 2017 Data Firewalls', text: 'Regulated bureau data segregated under Credit Reporting Act controls.' },
  { icon: FileCheck2, title: 'ISO / SOC 2 Standards', text: 'Audited controls, encryption at rest & in transit, in-region hosting.' },
]

export function Home() {
  const [activeStage, setActiveStage] = useState(PIPELINE[2].id)
  const [activeAudience, setActiveAudience] = useState(AUDIENCES[0].id)

  const stage = PIPELINE.find((s) => s.id === activeStage) ?? PIPELINE[0]
  const audience = AUDIENCES.find((a) => a.id === activeAudience) ?? AUDIENCES[0]

  return (
    <div className="relative bg-white">
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-24">
        <GridBackdrop />
        <div className="container-enterprise relative">
          <motion.div variants={staggerParent} initial="hidden" animate="visible" className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.div variants={fadeUp}>
              <Badge>
                <span className="size-1.5 rounded-md bg-blue-600" />
                {SITE.coverage} · {SITE.fullName}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl"
            >
              Pan-African Decision &amp;{' '}
              <span className="text-blue-700">Data Intelligence</span>{' '}
              Layer
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Data aggregation, normalisation and triangulated entity resolution — powering explainable risk models and
              automated decisioning for every lender, corporate and fintech in Africa.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/products">
                  Explore Platform <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/about">Contact Enterprise Sales</Link>
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.dl
              variants={fadeUp}
              className="mt-14 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-4"
            >
              {TRUST_SIGNALS.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 bg-slate-100 px-6 py-6">
                  <dt className="order-2 text-xs font-medium uppercase tracking-wider text-slate-500">{s.label}</dt>
                  <dd className="order-1 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">{s.value}</dd>
                  {s.sublabel && <span className="order-3 text-[11px] text-slate-500">{s.sublabel}</span>}
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </section>

      {/* ══ INTERACTIVE DATA-LAYER PIPELINE ══════════════════ */}
      <section className="relative border-t border-slate-200/80 py-20">
        <div className="container-enterprise">
          <SectionHeading
            eyebrow="MiCA Data Layer Architecture"
            title="From raw feeds to a decision in seconds"
            description="Tap any stage to inspect it. One pipeline ingests fragmented African data and outputs decision-ready intelligence."
          />

          {/* Stage selector — horizontal stepper */}
          <div className="mt-12 overflow-x-auto pb-2">
            <div className="mx-auto flex min-w-[720px] max-w-5xl items-stretch gap-0 lg:min-w-0">
              {PIPELINE.map((s, i) => {
                const Icon = s.icon
                const isActive = s.id === activeStage
                return (
                  <div key={s.id} className="flex flex-1 items-stretch">
                    <button
                      onClick={() => setActiveStage(s.id)}
                      aria-pressed={isActive}
                      className={cn(
                        'group flex flex-1 flex-col items-center gap-2 rounded-2xl border px-3 py-5 text-center transition-all duration-200',
                        isActive
                          ? 'border-blue-300 bg-blue-50 shadow-sm'
                          : 'border-transparent hover:border-slate-300 hover:bg-slate-100',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-11 place-items-center rounded-xl border transition-colors',
                          isActive ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-300 bg-slate-100 text-slate-600',
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="font-display text-[11px] font-bold tracking-widest text-slate-500">{s.step}</span>
                      <span className={cn('text-[13px] font-semibold leading-tight', isActive ? 'text-slate-900' : 'text-slate-600')}>
                        {s.title}
                      </span>
                    </button>
                    {i < PIPELINE.length - 1 && (
                      <div className="flex items-center px-1" aria-hidden="true">
                        <ArrowRight className={cn('size-4 shrink-0', isActive ? 'text-blue-600' : 'text-slate-700')} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stage detail panel */}
          <div className="mx-auto mt-6 max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid gap-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 md:grid-cols-[1.2fr_1fr]"
              >
                <div>
                  <Badge variant="trust">
                    <span className="size-1.5 rounded-md bg-blue-600" />
                    Stage {stage.step} · {stage.short}
                  </Badge>
                  <h3 className="mt-4 font-display text-2xl font-bold text-slate-900">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{stage.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stage.inputs.map((input) => (
                      <span
                        key={input}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        <CheckCircle2 className="size-3.5 text-blue-700" /> {input}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Live mini-visual: resolved entity */}
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                      <ScanLine className="size-4 text-blue-600" /> Live resolution preview
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                      <span className="size-1.5 animate-pulse rounded-md bg-blue-600" /> 1.8s
                    </span>
                  </div>
                  <div className="grid gap-2 font-mono text-[11px]">
                    {['BVN ✓  •  NIN ✓  •  CAC ✓', 'POS velocity: ₦4.2M / 90d', 'SME ScoreEngine™: 742 — Prime', 'TradeGuard™: Low exposure'].map((line) => (
                      <div key={line} className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-slate-600">
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3">
                    <Sparkles className="size-4 shrink-0 text-blue-700" />
                    <p className="text-xs font-semibold text-slate-900">
                      Decision: <span className="text-blue-700">APPROVE — ₦2.5M limit</span> · fully explainable
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Output row */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {OUTPUT_SEGMENTS.map((o) => (
                <div
                  key={o.label}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-blue-300"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-300 bg-slate-100">
                    <o.icon className="size-4.5 text-blue-600" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-slate-900">{o.label}</span>
                    <span className="block text-xs text-slate-500">{o.text}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Output layer serves Financial Institutions · Corporates · Fintechs · SMEs through one unified gateway.
            </p>
          </div>
        </div>
      </section>

      {/* ══ AUDIENCE FOCUS GRID (TABS) ═══════════════════════ */}
      <section className="border-y border-slate-200/80 bg-slate-50 py-20">
        <div className="container-enterprise">
          <SectionHeading
            eyebrow="Who MiCA serves"
            title="One layer, four tailored value propositions"
            description="Select your segment to see exactly how MiCA-DATA plugs into your stack."
            variant="trust"
          />

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2" role="tablist" aria-label="Target audiences">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                role="tab"
                aria-selected={a.id === activeAudience}
                onClick={() => setActiveAudience(a.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-[13px] font-semibold transition-all',
                  a.id === activeAudience
                    ? 'border-blue-300 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-slate-300 bg-slate-100 text-slate-600 hover:border-blue-300 hover:text-blue-700',
                )}
              >
                <a.icon className="size-4" /> {a.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-8 grid max-w-5xl gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 md:grid-cols-[1.4fr_1fr]"
            >
              <div>
                <h3 className="text-balance font-display text-xl font-bold text-slate-900 sm:text-2xl">{audience.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{audience.value}</p>
                <ul className="mt-5 grid gap-2.5">
                  {audience.bullets.map((b) => (
                    <li key={b} className="inline-flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-700" /> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={audience.ctaHref}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  {audience.cta} <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div className="flex flex-col justify-center gap-2 rounded-2xl border border-slate-200 bg-blue-50 p-8 text-center">
                <span className="font-display text-5xl font-extrabold text-slate-900">{audience.metric}</span>
                <span className="text-sm text-slate-600">{audience.metricLabel}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══ WHATSAPP BOT BANNER ══════════════════════════════ */}
      <section className="py-20">
        <div className="container-enterprise">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-blue-50 p-8 sm:p-12 lg:p-14">
            <GridBackdrop className="opacity-60" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Badge variant="trust">
                  <MessageCircle className="size-3.5" /> SME Engagement · WhatsApp Financial Intelligence Bot
                </Badge>
                <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  Cash flow, risk scores &amp; trade limits — inside WhatsApp.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                  Small business owners connect POS and bank feeds once. MiCA&apos;s WhatsApp bot then delivers real-time
                  cash-flow summaries, SME ScoreEngine™ scores and TradeGuard™ trade-credit limits — no app download, no
                  paperwork.
                </p>
                <ul className="mt-6 grid gap-2.5">
                  {[
                    'Daily cash-flow pulse: inflows, outflows, runway',
                    'Live risk score + what moves it up or down',
                    'One-tap trade-credit limit shareable with any supplier or lender',
                  ].map((f) => (
                    <li key={f} className="inline-flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button variant="trust" size="lg" asChild>
                    <Link to="/about">
                      <Bot /> Try the WhatsApp demo
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link to="/products">How scoring works</Link>
                  </Button>
                </div>
              </div>

              {/* Phone mock */}
              <div className="mx-auto w-full max-w-[340px]">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center gap-3 bg-blue-600 px-4 py-3">
                    <span className="grid size-9 place-items-center rounded-md bg-white font-display text-xs font-bold text-blue-700">
                      M
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">MiCA Assistant</span>
                      <span className="block text-[11px] text-blue-100">online · Financial Intelligence</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5 bg-slate-50 p-4 text-[13px] leading-snug">
                    <div className="max-w-[85%] self-start rounded-lg rounded-tl-sm border border-slate-200 bg-white px-3 py-2 text-slate-700">
                      👋 Morning Ada! Your 7-day cash-flow pulse is ready.
                    </div>
                    <div className="max-w-[90%] self-start rounded-lg rounded-tl-sm border border-slate-200 bg-white px-3 py-2 text-slate-700">
                      Inflows <b className="text-blue-700">₦1.84M</b> · Outflows ₦1.21M
                      <br />
                      SME Score <b className="text-blue-700">742 (Prime ↑18)</b>
                      <br />
                      Trade limit <b className="text-blue-700">₦2.5M</b> with 3 suppliers
                    </div>
                    <div className="max-w-[70%] self-end rounded-lg rounded-tr-sm bg-blue-600 px-3 py-2 text-white">
                      Share my limit with Dangote Depot?
                    </div>
                    <div className="max-w-[85%] self-start rounded-lg rounded-tl-sm border border-slate-200 bg-white px-3 py-2 text-slate-700">
                      ✅ Verified profile sent. Approval odds: <b>High (91%)</b>. Anything else? Try “why did my score move?”
                    </div>
                    <div className="mt-1 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-slate-500">
                      <MessageCircle className="size-4" />
                      <span className="text-xs">Ask about cash flow, score, limits…</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  <Banknote className="mr-1 inline size-3.5" /> POS + Bank feeds → live score
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST & COMPLIANCE BAR ═══════════════════════════ */}
      <section className="border-t border-slate-200/80 bg-slate-50 py-14">
        <div className="container-enterprise">
          <div className="flex flex-col items-center gap-2 text-center">
            <Badge variant="neutral">
              <ShieldCheck className="size-3.5" /> Trust &amp; Compliance
            </Badge>
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">Regulated data, handled like it.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {COMPLIANCE.map((c) => (
              <Card key={c.title} className="border-slate-200 bg-white">
                <CardContent className="flex items-start gap-4 p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-blue-200 bg-blue-50">
                    <c.icon className="size-5 text-blue-700" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-900">{c.title}</span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-slate-600">{c.text}</span>
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF + CTA ═══════════════════════════════ */}
      <section className="py-20">
        <div className="container-enterprise">
          <SectionHeading eyebrow="Trusted across Africa" title="Built for risk, compliance and growth teams" variant="neutral" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-7"
              >
                <blockquote className="text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-md bg-blue-600 font-display text-xs font-bold text-white">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{t.name}</span>
                    <span className="block text-xs text-slate-500">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="relative mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-blue-50 p-10 text-center sm:p-14">
            <Layers className="mx-auto size-8 text-blue-600" />
            <h3 className="mx-auto mt-4 max-w-2xl text-balance font-display text-2xl font-bold text-slate-900 sm:text-4xl">
              Unify your credit, identity and business data today
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Start with a 30-day proof-of-value against your own portfolio. No rip-and-replace required.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/products">
                  Explore Platform <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/about">Contact Enterprise Sales</Link>
              </Button>
            </div>
            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Network className="size-3.5" /> {SITE.coverage} · NDPA 2023 · CRA 2017 · ISO/SOC 2
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
