import { useState } from 'react'
import { ArrowLeft, Check, ChevronRight, Crown, Pencil } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BrowserBar } from '../components/templates/TemplatePreview'
import { DeviceToggle } from '../components/templates/DeviceToggle'
import { TemplateGrid } from '../components/templates/TemplateGrid'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { SectionHeading } from '../components/ui/SectionHeading'
import { categoryById } from '../data/categories'
import { templateBySlug, templates } from '../data/templates'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { designStore } from '../lib/designStore'
import { ScaledPage } from '../renderer/ScaledPage'
import { SiteRenderer } from '../renderer/SiteRenderer'
import { DEVICE_WIDTH, type Device } from '../types/site'

export default function TemplateDetailsPage() {
  const { slug } = useParams()
  const template = templateBySlug(slug)
  const navigate = useNavigate()
  const [device, setDevice] = useState<Device>('desktop')
  useDocumentTitle(template?.name)

  if (!template) {
    return (
      <div className="container-page py-20">
        <EmptyState icon={<ArrowLeft size={26} />} title="Template not found" description="This template may have been moved or removed." action={<Button to="/templates">Browse templates</Button>} />
      </div>
    )
  }

  const category = categoryById[template.category]
  const related = templates.filter((t) => t.category === template.category && t.id !== template.id)
  const more = related.length >= 3 ? related : [...related, ...templates.filter((t) => t.category !== template.category)].slice(0, 4)

  const useTemplate = () => {
    const design = designStore.createFromTemplate(template)
    navigate(`/editor/${design.id}`)
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/templates" className="hover:text-slate-900">Templates</Link>
        <ChevronRight size={14} />
        <Link to={`/templates?category=${category.id}`} className="hover:text-slate-900">{category.label}</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-slate-900">{template.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* Preview */}
        <section aria-label="Template preview" className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500">Full-page preview</p>
            <DeviceToggle value={device} onChange={setDevice} />
          </div>
          <div className="rounded-3xl bg-slate-100 p-3 sm:p-6">
            <div className="mx-auto overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-slate-900/5 transition-[max-width] duration-300" style={{ maxWidth: DEVICE_WIDTH[device] }}>
              <BrowserBar label={`${template.slug}.templates.site`} />
              <div className="max-h-[78vh] overflow-y-auto overscroll-contain" tabIndex={0} role="region" aria-label="Scrollable template preview">
                <div className="pointer-events-none select-none">
                  <ScaledPage key={device} width={DEVICE_WIDTH[device]}>
                    <SiteRenderer document={template.document} device={device} />
                  </ScaledPage>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">Sample content. Everything is editable after you choose this template.</p>
        </section>

        {/* Info */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{category.label}</Badge>
            {template.price === 'premium' ? <Badge tone="premium"><Crown size={12} /> Premium</Badge> : <Badge tone="free">Free</Badge>}
            {template.isNew && <Badge tone="new">New</Badge>}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{template.name}</h1>
          <p className="mt-1 text-lg font-medium text-slate-600">{template.tagline}</p>
          <p className="mt-4 leading-relaxed text-slate-600">{template.description}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button size="lg" onClick={useTemplate} leftIcon={<Pencil size={18} />} className="flex-1">Use this template</Button>
            <Button to="/templates" size="lg" variant="secondary" leftIcon={<ArrowLeft size={18} />}>All templates</Button>
          </div>

          <h2 className="mt-9 text-sm font-semibold uppercase tracking-wider text-slate-900">What’s included</h2>
          <ul className="mt-3 space-y-2.5">
            {template.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check size={13} strokeWidth={3} /></span>
                {h}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-900">Pages</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {template.includedPages.map((p) => <span key={p} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700">{p}</span>)}
          </div>

          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-900">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {template.tags.map((t) => (
              <Link key={t} to={`/templates?q=${encodeURIComponent(t)}`} className="rounded-full px-3 py-1 text-sm text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">#{t}</Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">Designed by {template.author}</p>
        </aside>
      </div>

      <section className="mt-20">
        <SectionHeading title={related.length ? `More ${category.label.toLowerCase()} templates` : 'You might also like'} />
        <div className="mt-8"><TemplateGrid templates={more.slice(0, 4)} /></div>
      </section>
    </div>
  )
}
