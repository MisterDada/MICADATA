import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  Database,
  FileCheck2,
  Fingerprint,
  Landmark,
  LineChart,
  Lock,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Store,
  Workflow,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { Reveal } from '@/components/shared/Reveal'
import { SITE, TESTIMONIALS, TRUST_SIGNALS } from '@/lib/site'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

/* ── Pipeline model ──────────────────────────────────────────── */
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
    inputs: ['Credit bureau feeds', 'Identity registries', 'Bank & POS feeds', 'Financial statements'],
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
    title: 'Decision Intelligence Gateway',
    short: 'Decide',
    description:
      'Automated decisioning with policy rules, explanations and human-in-the-loop override — returned via one REST API in under 2 seconds.',
    inputs: ['Policy engine', 'Explanations', 'Auto-approve / refer', 'Full audit trail'],
    icon: Cpu,
  },
]

/* ── Audience tabs ───────────────────────────────────────────── */
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
      'Banks, MFIs and digital lenders aggregate bureau, identity and cash-flow data into a single decision — cutting manual review and default rates.',
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
    bullets: ['POS + bank feeds build your score automatically', 'Real-time limits via WhatsApp, no paperwork', 'Share a verified profile with any lender'],
    metric: '24hrs',
    metricLabel: 'from POS connect to first credit limit',
    cta: 'Meet the WhatsApp bot',
    ctaHref: '/about',
  },
]

const COMPLIANCE = [
  { icon: ShieldCheck, title: 'NDPA 2023', text: 'Consent receipts and data-subject rights in every lookup.' },
  { icon: Lock, title: 'CRA 2017', text: 'Regulated bureau data under strict Credit Reporting Act controls.' },
  { icon: FileCheck2, title: 'ISO / SOC 2', text: 'Audited controls, encryption everywhere, in-region hosting.' },
]

/* ── Sticky showcase ─────────────────────────────────────────── */
interface ShowcaseStep {
  index: string
  title: string
  text: string
}

