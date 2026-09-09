import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  Receipt,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { FAQS, PRICING_TIERS } from '@/lib/site'
import { fadeUp, staggerParent } from '@/lib/motion'

type BillingMode = 'payg' | 'subscription'

const TIER_ICONS = [Receipt, TrendingUp, Building2] as const

const QUERY_TYPES = [
  { id: 'identity', label: 'Identity verification', rate: 0.8 },
  { id: 'credit', label: 'Credit score + profile', rate: 1.2 },
  { id: 'background', label: 'Background check (individual)', rate: 2.5 },
  { id: 'kyb', label: 'SME KYB / financial health export', rate: 1.8 },
  { id: 'blended', label: 'Blended mix', rate: 1.2 },
] as const

const GROWTH_BASE = 249
const GROWTH_INCLUDED = 5000
const GROWTH_OVERAGE = 0.45
const ENTERPRISE_TIERED_RATE = 0.3
const ENTERPRISE_THRESHOLD = 25000

function formatUSD(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: n >= 1000 ? 0 : 2,
  })
}

function BillingToggle({
  mode,
  onChange,
}: {
  mode: BillingMode
  onChange: (m: BillingMode) => void
}) {
  return (
    <div
      role="switch"
      aria-checked={mode === 'subscription'}
      tabIndex={0}
      onClick={() => onChange(mode === 'payg' ? 'subscription' : 'payg')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onChange(mode === 'payg' ? 'subscription' : 'payg')
        }
      }}
      className="inline-flex cursor-pointer select-none items-center rounded-md border border-slate-200 bg-slate-100 p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
    >
      {(
        [
          { id: 'payg', label: 'Pay-Per-Query' },
          { id: 'subscription', label: 'Monthly Subscription' },
        ] as const
      ).map((opt) => {
        const active = mode === opt.id
        return (
          <button
            key={opt.id}
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation()
              onChange(opt.id)
            }}
            className={cn(
              'rounded-md px-5 py-2 transition-all',
              active
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-700',
            )}
          >
            {opt.label}
            {opt.id === 'subscription' && (
              <span className="ml-1.5 rounded-md bg-blue-100 px-1.5 py-0.5 text-[11px] font-bold text-blue-700">
                −62% per query
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function PricingCalculator({ mode }: { mode: BillingMode }) {
  const [volume, setVolume] = useState(3000)
  const [queryTypeId, setQueryTypeId] = useState<string>('blended')

  const queryType = QUERY_TYPES.find((q) => q.id === queryTypeId) ?? QUERY_TYPES[4]

  const { paygCost, growthCost, enterpriseCost, recommended, savings } = useMemo(() => {
    const payg = volume * queryType.rate
    const growth = GROWTH_BASE + Math.max(0, volume - GROWTH_INCLUDED) * GROWTH_OVERAGE
    const enterprise = volume * ENTERPRISE_TIERED_RATE
    const recommended: 'payg' | 'growth' | 'enterprise' =
      volume >= ENTERPRISE_THRESHOLD
        ? 'enterprise'
        : growth < payg
          ? 'growth'
          : 'payg'
    const cheapest = Math.min(payg, growth)
    return {
      paygCost: payg,
      growthCost: growth,
      enterpriseCost: enterprise,
      recommended,
      savings: Math.max(0, payg - growth),
    }
  }, [volume, queryType.rate])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="inline-flex items-center gap-2 text-slate-900">
            <Calculator className="size-5 text-blue-600" /> Dynamic pricing calculator
          </CardTitle>
          <p className="mt-1 text-sm text-slate-600">
            Estimate your monthly cost by query volume. Switch billing modes above — the
            estimate updates live.
          </p>
        </div>
       
      </CardHeader>
      <CardContent className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="query-type" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Query type
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {QUERY_TYPES.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setQueryTypeId(q.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-left text-sm transition-all',
                    queryTypeId === q.id
                      ? 'border-blue-300 bg-blue-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700',
                  )}
                >
                  <span className="block font-semibold">{q.label}</span>
                  <span className="text-xs opacity-70">${q.rate.toFixed(2)} / query PAYG</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="volume" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Monthly query volume
              </label>
              <input
                type="number"
                min={50}
                max={200000}
                step={50}
                value={volume}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  if (Number.isFinite(v)) setVolume(Math.min(200000, Math.max(50, v)))
                }}
                className="w-28 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-right text-sm font-semibold text-slate-900 outline-none focus:border-blue-300"
              />
            </div>
            <input
              id="volume"
              type="range"
              min={100}
              max={50000}
              step={100}
              value={Math.min(volume, 50000)}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-3 w-full accent-blue-500"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[500, 2000, 5000, 20000].map((v) => (
                <button
                  key={v}
                  onClick={() => setVolume(v)}
                  className={cn(
                    'rounded-md border px-3 py-1 text-xs font-semibold transition-all',
                    volume === v
                      ? 'border-blue-300 bg-blue-50 text-slate-900'
                      : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700',
                  )}
                >
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {volume.toLocaleString()} queries/mo · {queryType.label} @ ${queryType.rate.toFixed(2)}/query
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-100 p-5">
          <div
            className={cn(
              'flex items-center justify-between rounded-xl border p-4',
              recommended === 'payg' ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white',
            )}
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Pay-Per-Query {recommended === 'payg' && <span className="ml-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">· Best fit</span>}
              </p>
              <p className="text-xs text-slate-500">No base fee · {volume.toLocaleString()} × ${queryType.rate.toFixed(2)}</p>
            </div>
            <p className="font-display text-xl font-extrabold text-slate-900">{formatUSD(paygCost)}</p>
          </div>

          <div
            className={cn(
              'flex items-center justify-between rounded-xl border p-4',
              recommended === 'growth' ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white',
            )}
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Growth / Fintech {recommended === 'growth' && <span className="ml-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">· Best fit</span>}
              </p>
              <p className="text-xs text-slate-500">
                ${GROWTH_BASE} incl. {GROWTH_INCLUDED.toLocaleString()} · ${GROWTH_OVERAGE.toFixed(2)} overage
              </p>
            </div>
            <p className="font-display text-xl font-extrabold text-slate-900">{formatUSD(growthCost)}</p>
          </div>

          <div
            className={cn(
              'flex items-center justify-between rounded-xl border p-4',
              recommended === 'enterprise' ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white',
            )}
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Enterprise {recommended === 'enterprise' && <span className="ml-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">· Best fit</span>}
              </p>
              <p className="text-xs text-slate-500">Tiered SLA · indic. ~${ENTERPRISE_TIERED_RATE.toFixed(2)}/query at scale</p>
            </div>
            <p className="font-display text-xl font-extrabold text-slate-900">{formatUSD(enterpriseCost)}*</p>
          </div>

          {savings > 0 && recommended !== 'payg' && (
            <p className="rounded-xl bg-blue-50 px-4 py-2.5 text-[13px] font-medium text-blue-700">
              Growth saves you {formatUSD(savings)}/mo vs pay-per-query at this volume.
            </p>
          )}
          {recommended === 'payg' && (
            <p className="rounded-xl bg-slate-100 px-4 py-2.5 text-[13px] text-slate-600">
              Stay on pay-per-query until ~{(Math.ceil(GROWTH_BASE / queryType.rate / 100) * 100).toLocaleString()} queries/mo — then Growth wins.
            </p>
          )}
          <p className="text-[11px] leading-relaxed text-slate-600">
            *Enterprise is custom-quoted (throughput, residency, MDM scope). Indicative tiered rate shown for planning only.
          </p>
          <Button asChild className="mt-1">
            <Link to="/about">
              {recommended === 'enterprise' ? 'Talk to sales' : recommended === 'growth' ? 'Scale with Growth' : 'Start verifying'} <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function Pricing() {
  const [mode, setMode] = useState<BillingMode>('subscription')

  return (
    <div className="bg-white">
      {/* ── HERO + TOGGLE ── */}
      <section className="relative overflow-hidden pb-12 pt-16 sm:pt-20">
        <GridBackdrop />
        <div className="container-enterprise relative">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mx-auto flex max-w-3xl flex-col items-center text-center">
            
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Pricing that scales with your decisions
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              Start transactional, scale to subscription, graduate to a tiered SLA. Every
              plan includes the dashboard, REST API and audit trails.
            </p>
            <div className="mt-6">
              <BillingToggle mode={mode} onChange={setMode} />
              <p className="mt-3 text-xs text-slate-500">
                {mode === 'payg'
                  ? 'Showing transactional rates — ideal for SMEs and low-volume verification.'
                  : 'Showing subscription rates — continuous queries with discounted metering.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TIERS ── */}
      <section className="pb-16">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="container-enterprise grid gap-5 lg:grid-cols-3"
        >
          {PRICING_TIERS.map((tier, i) => {
            const Icon = TIER_ICONS[i % TIER_ICONS.length]
            const price = mode === 'payg' ? tier.payPerQueryPrice : tier.subscriptionPrice
            const unit = mode === 'payg' ? tier.payPerQueryUnit : tier.subscriptionUnit
            const isCustom = price.toLowerCase().includes('custom')
            return (
              <motion.div key={tier.id} variants={fadeUp} custom={i}>
                <Card className={cn('flex h-full flex-col', tier.highlighted && 'border-blue-300 shadow-sm')}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl border border-slate-300 bg-slate-100">
                        <Icon className="size-5 text-blue-600" />
                      </span>
                      {/* {tier.highlighted
                        ? <Badge>Most popular</Badge>
                        : <Badge variant="neutral">{tier.audience}</Badge>} */}
                    </div>
                    <CardTitle className="mt-3 text-slate-900">{tier.name}</CardTitle>
                    {tier.highlighted && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{tier.audience}</p>
                    )}
                    <p className="text-sm text-slate-600">{tier.tagline}</p>
                    <p className="pt-2">
                      <span className="font-display text-4xl font-extrabold text-slate-900">{price}</span>
                      {!isCustom && <span className="ml-2 text-sm text-slate-500">{unit}</span>}
                      {isCustom && <span className="ml-2 text-sm text-slate-500">{unit}</span>}
                    </p>
                    <p className="text-xs text-slate-500">{tier.meteringNote}</p>
                    {/* Dual-mode hint */}
                    <p className="text-xs text-slate-600">
                      {mode === 'payg'
                        ? `Subscription: ${tier.subscriptionPrice} ${tier.subscriptionUnit}`
                        : `Pay-per-query: ${tier.payPerQueryPrice} ${tier.payPerQueryUnit}`}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-5">
                    <Button variant={tier.highlighted ? 'default' : 'secondary'} asChild>
                      <Link to="/about">{tier.cta} <ArrowRight /></Link>
                    </Button>
                    <ul className="flex flex-col gap-2.5">
                      {tier.features.map((f) => (
                        <li key={f} className="inline-flex items-start gap-2 text-sm text-slate-600">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue-700" /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto border-t border-slate-200 pt-4">
                      {tier.limits.map((l) => (
                        <p key={l} className="text-xs text-slate-500">· {l}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── CALCULATOR ── */}
        <div className="container-enterprise mt-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <PricingCalculator mode={mode} />
          </motion.div>
        </div>

        {/* ── TRUST STRIP ── */}
        <div className="container-enterprise mt-12 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 sm:grid-cols-3">
          <p><span className="font-semibold text-slate-900">No hidden bureau fees.</span> Registry pass-through is included in the quoted per-query rate.</p>
          <p><span className="font-semibold text-slate-900">Consent + audit included.</span> Every lookup ships with a consent receipt and decision trail.</p>
          <p><span className="font-semibold text-slate-900">Pilot in 30 days.</span> Start pay-per-query, convert usage into Growth credit on upgrade.</p>
        </div>

        {/* ── FAQ ── */}
        <div className="container-enterprise mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            align="left"
            title="Answers, upfront"
            description="Billing, metering and deployment — the questions every risk, finance and compliance team asks."
            variant="neutral"
          />
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <motion.details
                key={f.question}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group rounded-2xl border border-slate-200 bg-white/[0.03] p-5 open:bg-white/[0.05]"
              >
                <summary className="cursor-pointer list-none font-display text-[15px] font-bold text-slate-900">
                  {f.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
