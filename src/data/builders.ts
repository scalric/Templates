import type { Template } from '../types/template'
import type {
  CtaProps, FeaturesProps, FooterProps, HeroProps, ImageBandProps, NavbarProps, Section, SectionDraft, StoryProps,
  ShowcaseProps, SitePage, SiteTheme, SiteDocument, TestimonialsProps,
} from '../types/site'

export const navbar = (props: NavbarProps): SectionDraft => ({ type: 'navbar', props })
export const hero = (props: HeroProps): SectionDraft => ({ type: 'hero', props })
export const story = (props: StoryProps): SectionDraft => ({ type: 'story', props })
export const features = (props: FeaturesProps): SectionDraft => ({ type: 'features', props })
export const showcase = (props: ShowcaseProps): SectionDraft => ({ type: 'showcase', props })
export const testimonials = (props: TestimonialsProps): SectionDraft => ({ type: 'testimonials', props })
export const cta = (props: CtaProps): SectionDraft => ({ type: 'cta', props })
export const footer = (props: FooterProps): SectionDraft => ({ type: 'footer', props })
export const image = (props: ImageBandProps): SectionDraft => ({ type: 'image', props })

/** Assigns stable ids and wraps drafts into a single-page SiteDocument. */
export function buildDocument(slug: string, theme: SiteTheme, drafts: SectionDraft[]): SiteDocument {
  const sections = drafts.map((d, i) => ({ ...d, id: `${slug}-s${i + 1}-${d.type}` }) as Section)
  const page: SitePage = { id: `${slug}-home`, name: 'Home', path: '/', sections }
  return { version: 1, theme, pages: [page] }
}


type TemplateInput = Omit<Template, 'id' | 'document'> & {
  theme: SiteTheme
  sections: SectionDraft[]
}

/** Authoring helper: slug doubles as id, document is generated from sections. */
export function defineTemplate({ theme, sections, ...meta }: TemplateInput): Template {
  return { ...meta, id: meta.slug, document: buildDocument(meta.slug, theme, sections) }
}
