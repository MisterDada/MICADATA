/**
 * MiCA-DATA — Central domain types
 * Single source of truth for products, pricing, company content.
 */

import type { LucideIcon } from 'lucide-react'

export type RoutePath = '/' | '/products' | '/pricing' | '/about'

export interface NavLink {
  label: string
  href: RoutePath
  description?: string
}

export interface ProductPillar {
  id: string
  badge: string
  title: string
  tagline: string
  description: string
  iconName: string
  capabilities: string[]
  metric?: { value: string; label: string }
}

export interface ProductWithIcon extends Omit<ProductPillar, 'iconName'> {
  icon: LucideIcon
}

export interface PricingTier {
  id: string
  name: string
  tagline: string
  audience: string
  monthlyPrice: string
  annualPrice: string
  /** Unit / transactional price shown in Pay-Per-Query mode, e.g. "$1.20" */
  payPerQueryPrice: string
  /** Price unit suffix, e.g. "/ query" or "/ mo" */
  payPerQueryUnit: string
  /** Subscription price shown in Monthly mode, e.g. "$249" */
  subscriptionPrice: string
  subscriptionUnit: string
  /** Short metering note, e.g. "incl. 5,000 queries/mo · $0.45 overage" */
  meteringNote: string
  cta: string
  highlighted?: boolean
  features: string[]
  limits: string[]
}

export interface TrustSignal {
  value: string
  label: string
  sublabel?: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  initials: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
}

export interface CompanyValue {
  title: string
  description: string
  icon: LucideIcon
}

export interface Faq {
  question: string
  answer: string
}

export interface MotionPreset {
  hidden: { opacity: number; y: number }
  visible: { opacity: number; y: number }
}
