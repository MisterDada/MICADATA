import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Database,
  FileWarning,
  Fingerprint,
  Globe2,
  Landmark,
  Lock,
  Scale,
  Send,
  ShieldCheck,
  Split,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/shared/Reveal'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { SITE } from '@/lib/site'

const PROBLEMS = [
  {
    icon: Fingerprint,
    stat: '60%+',
    title: 'Fragmented identity records',
    text: 'Names, NINs, BVNs, voter cards and passports live in disconnected registries. A single customer can appear as three different people — or be invisible entirely.',
  },
  {
    icon: Building2,
    stat: '90M+',
    title: 'Unbanked SME data gaps',
    text: 'Millions of creditworthy SMEs operate outside bureau files. Without telco, trade and alternative financial streams, lenders cannot price risk — so capital stays locked out.',
  },
  {
    icon: Split,
    stat: '<2s',
    title: 'Cross-border verification bottlenecks',
    text: 'Hiring or lending across Lagos, Nairobi and Accra means weeks of manual checks. MiCA-DATA compresses that to an API call.',
  },
]

const METRICS: Array<[string, string]> = [
  ['$32B', 'Credit gap addressed'],
  ['90M+', 'SMEs underserved by formal credit'],
  ['30+', 'African markets, live registries'],
  ['<2s', 'Median verification latency'],
]

const SOURCES = [
  {
    icon: Landmark,
    title: 'Licensed bureau data',
    text: 'FirstCentral tradelines, delinquency flags and repayment histories — normalised into one explainable profile.',
  },
  {
    icon: Database,
    title: 'Public registries',
    text: 'Corporate affairs commissions, national ID authorities, courts and licensing bodies across 30+ markets.',
  },
  {
    icon: FileWarning,
    title: 'Alternative streams',
    text: 'Consented telco, banking, mobile-money, payroll and trade signals that make thin-file customers scoreable.',
  },
]

const GOVERNANCE = [
  {
    icon: Lock,
    title: 'NDPA 2023',
    text: 'Nigeria Data Protection Act — consent capture, purpose limitation, residency controls and data-subject rights on every lookup.',
  },
  {
    icon: Scale,
    title: 'CRA 2017',
    text: 'Credit Reporting Act — licensed bureau access, permissible-purpose checks and dispute-handling in the audit trail.',
  },
]

const REACH = [
  {
    icon: Globe2,
    title: 'Global background verification',
    text: 'Local education, employment, criminal-record and licence data orchestrated into one report global employers can trust.',
    points: ['Employment & education history', 'Criminal & court record search', 'Reference orchestration'],
  },
  {
    icon: Building2,
    title: 'Pan-African business intelligence',
    text: 'Registry records, ownership graphs, financials and litigation flags — any SME, diligenced in seconds.',
    points: ['Registry + UBO graphs', 'Financials & credit limits', 'Litigation & compliance flags'],
  },
]

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors [color-scheme:dark] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/30'

