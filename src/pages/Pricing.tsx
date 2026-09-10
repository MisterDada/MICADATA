import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Check, Receipt, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { Reveal } from '@/components/shared/Reveal'
import { FAQS, PRICING_TIERS } from '@/lib/site'

type BillingMode = 'payg' | 'subscription'

const TIER_ICONS = [Receipt, TrendingUp, Building2] as const

export function Pricing() {
  const [mode, setMode] = useState<BillingMode>('subscription')

  return (
    <div className="bg-black">
      {/* ── HERO + TOGGLE ── */}
      <section className="relative overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-24">
        <GridBackdrop />
        <div className="container-enterprise relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/70">
              Simple, usage-based pricing
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-8 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-7xl">
              Pricing that scales
              <br />
              <span className="text-white/40">with your decisions.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg font-normal leading-relaxed text-[#86868B] sm:text-xl">
              Start transactional, scale to subscription, graduate to a tiered SLA. Every plan includes
              the dashboard, REST API and audit trails.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div
              className="mt-10 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5"
              role="tablist"
              aria-label="Billing mode"
            >
              {(
                [
                  { id: 'payg', label: 'Pay per query' },
                  { id: 'subscription', label: 'Subscription' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={mode === opt.id}
                  onClick={() => setMode(opt.id)}
                  className={cn(
                    'rounded-full px-6 py-2.5 text-sm font-semibold transition-colors',
                    mode === opt.id ? 'bg-white text-black' : 'text-white/60 hover:text-white',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TIERS ── */}
      <section className="pb-28 sm:pb-36">
        <div className="container-enterprise grid items-stretch gap-5 lg:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => {
            const Icon = TIER_ICONS[i % TIER_ICONS.length]
            const price = mode === 'payg' ? tier.payPerQueryPrice : tier.subscriptionPrice
            const unit = mode === 'payg' ? tier.payPerQueryUnit : tier.subscriptionUnit
            const isCustom = price.toLowerCase().includes('custom')
            return (
              <Reveal key={tier.id} delay={i * 0.08} className="h-full">
                <Card className={cn('flex h-full flex-col p-2', tier.highlighted && 'border-white/25 shadow-titanium')}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-2xl bg-white/5">
                        <Icon className="size-5 text-white/70" />
                      </span>
                      {tier.highlighted && (
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                          Most popular
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-5 text-xl text-white">{tier.name}</CardTitle>
                    <p className="text-sm leading-relaxed text-[#86868B]">{tier.tagline}</p>
                    <p className="flex items-baseline gap-2 pt-3">
                      <span className="font-display text-5xl font-semibold tracking-tight text-white">{price}</span>
                      <span className="text-sm text-[#86868B]">{unit}</span>
                    </p>
                    <p className="pt-1 text-xs leading-relaxed text-white/40">{tier.meteringNote}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <Button
                      variant={tier.highlighted ? 'default' : 'secondary'}
                      className="w-full"
                      asChild
                    >
                      <Link to="/about">{tier.cta} <ArrowRight /></Link>
                    </Button>
                    <div className="mt-7 flex flex-col">
                      {tier.features.map((f) => (
                        <p key={f} className="flex items-start gap-3 border-t border-white/10 py-3 text-[15px] text-white/80">
                          <Check className="mt-0.5 size-4 shrink-0 text-white/40" /> {f}
                        </p>
                      ))}
                    </div>
                    <div className="mt-auto pt-6">
                      {tier.limits.map((l) => (
                        <p key={l} className="text-xs leading-relaxed text-white/40">· {l}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="container-enterprise mt-14">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-[#86868B]">
            No hidden bureau fees · Consent + audit included on every lookup · Pilot live in 30 days
          </p>
        </Reveal>

        {/* ── FAQ ── */}
        <div className="container-enterprise mt-24 grid gap-12 sm:mt-28 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Answers, upfront."
            description="Billing, metering and deployment — the questions every risk, finance and compliance team asks."
          />
          <Reveal delay={0.1}>
            <div className="border-t border-white/10">
              {FAQS.map((f) => (
                <details key={f.question} className="group border-b border-white/10 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold tracking-tight text-white [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-lg font-normal text-white/60 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#86868B]">{f.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
