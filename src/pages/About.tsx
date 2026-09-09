import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
import { SectionHeading } from '@/components/shared/SectionHeading'
import { GridBackdrop } from '@/components/shared/GridBackdrop'
import { SITE, TRUST_SIGNALS } from '@/lib/site'
import { fadeUp, staggerParent } from '@/lib/motion'

const PROBLEMS = [
  {
    icon: Fingerprint,
    title: 'Fragmented identity records',
    text: 'Names, NINs, BVNs, voter cards and passports live in disconnected registries. A single customer can appear as three different people — or be invisible entirely.',
    stat: '60%+',
    statLabel: 'of records need cross-registry resolution',
  },
  {
    icon: Building2,
    title: 'Unbanked SME data gaps',
    text: 'Millions of creditworthy SMEs operate outside bureau files. Without telco, trade and alternative financial streams, lenders cannot price risk — so capital stays locked out.',
    stat: '90M+',
    statLabel: 'African SMEs underserved by formal credit',
  },
  {
    icon: Split,
    title: 'Cross-border verification bottlenecks',
    text: 'Hiring or lending across Lagos, Nairobi and Accra means weeks of manual checks, inconsistent formats and untrusted agents. Expansion stalls at the border.',
    stat: 'Weeks → <2s',
    statLabel: 'from manual checks to API decisions',
  },
]

const SOURCES = [
  {
    icon: Landmark,
    title: 'FirstCentral Credit Bureau data',
    text: 'Licensed bureau tradelines, delinquency flags, and repayment histories normalised into one explainable credit profile.',
  },
  {
    icon: Database,
    title: 'Public registries',
    text: 'Corporate affairs commissions, national ID authorities, courts, voter rolls and professional licensing bodies across 30+ markets.',
  },
  {
    icon: FileWarning,
    title: 'Alternative financial streams',
    text: 'Consented telco, banking, mobile-money, payroll and trade signals that make thin-file and no-file customers scoreable.',
  },
]

const GOVERNANCE = [
  {
    icon: Lock,
    title: 'NDPA 2023 firewall',
    text: 'Nigeria Data Protection Act 2023 — consent capture, purpose limitation, residency controls and data-subject rights on every lookup.',
  },
  {
    icon: Scale,
    title: 'CRA 2017 firewall',
    text: 'Credit Reporting Act 2017 — licensed bureau access, permissible-purpose checks and dispute-handling baked into the audit trail.',
  },
]

const REACH = [
  {
    icon: Globe2,
    title: 'Global background verification',
    text: 'Local African education, employment, criminal-record and licence data orchestrated into one auditable report that global employers and screening platforms can trust.',
    points: ['Employment & education history', 'Criminal & court record search', 'Reference orchestration'],
  },
  {
    icon: Building2,
    title: 'Pan-African business intelligence',
    text: 'Corporate registry records, beneficial ownership graphs, financials and litigation flags — resolved continent-wide so capital can diligence any SME in seconds.',
    points: ['Registry + UBO graphs', 'Financials & credit limits', 'Litigation & compliance flags'],
  },
]

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20'

