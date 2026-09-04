/**
 * MiCA-DATA — Central site content & navigation
 * Edit copy here; pages consume these constants.
 */
import type { Faq, NavLink, PricingTier, ProductPillar, Testimonial, TrustSignal } from '@/types'

export const SITE = {
  name: 'MiCA-DATA',
  fullName: 'MiCA Data Intelligence Layer',
  tagline: 'Pan-African financial-data, credit-intelligence & verification infrastructure.',
  description:
    'MiCA-DATA is the pan-African data intelligence layer for credit decisions, identity verification, and business information — one API, structured records, verified sources.',
  email: 'hello@mica-data.africa',
  location: 'Lagos · Nairobi · Accra · Johannesburg',
  coverage: '30+ African markets',
} as const

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', description: 'Credit, identity, verification & business data' },
  { label: 'Pricing', href: '/pricing', description: 'Transparent, usage-based plans' },
  { label: 'About Us', href: '/about', description: 'Mission, coverage & leadership' },
]

export const PRODUCT_PILLARS: ProductPillar[] = [
  {
    id: 'sme-datahub',
    badge: 'SME DataHub™ & ScoreEngine™',
    title: 'SME DataHub™ & ScoreEngine™',
    tagline: 'Closing the $32B SME credit gap.',
    description:
      'Triangulated entity resolution linking business owners’ identities (NIN / BVN) with CAC registry files and POS cash-flow streams — normalised into one decision-grade SME profile.',
    iconName: 'Gauge',
    capabilities: [
      'Alternative credit scoring (0–850)',
      'Cash-flow insights from POS streams',
      'Utility & telecom signals',
      'Peer benchmarking',
      'NIN / BVN ↔ CAC ↔ POS entity resolution',
    ],
    metric: { value: '$32B', label: 'SME credit gap addressed' },
  },
  {
    id: 'verify-africa',
    badge: 'Verify Africa',
    title: 'Verify Africa — Trust & Compliance',
    tagline: 'Background checking and verification, pan-African and cross-border.',
    description:
      'Identity verification (NIN / BVN), educational checks including WAEC verification, corporate registry (CAC) lookups, and international cross-border screening — including Angola, Eswatini, Qatar and US Military HR background checks.',
    iconName: 'ShieldCheck',
    capabilities: [
      'Identity verification (NIN / BVN)',
      'Education checks (WAEC verification)',
      'Corporate registry (CAC)',
      'Cross-border screening: Angola, Eswatini, Qatar, US Military HR',
    ],
    metric: { value: '30+', label: 'markets with live registries' },
  },
  {
    id: 'tradeguard',
    badge: 'TradeGuard™ & Risk Analytics',
    title: 'TradeGuard™ & Risk Analytics',
    tagline: 'Real-time B2B trade underwriting.',
    description:
      'Real-time supplier risk scoring and automated credit-exposure limit recommendations for FMCG distributors and B2B vendors — plus digital enablement with an integrated OCR engine for financial-statement extraction and iXBRL formatting.',
    iconName: 'Building2',
    capabilities: [
      'Real-time B2B trade underwriting',
      'Supplier risk scoring',
      'Automated credit-exposure limits for FMCG & B2B vendors',
      'OCR engine for financial-statement extraction',
      'iXBRL formatting',
    ],
    metric: { value: '<2s', label: 'median underwriting latency' },
  },
]

