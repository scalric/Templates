import { ArrowUpRight, Crown, Pencil } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { categoryById } from '../../data/categories'
import { designStore } from '../../lib/designStore'
import type { Template } from '../../types/template'
import { Badge } from '../ui/Badge'
import { TemplatePreview } from './TemplatePreview'

interface Props {
  template: Template
  /** Small note shown beside the category, e.g. "Added 5 Oct". */
  subtitle?: string
}

export function TemplateCard({ template, subtitle }: Props) {
  const navigate = useNavigate()
  const category = categoryById[template.category]
  const detailsPath = `/templates/${template.slug}`

  const customize = () => {
    const design = designStore.createFromTemplate(template)
    navigate(`/editor/${design.id}`)
  }

  return (
    <article className="group flex flex-col">
      <Link
        to={detailsPath}
        aria-label={`${template.name} — ${category.label} template`}
        className="relative block overflow-hidden shadow-[0_24px_48px_-24px_rgba(11,63,219,0.45)] transition duration-300 ease-out group-hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
      >
        <TemplatePreview template={template} bare chrome={false} cropAspect={1} />
        {template.isNew && <Badge tone="new" className="absolute left-4 top-4 shadow">New</Badge>}
        <span className="absolute right-4 top-4">
          {template.price === 'premium' ? (
            <Badge tone="premium"><Crown size={12} /> Premium</Badge>
          ) : (
            <Badge tone="free">Free</Badge>
          )}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-600 shadow-[0_10px_24px_-8px_rgba(15,23,42,0.4)] transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white"
        >
          <ArrowUpRight size={24} strokeWidth={1.75} />
        </span>
      </Link>

      <div className="mt-6 flex flex-1 flex-col px-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-brand-700">
            {category.label}
          </span>
          {subtitle && <span className="text-xs text-ink-soft">{subtitle}</span>}
        </div>

        <h3 className="mt-5 min-h-[4.2rem] text-[28px] font-medium leading-[1.2] tracking-tight text-ink">
          <Link to={detailsPath} className="hover:underline">{template.name}</Link>
        </h3>
        <p className="mt-3 min-h-[3.6rem] line-clamp-2 text-lg leading-relaxed text-ink-soft">{template.tagline}</p>

        <div className="mt-auto flex items-center gap-5 pt-5 text-sm font-semibold">
          <button type="button" onClick={customize} className="inline-flex items-center gap-1.5 rounded text-ink hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600">
            <Pencil size={15} /> Customize
          </button>
          <Link
            to={`/templates/${template.slug}/full`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded text-brand-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
          >
            Preview <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