export function About() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="bg-white">
      {/* ── 1 · NARRATIVE & MISSION ─────────────────────────── */}
      <section className="relative overflow-hidden pb-14 pt-16 sm:pt-24">
        <GridBackdrop />
        <div className="container-enterprise relative">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="visible"
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            <motion.div variants={fadeUp}>
              
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl"
            >
              Building Africa&apos;s unified{' '}
              <span className="text-blue-700">
                data &amp; decision intelligence
              </span>{' '}
              infrastructure
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Identity is fragmented. Credit files are thin. Capital cannot find the businesses that deserve it.
              MiCA-DATA bridges identity fragmentation and unlocks capital flow — one entity graph, one API,
              every decision-grade African record resolved, verified and audit-ready.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/products">Explore the platform <ArrowRight /></Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact">Talk to advisory</a>
              </Button>
            </motion.div>

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

      {/* ── 2 · CORE PROBLEM WE SOLVE ───────────────────────── */}
      <section className="relative py-20">
        <div className="container-enterprise">
          <SectionHeading
            title="Africa doesn't lack data. It lacks unified, trusted data."
            description="Three structural gaps keep lenders cautious, employers slow and capital on the sidelines. We exist to close all three."
          />
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {PROBLEMS.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} custom={i} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-100 p-7">
                <span className="grid size-11 place-items-center rounded-xl border border-slate-300 bg-slate-100">
                  <p.icon className="size-5 text-blue-600" />
                </span>
                <p className="mt-5 font-display text-3xl font-extrabold text-slate-900">{p.stat}</p>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700/80">{p.statLabel}</p>
                <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3 · DATA ECOSYSTEM & GOVERNANCE ──────────────────── */}
      <section className="border-y border-slate-200/80 bg-slate-50 py-20">
        <div className="container-enterprise">
          <SectionHeading
            title="Multi-source aggregation. Legally firewalled."
            description="Bureau depth, registry breadth and alternative-data signal — every record permissioned, receipted and protected by Nigerian privacy and credit-reporting law."
            variant="trust"
          />

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-5 lg:grid-cols-3"
          >
            {SOURCES.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-blue-600 shadow-sm">
                  <s.icon className="size-5 text-white" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Governance firewalls */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-5 grid gap-5 md:grid-cols-2"
          >
            {GOVERNANCE.map((g, i) => (
              <motion.div
                key={g.title}
                variants={fadeUp}
                custom={i}
                className="relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-blue-200 bg-blue-50">
                    <g.icon className="size-5 text-blue-600" />
                  </span>
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700">
                      <ShieldCheck className="size-3.5" /> Privacy firewall
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-slate-900">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2 text-center text-[13px] leading-relaxed text-slate-500"
          >
            <Lock className="mt-0.5 size-4 shrink-0 text-slate-500" />
            Consent receipt on every lookup · purpose-limited access · in-region residency controls · immutable audit trails for regulators and auditors.
          </motion.p>
        </div>
      </section>

      {/* ── 4 · GLOBAL REACH, LOCAL INTELLIGENCE ─────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="container-enterprise">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
                Global reach, local intelligence
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-slate-600">
                Global decisions run on local records. We do the hard work of resolving fragmented African
                registries — so a bank in London, an employer in Dubai or a lender in Accra can verify any
                African consumer or business with the same confidence as a domestic check.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {['Lagos', 'Nairobi', 'Accra', 'Johannesburg', '+ 26 markets'].map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
                    <Globe2 className="size-3.5 text-blue-600" /> {c}
                  </span>
                ))}
              </div>
              <div className="mt-7">
                <Button variant="secondary" asChild>
                  <Link to="/products">See coverage in products <ArrowRight /></Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid gap-5"
            >
              {REACH.map((r, i) => (
                <motion.div key={r.title} variants={fadeUp} custom={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-slate-300 bg-slate-100">
                      <r.icon className="size-5 text-blue-600" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-900">{r.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{r.text}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                    {r.points.map((pt) => (
                      <li key={pt} className="inline-flex items-start gap-1.5 text-[13px] text-slate-600">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-700" /> {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5 · ENTERPRISE CONTACT / ADVISORY FORM ───────────── */}
      <section id="contact" className="border-t border-slate-200/80 bg-slate-50 py-20">
        <div className="container-enterprise grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            align="left"
            title="Talk to our integration team"
            description="Tell us about your verification, credit or KYB volume. We respond within one business day — pilots deploy in days, proofs-of-value in 30 days."
            variant="neutral"
            className="lg:sticky lg:top-24 lg:self-start"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-9"
          >
            {sent ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                <span className="grid size-14 place-items-center rounded-md bg-blue-50">
                  <CheckCircle2 className="size-7 text-blue-600" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">Request received</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                  Thanks — our enterprise advisory team will reach out within one business day at the work
                  email you provided. For urgent needs: {SITE.email}.
                </p>
                <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="about-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Full name
                    </label>
                    <input id="about-name" name="name" required placeholder="Adaeze Okafor" autoComplete="name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="about-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Work email
                    </label>
                    <input id="about-email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" className={inputClass} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="about-company" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Company
                    </label>
                    <input id="about-company" name="company" required placeholder="Company / institution" autoComplete="organization" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="about-role" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Role
                    </label>
                    <select id="about-role" name="role" className={inputClass} defaultValue="Risk / Credit">
                      {['Risk / Credit', 'Compliance / KYC', 'Product / Engineering', 'Operations / HR', 'Executive / Other'].map((r) => (
                        <option key={r} value={r} className="bg-slate-50">{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="about-interest" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    What do you need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Credit Intelligence', 'Identity & KYC', 'Background Checks', 'Business / KYB'].map((t, i) => (
                      <label key={t} className="cursor-pointer">
                        <input type="checkbox" name="interest" value={t} defaultChecked={i < 2} className="peer sr-only" />
                        <span className="inline-flex items-center rounded-md border border-slate-300 bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-all peer-checked:border-blue-300 peer-checked:bg-blue-50 peer-checked:text-blue-700">
                          {t}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="about-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" className="sm:flex-1">
                    Request enterprise demo <Send />
                  </Button>
                  <p className="text-center text-xs text-slate-500 sm:max-w-[180px] sm:text-left">
                    Prefer email? <a href={`mailto:${SITE.email}`} className="font-semibold text-blue-600 hover:text-blue-800">{SITE.email}</a>
                  </p>
                </div>
                <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Lock className="size-3.5" /> Consent-first · NDPA 2023 &amp; CRA 2017 aligned · never shared.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
