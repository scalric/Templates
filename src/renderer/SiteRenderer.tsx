import { cn } from '../lib/cn'
import type { Device, Section, SiteDocument } from '../types/site'
import { SECTION_LABEL } from '../types/site'
import { SiteContext } from './context'
import { renderSection } from './sections'

interface Props {
  document: SiteDocument
  pageIndex?: number
  device?: Device
  /** Provide these to make sections selectable (editor mode). */
  selectedId?: string | null
  onSelect?: (id: string) => void
  /** Set for thumbnails so their images stay lazy-loaded. */
  preview?: boolean
}

/**
 * Pure renderer: SiteDocument in, website out. Used by template previews today
 * and by the editor canvas tomorrow (via selectedId / onSelect).
 */
export function SiteRenderer({ document, pageIndex = 0, device = 'desktop', selectedId, onSelect, preview = false }: Props) {
  const { theme, pages } = document
  const page = pages[pageIndex] ?? pages[0]
  const sections = page?.sections ?? []
  const interactive = Boolean(onSelect)
  const renderFrame = (section: Section) => {
    if (!interactive) return <div key={section.id} className="min-w-0">{renderSection(section)}</div>
    const selected = section.id === selectedId
    return (
      <div
        key={section.id}
        data-section-id={section.id}
        onClick={() => onSelect?.(section.id)}
        className={cn('group relative min-w-0 cursor-pointer outline-offset-[-3px]', selected ? 'outline outline-[3px] outline-brand-500' : 'hover:outline hover:outline-2 hover:outline-brand-300')}
      >
        <span className={cn('absolute left-0 top-0 z-10 rounded-br-md bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white', selected ? 'block' : 'hidden group-hover:block')}>
          {SECTION_LABEL[section.type]}
        </span>
        {renderSection(section)}
      </div>
    )
  }

  return (
    <SiteContext.Provider value={{ theme, device, preview }}>
      <div className="font-sans antialiased" style={{ background: theme.background, color: theme.text }}>
        {sections.map((section, index) => {
          const previous = sections[index - 1]
          if (
            section.type === 'testimonials' &&
            section.props.layout === 'quote-card' &&
            previous?.type === 'showcase' &&
            previous.props.layout === 'pricing'
          ) return null

          const next = sections[index + 1]
          if (
            section.type === 'showcase' &&
            section.props.layout === 'pricing' &&
            next?.type === 'testimonials' &&
            next.props.layout === 'quote-card'
          ) {
            return (
              <div
                key={section.id}
                className={cn('grid', device === 'desktop' ? 'grid-cols-2 divide-x divide-slate-200' : 'grid-cols-1 divide-y divide-slate-200')}
              >
                {renderFrame(section)}
                {renderFrame(next)}
              </div>
            )
          }

          return renderFrame(section)
        })}
      </div>
    </SiteContext.Provider>
  )
}
