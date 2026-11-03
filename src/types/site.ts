/**
 * Site document model.
 *
 * A website is described as plain, serialisable JSON:
 *   SiteDocument → pages → sections → props
 *
 * Both the template previews and the (future) visual editor render from this
 * same model, so editing a site = producing a new SiteDocument.
 */
import type { IconName } from './icons'

export interface SiteTheme {
  primary: string
  /** Text colour used on top of `primary`. */
  primaryText: string
  /** Soft tint used for surfaces and image art. */
  secondary: string
  background: string
  text: string
  muted: string
  radius: 'sharp' | 'soft' | 'round'
  headingFont: 'serif' | 'sans'
}

export interface NavbarProps {
  brand: string
  icon: IconName
  links: string[]
  cta: string
  layout?: 'default' | 'bakery' | 'academy' | 'boutique' | 'elevate' | 'aesthetic' | 'athletic' | 'nexora'
  announcement?: string
  showSearch?: boolean
  subtitle?: string
  phone?: string
}

export interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta?: string
  secondaryCtaStyle?: 'light' | 'outline'
  layout: 'split' | 'centered' | 'overlay' | 'bakery' | 'academy' | 'boutique' | 'elevate' | 'aesthetic' | 'athletic' | 'nexora'
  /** Circular stamp text on the photo (aesthetic layout). Omit to hide the stamp. */
  sealText?: string
  /** Accent word in the title (nexora layout). */
  highlight?: string
  /** Search fields shown on a card under the hero (nexora layout). */
  searchFields?: { label: string; placeholder: string }[]
  /** Decorative handwritten note beside the hero photo (bakery layout). */
  handwritten?: string[]
  mobileHeroHeight?: 'standard' | 'tall'
  imageLabel: string
  imageIcon: IconName
  /** Optional real photo. Falls back to generated art when missing or broken. */
  imageUrl?: string
  imagePosition?: string
  imageAspect?: 'portrait' | 'landscape'
  stats?: { value: string; label: string }[]
  benefits?: { icon: IconName; title: string; description: string }[]
}

export interface FeaturesProps {
  title: string
  layout?: 'cards' | 'strip' | 'bakery' | 'stats' | 'logos' | 'elevate' | 'process' | 'steps' | 'player'
  eyebrow?: string
  subtitle?: string
  items: { icon: IconName; title: string; description: string }[]
  images?: { imageUrl: string; label: string; imagePosition?: string }[]
  /** Call-to-action shown in the steps and player layouts. */
  buttonLabel?: string
}

export interface ImageBandProps {
  imageUrl: string
  label: string
  imagePosition?: string
}

export interface StoryProps {
  layout?: 'collage' | 'split' | 'bakery' | 'elevate' | 'about' | 'athletic' | 'committed' | 'wellness'
  imageSide?: 'left' | 'right'
  eyebrow: string
  title: string
  description: string
  images: { imageUrl: string; label: string; imagePosition?: string }[]
  quote: string
  stats?: { icon: IconName; value: string; label: string }[]
  highlights?: string[]
  buttonLabel?: string
  /** Second paragraph under the description (athletic layout). */
  details?: string
  /** Large number with a label, e.g. years of experience (athletic layout). */
  milestone?: { value: string; label: string }
  /** Word in the title to show in the accent colour (athletic layout). */
  highlight?: string
}

export interface ShowcaseItem {
  title: string
  description?: string
  price?: string
  tag?: string
  linkLabel?: string
  icon?: IconName
  imageUrl?: string
  imagePosition?: string
  /** Photo proportions, e.g. "1514 / 1039". Overrides the card image aspect. */
  aspect?: string
}

export interface ShowcaseProps {
  title: string
  subtitle?: string
  variant: 'cards' | 'menu' | 'products'
  tone?: 'default' | 'dark'
  categoryImageUrl?: string
  imageAspect?: 'landscape' | 'portrait'
  layout?: 'default' | 'journal' | 'gallery' | 'categories' | 'favorites' | 'articles' | 'programs' | 'arrivals' | 'mosaic' | 'tiles' | 'elevate' | 'team' | 'blog' | 'signature' | 'catalog' | 'categories' | 'category-grid' | 'news'
  eyebrow?: string
  viewAllLabel?: string
  /** Category tabs shown above a product grid. */
  tabs?: string[]
  cardStyle?: 'default' | 'programs'
  buttonLabel?: string
  items: ShowcaseItem[]
}

export interface TestimonialsProps {
  title: string
  layout?: 'cards' | 'editorial' | 'carousel' | 'stories' | 'portraits'
  eyebrow?: string
  items: { quote: string; name: string; role: string; imageUrl?: string }[]
}

export interface CtaProps {
  title: string
  subtitle?: string
  button: string
  tone: 'primary' | 'soft'
  layout?: 'default' | 'banner' | 'feature' | 'partner'
  imageUrl?: string
  imagePosition?: string
  eyebrow?: string
  handwritten?: string[]
}

export interface FooterProps {
  brand: string
  tagline: string
  brandIcon?: IconName
  variant?: 'default' | 'studio' | 'dark' | 'bakery' | 'boutique' | 'elevate'
  columns: {
    title: string
    links: string[]
    /** Label/value pairs, e.g. opening hours. */
    rows?: { label: string; value: string }[]
    details?: { icon: IconName; text: string }[]
  }[]
  socialLinks?: { platform: 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'pinterest'; label: string }[]
  newsletter?: { placeholder: string; buttonLabel: string }
  copyright: string
  legalLinks?: string[]
}

export interface SectionPropsMap {
  navbar: NavbarProps
  hero: HeroProps
  story: StoryProps
  features: FeaturesProps
  showcase: ShowcaseProps
  testimonials: TestimonialsProps
  cta: CtaProps
  footer: FooterProps
  image: ImageBandProps
}

export type SectionType = keyof SectionPropsMap

/** A section without its id — what template authors write. */
export type SectionDraft = {
  [K in SectionType]: { type: K; props: SectionPropsMap[K] }
}[SectionType]

/** A section as stored in a document. */
export type Section = SectionDraft & { id: string }

export interface SitePage {
  id: string
  name: string
  path: string
  sections: Section[]
}

export interface SiteDocument {
  version: 1
  theme: SiteTheme
  pages: SitePage[]
}

export type Device = 'desktop' | 'tablet' | 'mobile'

export const DEVICE_WIDTH: Record<Device, number> = {
  desktop: 1280,
  tablet: 820,
  mobile: 390,
}

export const SECTION_LABEL: Record<SectionType, string> = {
  navbar: 'Navigation',
  hero: 'Hero',
  story: 'Our story',
  features: 'Features',
  showcase: 'Showcase',
  testimonials: 'Testimonials',
  cta: 'Call to action',
  footer: 'Footer',
  image: 'Image',
}
