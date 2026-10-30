import { useMemo, type ReactNode } from 'react'
import type { Template } from '../../types/template'
import { SectionHeading } from '../ui/SectionHeading'
import { TemplateCard } from './TemplateCard'

const formatAdded = (iso: string) =>
  `Added ${new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`

/** Editor's picks, trending and fresh designs for one category, shown above its full list. */
export function CategoryHighlights({ templates }: { templates: Template[] }) {
  const { picks, trending, fresh } = useMemo(() => {
    const byPopularity = [...templates].sort((a, b) => b.popularity - a.popularity)
    return {
      picks: byPopularity.filter((t) => t.isFeatured).slice(0, 3),
      trending: byPopularity.slice(0, 4),
      fresh: [...templates].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 4),
    }
  }, [templates])

  if (templates.length === 0) return null

  return (
    <div className="mt-12 space-y-16">
      {picks.length > 0 && (
        <Highlight id="category-picks" eyebrow="Editor’s picks" title="Featured templates">
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((t) => <TemplateCard key={t.id} template={t} />)}
          </div>
        </Highlight>
      )}
      <Highlight id="category-trending" eyebrow="Trending now" title="Popular templates">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((t) => <TemplateCard key={t.id} template={t} />)}
        </div>
      </Highlight>
      <Highlight id="category-fresh" eyebrow="Fresh designs" title="Recently added">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((t) => <TemplateCard key={t.id} template={t} subtitle={formatAdded(t.createdAt)} />)}
        </div>
      </Highlight>
    </div>
  )
}

function Highlight({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`}>
      <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
      <div className="mt-8">{children}</div>
    </section>
  )
}
