import { cn } from '../lib/cn'
import type { Device, SiteDocument } from '../types/site'
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
  const interactive = Boolean(onSelect)

  return (
    <SiteContext.Provider value={{ theme, device, preview }}>
      <div className="font-sans antialiased" style={{ background: theme.background, color: theme.text }}>
        {page?.sections.map((section) => {
          if (!interactive) return <div key={section.id}>{renderSection(section)}</div>
          const selected = section.id === selectedId
          return (
            <div
              key={section.id}
              data-section-id={section.id}
              onClick={() => onSelect?.(section.id)}
              className={cn('group relative cursor-pointer outline-offset-[-3px]', selected ? 'outline outline-[3px] outline-brand-500' : 'hover:outline hover:outline-2 hover:outline-brand-300')}
            >
              <span className={cn('absolute left-0 top-0 z-10 rounded-br-md bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white', selected ? 'block' : 'hidden group-hover:block')}>
                {SECTION_LABEL[section.type]}
              </span>
              {renderSection(section)}
            </div>
          )
        })}
      </div>
    </SiteContext.Provider>
  )
}
