import type { Design } from '../types/design'
import type { SiteDocument } from '../types/site'
import type { Template } from '../types/template'
import { templateById } from '../data/templates'

/**
 * Tiny localStorage-backed store compatible with useSyncExternalStore.
 * Swap the read/write functions for API calls when a backend exists —
 * the rest of the app only talks to `designStore`.
 */
const KEY = 'sitecraft.designs.v1'

// Template images were converted from PNG/JPEG to WebP. Saved designs copy those
// URLs, so rewrite them here. Files that were not converted are left alone.
const KEPT_IMAGE_URLS = new Set(['/images/riptide/hero.jpg', '/images/yoga/studio-hero.jpg'])

function migrateImageUrls(raw: string): string {
  return raw.replace(/\/images\/[\w/-]+\.(?:jpe?g|png)/g, (url) => (KEPT_IMAGE_URLS.has(url) ? url : url.replace(/\.(?:jpe?g|png)$/, '.webp')))
}

let cache: Design[] | null = null
const listeners = new Set<() => void>()

function read(): Design[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY) ?? ''
    const migrated = migrateImageUrls(raw)
    if (migrated !== raw) {
      try {
        localStorage.setItem(KEY, migrated)
      } catch {
        /* storage full or unavailable — the migration reruns on next load */
      }
    }
    const parsed: unknown = migrated ? JSON.parse(migrated) : []
    const stored = Array.isArray(parsed) ? (parsed as Design[]) : []
    cache = stored.map(upgradeDesign)
    if (cache.some((design, index) => design !== stored[index])) {
      try {
        localStorage.setItem(KEY, JSON.stringify(cache))
      } catch {
        /* storage full or unavailable — keep the in-memory copy */
      }
    }
  } catch {
    cache = []
  }
  return cache
}

function write(next: Design[]): void {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* storage full or unavailable — keep the in-memory copy */
  }
  listeners.forEach((l) => l())
}

if (typeof window !== 'undefined') {
  // Keep tabs in sync.
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      cache = null
      listeners.forEach((l) => l())
    }
  })
}