function Showcase({
  eyebrow,
  title,
  intro,
  steps,
  visual,
  flip = false,
}: {
  eyebrow: string
  title: string
  intro: string
  steps: ShowcaseStep[]
  visual: ReactNode
  flip?: boolean
}) {
  const [active, setActive] = useState(0)

  return (
    <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={cn('lg:sticky lg:top-32', flip && 'lg:order-2')}>
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">{eyebrow}</p>
          <h3 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
            {title}
          </h3>
          <p className="mt-5 max-w-lg text-lg font-normal leading-relaxed text-[#86868B]">{intro}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          {visual}
        </Reveal>
        <div className="mt-6 flex gap-2" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.index}
              className={cn('h-1 flex-1 rounded-full transition-colors duration-300', i === active ? 'bg-[#0066CC]' : 'bg-white/10')}
            />
          ))}
        </div>
      </div>

      <div className={cn('flex flex-col', flip && 'lg:order-1')}>
        {steps.map((s, i) => (
          <motion.div
            key={s.index}
            onViewportEnter={() => setActive(i)}
            viewport={{ amount: 0.6 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex min-h-[32vh] flex-col justify-center border-t border-white/10 py-10 first:border-t-0 first:pt-0 lg:min-h-[38vh]"
          >
            <p className={cn('font-display text-sm font-semibold tracking-[0.2em]', i === active ? 'text-[#2f8cff]' : 'text-white/30')}>
              {s.index}
            </p>
            <h4 className={cn('mt-3 font-display text-2xl font-semibold tracking-tight transition-colors sm:text-3xl', i === active ? 'text-white' : 'text-white/40')}>
              {s.title}
            </h4>
            <p className="mt-3 max-w-md leading-relaxed text-[#86868B]">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const SCORE_STEPS: ShowcaseStep[] = [
  {
    index: '01',
    title: 'Triangulate identity',
    text: 'NIN and BVN records matched against CAC filings and live POS activity — one resolved entity, one confidence score.',
  },
  {
    index: '02',
    title: 'Read real cash flow',
    text: 'POS turnover, seasonality and repayment capacity stream in live. No statements, no paperwork, no guesswork.',
  },
  {
    index: '03',
    title: 'Score — and explain it',
    text: 'An explainable 0–850 score with reason codes, affordability signals and a recommended credit limit.',
  },
]

const VERIFY_STEPS: ShowcaseStep[] = [
  {
    index: '01',
    title: 'Verify identity',
    text: 'NIN / BVN validation against authoritative registries — with liveness checks and consent receipts on every lookup.',
  },
  {
    index: '02',
    title: 'Check credentials',
    text: 'WAEC and tertiary records, CAC filings, directors and compliance standing, confirmed at source.',
  },
  {
    index: '03',
    title: 'Screen cross-border',
    text: 'Corridor checks across Angola, Eswatini, Qatar and US Military HR — sealed into a single auditable report.',
  },
]

function ScoreVisual() {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-neutral-900/60 p-8 backdrop-blur-xl sm:p-10">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50">SME ScoreEngine™</p>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#059669]">
          <span className="size-1.5 rounded-full bg-[#059669]" /> Verified
        </span>
      </div>
      <p className="mt-6 font-display text-7xl font-semibold tracking-tight text-white sm:text-8xl">
        742<span className="text-2xl font-normal text-white/40"> / 850</span>
      </p>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[87%] rounded-full bg-[#0066CC]" />
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[13px]">
        {['NIN ✓  ·  BVN ✓  ·  CAC ✓', 'POS velocity · ₦4.2M / 90d'].map((line) => (
          <p key={line} className="text-white/60">{line}</p>
        ))}
        <p className="text-white">Decision · <span className="text-[#2f8cff]">Approve — ₦2.5M limit</span></p>
      </div>
    </div>
  )
}

function VerifyVisual() {
  const rows = [
    ['Identity', 'NIN / BVN + liveness'],
    ['Education', 'WAEC · confirmed'],
    ['Registry', 'CAC · RC 1748210 · active'],
    ['Cross-border', 'Angola · Eswatini · Qatar'],
  ]
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-neutral-900/60 p-8 backdrop-blur-xl sm:p-10">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50">Verify Africa</p>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#059669]">
          <span className="size-1.5 rounded-full bg-[#059669]" /> Sealed
        </span>
      </div>
      <div className="mt-6 flex flex-col">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 border-t border-white/10 py-4">
            <p className="text-[15px] font-medium text-white">{k}</p>
            <p className="inline-flex items-center gap-2 font-mono text-[13px] text-white/60">
              <CheckCircle2 className="size-4 text-[#059669]" /> {v}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[13px] text-white/40">Report sealed · latency 1.4s · audit #VFA-2204</p>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export function Home() {
  const [activeStage, setActiveStage] = useState(PIPELINE[2].id)
  const [activeAudience, setActiveAudience] = useState(AUDIENCES[0].id)

  const stage = PIPELINE.find((s) => s.id === activeStage) ?? PIPELINE[0]
  const audience = AUDIENCES.find((a) => a.id === activeAudience) ?? AUDIENCES[0]
  const featured = TESTIMONIALS[0]
  const rest = TESTIMONIALS.slice(1)

  return (
    <div className="bg-black">
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
        <GridBackdrop />
        <div className="container-enterprise relative">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/70">
                <span className="size-1.5 rounded-full bg-[#059669]" />
                Live across {SITE.coverage}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-8 text-balance font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-7xl lg:text-[5.5rem]">
                Pan-African Data.
                <br />
                <span className="text-white/40">Instant Decisioning.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg font-normal leading-relaxed text-[#86868B] sm:text-xl">
                Aggregation, normalisation and triangulated entity resolution — powering explainable
                risk models for every lender, corporate and fintech in Africa.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="/products">Explore the platform</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/about">Talk to sales</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="w-full">
              <dl className="mx-auto mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
                {TRUST_SIGNALS.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1.5 text-center">
                    <dd className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{s.value}</dd>
                    <dt className="text-sm text-[#86868B]">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ LINE-DRAW PIPELINE ══════════════════════════════ */}
      <section className="border-t border-white/10 py-28 sm:py-36">
        <div className="container-enterprise">
          <SectionHeading
            eyebrow="The pipeline"
            title="From raw feeds to a decision in seconds."
            description="One line. Five stages. Fragmented African data in — decision-ready intelligence out."
          />

          <Reveal className="mt-16 sm:mt-20">
            <div className="overflow-x-auto pb-2">
              <div className="relative min-w-[680px] px-2">
                <div className="absolute left-10 right-10 top-[5px] h-px bg-white/10" aria-hidden="true" />
                <motion.div
                  className="absolute left-10 right-10 top-[5px] h-px origin-left bg-[#0066CC]"
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: EASE }}
                />
                <div className="relative grid grid-cols-5">
                  {PIPELINE.map((s) => {
                    const isActive = s.id === activeStage
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveStage(s.id)}
                        aria-pressed={isActive}
                        className="group flex flex-col items-center gap-4 px-2 text-center"
                      >
                        <span
                          className={cn(
                            'size-3 rounded-full transition-all duration-300',
                            isActive ? 'bg-[#0066CC] ring-4 ring-[#0066CC]/25' : 'bg-white/20 group-hover:bg-white/40',
                          )}
                        />
                        <span>
                          <span className="block font-display text-xs font-semibold tracking-[0.2em] text-white/30">{s.step}</span>
                          <span className={cn('mt-1 block text-sm font-semibold', isActive ? 'text-white' : 'text-white/50')}>
                            {s.short}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
              >
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">
                    Stage {stage.step} · {stage.short}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">{stage.title}</h3>
                  <p className="mt-4 text-lg font-normal leading-relaxed text-[#86868B]">{stage.description}</p>
                </div>
                <div className="flex flex-col justify-center">
                  {stage.inputs.map((input) => (
                    <p key={input} className="flex items-center gap-3 border-t border-white/10 py-3.5 text-[15px] text-white/80 last:border-b">
                      <CheckCircle2 className="size-4 shrink-0 text-[#059669]" /> {input}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══ STICKY SHOWCASES ═══════════════════════════════ */}
      <section className="border-t border-white/10 py-28 sm:py-36">
        <div className="container-enterprise flex flex-col gap-28 sm:gap-36">
          <Showcase
            eyebrow="SME DataHub™"
            title="A credit score for the invisible."
            intro="Closing the $32B SME credit gap — triangulated identity, live cash flow, one explainable score."
            steps={SCORE_STEPS}
            visual={<ScoreVisual />}
          />
          <Showcase
            flip
            eyebrow="Verify Africa"
            title="Every check. One report."
            intro="Identity, credentials and cross-border screening — sealed, auditable, delivered in seconds."
            steps={VERIFY_STEPS}
            visual={<VerifyVisual />}
          />
        </div>
      </section>

      {/* ══ AUDIENCES ══════════════════════════════════════ */}
      <section className="border-t border-white/10 bg-[#0B0F17] py-28 sm:py-36">
        <div className="container-enterprise">
          <SectionHeading
            eyebrow="Who it's for"
            title="One layer. Four outcomes."
            description="Select your segment to see exactly how MiCA-DATA plugs into your stack."
          />

          <Reveal className="mt-12 flex justify-center">
            <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5" role="tablist" aria-label="Target audiences">
              {AUDIENCES.map((a) => (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={a.id === activeAudience}
                  onClick={() => setActiveAudience(a.id)}
                  className={cn(
                    'rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                    a.id === activeAudience ? 'bg-white text-black' : 'text-white/60 hover:text-white',
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={audience.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16"
              >
                <div>
                  <h3 className="text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                    {audience.headline}
                  </h3>
                  <p className="mt-5 text-lg font-normal leading-relaxed text-[#86868B]">{audience.value}</p>
                  <div className="mt-7 flex flex-col">
                    {audience.bullets.map((b) => (
                      <p key={b} className="border-t border-white/10 py-3 text-[15px] text-white/80 last:border-b">
                        {b}
                      </p>
                    ))}
                  </div>
                  <Link
                    to={audience.ctaHref}
                    className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2f8cff] hover:text-white"
                  >
                    {audience.cta} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-display text-6xl font-semibold tracking-tight text-white sm:text-7xl">{audience.metric}</p>
                  <p className="mt-3 text-[#86868B]">{audience.metricLabel}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══ WHATSAPP ═══════════════════════════════════════ */}
      <section className="border-t border-white/10 py-28 sm:py-36">
        <div className="container-enterprise grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">WhatsApp Financial Intelligence</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              Cash flow, scores and limits — inside WhatsApp.
            </h2>
            <p className="mt-5 max-w-lg text-lg font-normal leading-relaxed text-[#86868B]">
              Small businesses connect POS and bank feeds once. MiCA&apos;s bot then delivers cash-flow
              summaries, live scores and trade-credit limits — no app, no paperwork.
            </p>
            <div className="mt-8 flex flex-col">
              {[
                'Daily cash-flow pulse: inflows, outflows, runway',
                'Live risk score — and what moves it',
                'One-tap limits, shareable with any lender',
              ].map((f) => (
                <p key={f} className="flex items-center gap-3 border-t border-white/10 py-3.5 text-[15px] text-white/80 last:border-b">
                  <CheckCircle2 className="size-4 shrink-0 text-[#059669]" /> {f}
                </p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/about">Try the WhatsApp demo</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">How scoring works</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/70 backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-4">
                <span className="grid size-9 place-items-center rounded-full bg-white font-display text-xs font-semibold text-black">
                  M
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">MiCA Assistant</span>
                  <span className="block text-xs text-white/50">online · Financial Intelligence</span>
                </span>
              </div>
              <div className="flex flex-col gap-2.5 p-4 text-[13px] leading-snug">
                <div className="max-w-[85%] self-start rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-white/85">
                  👋 Morning Ada! Your 7-day cash-flow pulse is ready.
                </div>
                <div className="max-w-[90%] self-start rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-white/85">
                  Inflows <b className="text-white">₦1.84M</b> · Outflows ₦1.21M
                  <br />
                  SME Score <b className="text-white">742 (Prime ↑18)</b>
                  <br />
                  Trade limit <b className="text-white">₦2.5M</b> · 3 suppliers
                </div>
                <div className="max-w-[70%] self-end rounded-2xl rounded-tr-md bg-[#0066CC] px-3.5 py-2.5 text-white">
                  Share my limit with Dangote Depot?
                </div>
                <div className="max-w-[85%] self-start rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-white/85">
                  ✅ Verified profile sent. Approval odds: <b className="text-white">High (91%)</b>
                </div>
                <div className="mt-1 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-white/40">
                  <MessageCircle className="size-4" />
                  <span className="text-xs">Ask about cash flow, score, limits…</span>
                </div>
              </div>
            </div>
            <p className="mt-5 text-center text-xs tracking-wide text-white/30">POS + bank feeds → live score</p>
          </Reveal>
        </div>
      </section>

      {/* ══ COMPLIANCE ═════════════════════════════════════ */}
      <section className="border-t border-white/10 py-24 sm:py-28">
        <div className="container-enterprise">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Regulated data, handled like it.
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3">
            {COMPLIANCE.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="border-t border-white/10 pt-6">
                  <c.icon className="size-5 text-white/60" />
                  <p className="mt-4 text-[15px] font-semibold text-white">{c.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#86868B]">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROOF ══════════════════════════════════════════ */}
      <section className="border-t border-white/10 bg-[#0B0F17] py-28 sm:py-36">
        <div className="container-enterprise">
          <Reveal className="mx-auto max-w-4xl text-center">
            <blockquote className="text-balance font-display text-2xl font-medium leading-snug tracking-tight text-white sm:text-4xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-[15px] text-[#86868B]">
              {featured.name} · {featured.role}, {featured.company}
            </p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-2">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="border-t border-white/10 pt-6">
                  <blockquote className="text-[15px] leading-relaxed text-white/70">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm text-[#86868B]">
                    {t.name} · {t.role}, {t.company}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section className="border-t border-white/10 py-28 sm:py-36">
        <div className="container-enterprise mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <h2 className="text-balance font-display text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-white sm:text-6xl">
              One API.
              <br />
              Every decision.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg font-normal text-[#86868B]">
              Start with a 30-day proof-of-value against your own portfolio. No rip-and-replace required.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/products">Explore the platform</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/about">Contact sales</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-8 inline-flex items-center gap-2 text-[13px] text-white/30">
              <ScanLine className="size-4" /> {SITE.coverage} · NDPA 2023 · CRA 2017 · ISO/SOC 2
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
