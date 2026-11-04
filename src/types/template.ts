import type { IconName } from './icons'
import type { SiteDocument } from './site'

export type CategoryId =
  | 'dental'
  | 'hospital'
  | 'restaurant'
  | 'bakery'
  | 'saas'
  | 'portfolio'
  | 'ecommerce'
  | 'yoga'
  | 'sports'
  | 'creative'
  | 'fitness'
  | 'beauty'
  | 'clinics'
  | 'professional'
  | 'property'
  | 'events'
  | 'education'
  | 'nonprofit'

export interface Category {
  id: CategoryId
  label: string
  description: string
  icon: IconName
  /** Tailwind classes for the icon tile. */
  tint: string
}

export interface Template {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  category: CategoryId
  tags: string[]
  price: 'free' | 'premium'
  popularity: number
  createdAt: string
  isNew?: boolean
  isFeatured?: boolean
  author: string
  highlights: string[]
  /** Page names shipped with the template (display metadata). */
  includedPages: string[]
  document: SiteDocument
}