const newId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `d_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

const clone = (doc: SiteDocument): SiteDocument => JSON.parse(JSON.stringify(doc)) as SiteDocument

/**
 * Saved designs keep a full copy of their document, so older saves can hold
 * props in shapes that have since changed. Bring those up to the current shape.
 */
function migrateDocument(design: Design): Design {
  let changed = false
  const pages = design.document.pages.map((page) => ({
    ...page,
    sections: page.sections.map((section) => {
      // Hero and CTA handwriting used to be one "/"-separated string.
      if (section.type === 'hero' && typeof (section.props.handwritten as unknown) === 'string') {
        changed = true
        return { ...section, props: { ...section.props, handwritten: (section.props.handwritten as unknown as string).split('/') } }
      }
      if (section.type === 'cta' && typeof (section.props.handwritten as unknown) === 'string') {
        changed = true
        return { ...section, props: { ...section.props, handwritten: (section.props.handwritten as unknown as string).split('/') } }
      }
      // Footer hours used to be "label|value" strings inside links.
      if (section.type === 'footer' && section.props.columns.some((column) => column.links.some((link) => link.includes('|')))) {
        changed = true
        return {
          ...section,
          props: {
            ...section.props,
            columns: section.props.columns.map((column) => {
              const rows = column.links
                .filter((link) => link.includes('|'))
                .map((link) => {
                  const [label, value] = link.split('|')
                  return { label, value }
                })
              return rows.length > 0
                ? { ...column, links: column.links.filter((link) => !link.includes('|')), rows: [...(column.rows ?? []), ...rows] }
                : column
            }),
          },
        }
      }
      return section
    }),
  }))
  return changed ? { ...design, document: { ...design.document, pages } } : design
}

export function upgradeDesign(saved: Design): Design {
  const design = migrateDocument(saved)
  if (design.templateId !== 'stillwater-yoga') return design
  const template = templateById(design.templateId)
  const sourcePage = template?.document.pages[0]
  if (!sourcePage) return design

  const storyEnhancements = sourcePage.sections.find((section) => section.type === 'story')
  const practiceEnhancements = sourcePage.sections.find(
    (section) => section.type === 'showcase' && section.props.title === 'Find your practice',
  )
  const privateTrainingEnhancement = practiceEnhancements?.type === 'showcase'
    ? practiceEnhancements.props.items.find((item) => item.title === 'Private training')
    : undefined
  const footerEnhancements = sourcePage.sections.find((section) => section.type === 'footer')
  const theme = design.document.theme.primary === '#52745c'
    ? { ...design.document.theme, primary: template.document.theme.primary }
    : design.document.theme
  let changed = theme !== design.document.theme
  const pages = design.document.pages.map((page) => ({
    ...page,
    sections: page.sections.map((section) => {
      if (section.type === 'story' && storyEnhancements?.type === 'story' && !section.props.stats && storyEnhancements.props.stats) {
        changed = true
        return { ...section, props: { ...section.props, stats: storyEnhancements.props.stats } }
      }

      if (
        section.type === 'showcase' &&
        section.props.title === 'Find your practice' &&
        practiceEnhancements?.type === 'showcase' &&
        (
          !section.props.cardStyle ||
          !section.props.buttonLabel ||
          section.props.items.some((item) => item.title === 'Gentle flow' || item.imageUrl?.endsWith('/gentle-flow.webp'))
        )
      ) {
        changed = true
        return {
          ...section,
          props: {
            ...section.props,
            cardStyle: section.props.cardStyle ?? practiceEnhancements.props.cardStyle,
            buttonLabel: section.props.buttonLabel ?? practiceEnhancements.props.buttonLabel,
            items: section.props.items.map((item) => (
              item.title === 'Gentle flow' || item.imageUrl?.endsWith('/gentle-flow.webp')
            ) && privateTrainingEnhancement
              ? {
                  ...item,
                  title: privateTrainingEnhancement.title,
                  imageUrl: privateTrainingEnhancement.imageUrl,
                  imagePosition: privateTrainingEnhancement.imagePosition,
                }
              : item),
          },
        }
      }

      if (section.type === 'footer' && footerEnhancements?.type === 'footer' && section.props.variant !== 'studio') {
        changed = true
        return {
          ...section,
          props: {
            ...section.props,
            brandIcon: section.props.brandIcon ?? footerEnhancements.props.brandIcon,
            variant: footerEnhancements.props.variant,
            columns: footerEnhancements.props.columns,
            socialLinks: section.props.socialLinks ?? footerEnhancements.props.socialLinks,
            newsletter: section.props.newsletter ?? footerEnhancements.props.newsletter,
            legalLinks: section.props.legalLinks ?? footerEnhancements.props.legalLinks,
          },
        }
      }

      return section
    }),
  }))

  return changed ? { ...design, document: { ...design.document, theme, pages } } : design
}

export const designStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getAll: read,
  get: (id: string): Design | undefined => read().find((d) => d.id === id),

  createFromTemplate(template: Template): Design {
    const now = new Date().toISOString()
    const design: Design = {
      id: newId(),
      name: `${template.name} — my site`,
      templateId: template.id,
      createdAt: now,
      updatedAt: now,
      document: clone(template.document),
    }
    write([design, ...read()])
    return design
  },

  update(id: string, patch: Partial<Pick<Design, 'name' | 'document' | 'publishedAt'>>): void {
    write(read().map((d) => (d.id === id ? { ...d, ...patch, updatedAt: new Date().toISOString() } : d)))
  },

  duplicate(id: string): Design | undefined {
    const source = read().find((d) => d.id === id)
    if (!source) return undefined
    const now = new Date().toISOString()
    const copy: Design = { ...source, id: newId(), name: `${source.name} (copy)`, createdAt: now, updatedAt: now, document: clone(source.document) }
    write([copy, ...read()])
    return copy
  },

  remove(id: string): void {
    write(read().filter((d) => d.id !== id))
  },
}