export function About() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="bg-black">
      {/* ── STATEMENT ── */}
      <section className="relative overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24">
        <GridBackdrop />
        <div className="container-enterprise relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/70">
              Our mission · {SITE.coverage}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-8 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-7xl">
              Capital can&apos;t find the businesses that deserve it.
              <br />
              <span className="text-white/40">We fix that.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg font-normal leading-relaxed text-[#86868B] sm:text-xl">
              Identity is fragmented. Credit files are thin. MiCA-DATA bridges the gap — one entity
              graph, one API, every decision-grade African record resolved, verified and audit-ready.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/products">Explore the platform</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact">Talk to advisory</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── METRICS BAND (light) ── */}
      <section className="bg-[#F5F5F7] py-20 sm:py-24">
        <div className="container-enterprise grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {METRICS.map(([value, label], i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="border-t-2 border-black/80 pt-5">
                <p className="font-display text-5xl font-semibold tracking-tight text-black sm:text-6xl">{value}</p>
                <p className="mt-2 text-[15px] text-black/60">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="py-28 sm:py-36">
        <div className="container-enterprise">
          <Reveal className="max-w-3xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">The problem</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              Africa doesn&apos;t lack data. It lacks unified, trusted data.
            </h2>
          </Reveal>
          <div className="mt-14">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="grid gap-6 border-t border-white/10 py-10 last:border-b sm:grid-cols-[auto_1fr_1.4fr] sm:items-baseline sm:gap-12">
                  <p className="font-display text-sm font-semibold tracking-[0.2em] text-white/30">0{i + 1}</p>
                  <div>
                    <p className="font-display text-4xl font-semibold tracking-tight text-white">{p.stat}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">{p.title}</h3>
                  </div>
                  <p className="max-w-xl leading-relaxed text-[#86868B]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="border-t border-white/10 bg-[#0B0F17] py-28 sm:py-36">
        <div className="container-enterprise">
          <Reveal className="max-w-3xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">Data ecosystem</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              Multi-source aggregation. Legally firewalled.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-normal leading-relaxed text-[#86868B]">
              Bureau depth, registry breadth and alternative-data signal — every record permissioned
              and receipted.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {SOURCES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="border-t border-white/10 pt-6">
                  <s.icon className="size-5 text-white/60" />
                  <p className="mt-4 text-[15px] font-semibold text-white">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#86868B]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {GOVERNANCE.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <div className="rounded-[1.75rem] border border-white/10 bg-neutral-900/60 p-8 backdrop-blur-xl">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/5">
                      <g.icon className="size-5 text-white/70" />
                    </span>
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f8cff]">
                        <ShieldCheck className="size-3.5" /> Privacy firewall
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">{g.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#86868B]">{g.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REACH ── */}
      <section className="border-t border-white/10 py-28 sm:py-36">
        <div className="container-enterprise grid items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">{SITE.location}</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              Global reach, local intelligence.
            </h2>
            <p className="mt-5 max-w-xl text-lg font-normal leading-relaxed text-[#86868B]">
              A bank in London, an employer in Dubai or a lender in Accra can verify any African
              consumer or business with the same confidence as a domestic check.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Lagos', 'Nairobi', 'Accra', 'Johannesburg', '+ 26 markets'].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/70">
                  <Globe2 className="size-3.5" /> {c}
                </span>
              ))}
            </div>
            <div className="mt-9">
              <Button variant="secondary" asChild>
                <Link to="/products">See coverage in products <ArrowRight /></Link>
              </Button>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            {REACH.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="rounded-[1.75rem] border border-white/10 bg-neutral-900/60 p-8 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl bg-white/5">
                      <r.icon className="size-5 text-white/70" />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white">{r.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#86868B]">{r.text}</p>
                  <div className="mt-5 flex flex-col border-t border-white/10">
                    {r.points.map((pt) => (
                      <p key={pt} className="flex items-center gap-2.5 border-b border-white/10 py-3 text-sm text-white/80">
                        <CheckCircle2 className="size-4 shrink-0 text-[#059669]" /> {pt}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t border-white/10 bg-[#0B0F17] py-28 sm:py-36">
        <div className="container-enterprise grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2f8cff]">Enterprise advisory</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              Talk to our integration team.
            </h2>
            <p className="mt-5 max-w-md text-lg font-normal leading-relaxed text-[#86868B]">
              Tell us about your verification, credit or KYB volume. We respond within one business
              day — pilots deploy in days, proofs-of-value in 30.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-white/10 bg-neutral-900/60 p-7 backdrop-blur-xl sm:p-10">
              {sent ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="grid size-14 place-items-center rounded-full bg-[#059669]/15">
                    <CheckCircle2 className="size-7 text-[#059669]" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">Request received.</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#86868B]">
                    Our enterprise advisory team will reach out within one business day. For urgent
                    needs: {SITE.email}.
                  </p>
                  <Button variant="secondary" className="mt-8" onClick={() => setSent(false)}>
                    Send another inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="about-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                        Full name
                      </label>
                      <input id="about-name" name="name" required placeholder="Adaeze Okafor" autoComplete="name" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="about-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                        Work email
                      </label>
                      <input id="about-email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="about-company" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                        Company
                      </label>
                      <input id="about-company" name="company" required placeholder="Company / institution" autoComplete="organization" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="about-role" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                        Role
                      </label>
                      <select id="about-role" name="role" className={inputClass} defaultValue="Risk / Credit">
                        {['Risk / Credit', 'Compliance / KYC', 'Product / Engineering', 'Operations / HR', 'Executive / Other'].map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      What do you need?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Credit Intelligence', 'Identity & KYC', 'Background Checks', 'Business / KYB'].map((t, i) => (
                        <label key={t} className="cursor-pointer">
                          <input type="checkbox" name="interest" value={t} defaultChecked={i < 2} className="peer sr-only" />
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/60 transition-colors peer-checked:border-[#0066CC] peer-checked:bg-[#0066CC]/15 peer-checked:text-white">
                            {t}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="about-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      How can we help?
                    </label>
                    <textarea
                      id="about-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Monthly verification volume, markets (e.g. NG, GH, KE), and your timeline…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button type="submit" size="lg" className="sm:flex-1">
                      Request enterprise demo <Send />
                    </Button>
                    <p className="text-center text-xs leading-relaxed text-white/40 sm:max-w-[180px] sm:text-left">
                      Prefer email? <a href={`mailto:${SITE.email}`} className="font-semibold text-[#2f8cff] hover:text-white">{SITE.email}</a>
                    </p>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-white/30">
                    <Lock className="size-3.5" /> Consent-first · NDPA 2023 &amp; CRA 2017 aligned · never shared.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