export const TRUST_SIGNALS: TrustSignal[] = [
  { value: '30+', label: 'African markets', sublabel: 'live registry coverage' },
  { value: '12M+', label: 'Business records', sublabel: 'indexed & refreshed' },
  { value: '99.99%', label: 'API uptime', sublabel: 'trailing 12 months' },
  { value: '<2s', label: 'Median latency', sublabel: 'verification endpoints' },
]

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'pay-per-query',
    name: 'Pay-Per-Query',
    tagline: 'Transactional / On-Demand. No monthly fee, no commitment.',
    audience: 'SMEs & low-volume callers',
    monthlyPrice: '$1.20',
    annualPrice: '$1.20',
    payPerQueryPrice: '$1.20',
    payPerQueryUnit: '/ verified query',
    subscriptionPrice: '$1.20',
    subscriptionUnit: '/ verified query',
    meteringNote: 'Pay only for what you verify · volume discounts from 1k+ queries',
    cta: 'Start verifying',
    features: [
      'Verified individual background checks',
      'One-off financial health exports',
      'Identity + document verification APIs',
      'Dashboard + REST API + audit trail',
      '30+ African markets, pay as you go',
      'Email support',
    ],
    limits: ['No monthly minimum', 'Standard SLA · <2s median latency'],
  },
  {
    id: 'growth',
    name: 'Growth / Fintech',
    tagline: 'Monthly subscription + discounted metering for scaling teams.',
    audience: 'Digital lenders & fintechs',
    monthlyPrice: '$249',
    annualPrice: '$199',
    payPerQueryPrice: '$0.45',
    payPerQueryUnit: '/ query overage',
    subscriptionPrice: '$249',
    subscriptionUnit: '/ mo',
    meteringNote: 'Incl. 5,000 queries/mo · $0.45 per extra query · annual −20%',
    cta: 'Scale with Growth',
    highlighted: true,
    features: [
      'Continuous identity verification queries',
      'SME credit scoring APIs',
      'Explainable risk scores + affordability signals',
      'Webhooks, audit trails & 5 workspaces',
      '10 markets included, expand on demand',
      'Dedicated success manager',
    ],
    limits: ['5,000 queries/mo included', '99.99% uptime SLA'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Institutional',
    tagline: 'Custom tiered SLA for high-throughput decisioning.',
    audience: 'Banks · FMCG distributors · institutions',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    payPerQueryPrice: 'Custom',
    payPerQueryUnit: 'tiered volume rate',
    subscriptionPrice: 'Custom',
    subscriptionUnit: 'annual agreement',
    meteringNote: 'Tiered volume pricing · dedicated throughput & residency',
    cta: 'Talk to sales',
    features: [
      'Dedicated MDM data pipelines',
      'Custom risk models on your portfolio',
      'High-throughput decision gateway',
      '30+ markets + custom registries',
      'VPC / in-region deployment + SSO',
      '24/7 enterprise support',
    ],
    limits: ['Custom SLA & data residency', 'SSO / SCIM · audit-ready'],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'MiCA-DATA collapsed four vendor integrations into one. Our approval time dropped from days to minutes.',
    name: 'Adaeze Okafor',
    role: 'Chief Risk Officer',
    company: 'Pan-African Digital Lender',
    initials: 'AO',
  },
  {
    quote: 'The only provider with consistent registry coverage across all our West African markets.',
    name: 'Kwame Mensah',
    role: 'Head of Compliance',
    company: 'Regional Commercial Bank',
    initials: 'KM',
  },
  {
    quote: 'Verification latency under two seconds changed our onboarding funnel completely.',
    name: 'Wanjiku Njoroge',
    role: 'VP Product',
    company: 'East African Fintech Platform',
    initials: 'WN',
  },
]

export const FAQS: Faq[] = [
  {
    question: 'Which markets does MiCA-DATA cover?',
    answer:
      'We provide live registry connectivity in 30+ African markets including Nigeria, Ghana, Kenya, South Africa, Rwanda, Senegal, Côte d’Ivoire and Egypt — with phased expansion across the continent.',
  },
  {
    question: 'How is data sourced and consented?',
    answer:
      'All records are sourced from authoritative registries, licensed bureaus and consented alternative-data partners. Every lookup carries a consent receipt and a full audit trail.',
  },
  {
    question: 'Can we start with a pilot before committing?',
    answer:
      'Yes. Starter and Growth plans are pilot-friendly, and Enterprise engagements begin with a scoped 30-day proof-of-value against your own portfolio data.',
  },
  {
    question: 'Do you support on-premise or in-region hosting?',
    answer:
      'Enterprise deployments support VPC and in-region hosting with data-residency controls to meet central-bank and data-protection requirements.',
  },
]
