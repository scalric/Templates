import type { ReactNode } from 'react'
import { Copy, FolderOpen, Pencil, Plus, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { BrowserBar } from '../components/templates/TemplatePreview'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorBoundary } from '../components/ui/ErrorBoundary'
import { templateById } from '../data/templates'
import { useDesigns } from '../hooks/useDesigns'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { designStore } from '../lib/designStore'
import { formatRelative } from '../lib/format'
import { ScaledPage } from '../renderer/ScaledPage'
import { SiteRenderer } from '../renderer/SiteRenderer'
import { DEVICE_WIDTH } from '../types/site'

export default function MyDesignsPage() {
  useDocumentTitle('My designs')
  const designs = useDesigns()
  const navigate = useNavigate()

  const remove = (id: string, name: string) => {
    if (window.confirm(`Delete “${name}”? This cannot be undone.`)) designStore.remove(id)
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">My designs</h1>
          <p className="mt-2 text-lg text-slate-600">Websites you have started. Saved in this browser.</p>
        </div>
        <Button to="/templates" leftIcon={<Plus size={18} />}>New design</Button>
      </header>

      <div className="mt-10">
        {designs.length === 0 ? (
          <EmptyState
            icon={<FolderOpen size={26} />}
            title="No designs yet"
            description="Pick a template and press “Use this template” — your copy will appear here."
            action={<Button to="/templates">Browse templates</Button>}
          />
        ) : (
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((d) => {
              const source = templateById(d.templateId)
              return (
                <li key={d.id} className="group">
                  <Link to={`/editor/${d.id}`} aria-label={`Open ${d.name}`} className="block overflow-hidden rounded-2xl shadow-soft ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div aria-hidden="true" className="pointer-events-none select-none bg-white">
                      <BrowserBar label="draft.templates.site" />
                      <ErrorBoundary fallback={<PreviewUnavailable />}>
                        <ScaledPage width={DEVICE_WIDTH.desktop} cropAspect={0.78}>
                          <SiteRenderer document={d.document} preview />
                        </ScaledPage>
                      </ErrorBoundary>
                    </div>
                  </Link>
                  <div className="mt-4 flex items-start justify-between gap-3 px-1">
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-slate-900">{d.name}</h2>
                      <p className="mt-0.5 truncate text-sm text-slate-500">
                        Edited {formatRelative(d.updatedAt)}{source ? ` · ${source.name}` : ''}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <IconAction label="Edit" onClick={() => navigate(`/editor/${d.id}`)}><Pencil size={16} /></IconAction>
                      <IconAction label="Duplicate" onClick={() => designStore.duplicate(d.id)}><Copy size={16} /></IconAction>
                      <IconAction label="Delete" danger onClick={() => remove(d.id, d.name)}><Trash2 size={16} /></IconAction>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function PreviewUnavailable() {
  return (
    <div className="flex h-40 items-center justify-center px-6 text-center text-sm text-slate-500">
      Preview unavailable. Open the design to review it.
    </div>
  )
}

function IconAction({ label, onClick, danger, children }: { label: string; onClick: () => void; danger?: boolean; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} title={label} aria-label={label} className={`rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 ${danger ? 'hover:text-rose-600' : 'hover:text-slate-900'}`}>
      {children}
    </button>
  )
}
