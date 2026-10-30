import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Eye, Info, Layers, Wand2, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { DeviceToggle } from '../components/templates/DeviceToggle'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorBoundary } from '../components/ui/ErrorBoundary'
import { useEditorState } from '../editor/useEditorState'
import { useDesign } from '../hooks/useDesigns'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { designStore } from '../lib/designStore'
import { cn } from '../lib/cn'
import { ScaledPage } from '../renderer/ScaledPage'
import { SiteRenderer } from '../renderer/SiteRenderer'
import { DEVICE_WIDTH, SECTION_LABEL } from '../types/site'
import type { Section } from '../types/site'
import type { Design } from '../types/design'

export default function EditorPage() {
  const { designId } = useParams()
  const design = useDesign(designId)
  useDocumentTitle(design ? `Editing ${design.name}` : 'Editor')

  if (!design) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <EmptyState
          icon={<Layers size={26} />}
          title="Design not found"
          description="This design doesn’t exist in this browser. Start from a template or open one of your saved designs."
          action={<div className="flex gap-3"><Button to="/templates">Browse templates</Button><Button to="/my-designs" variant="secondary">My designs</Button></div>}
        />
      </div>
    )
  }
  return <EditorShell key={design.id} design={design} />
}

/**
 * Editor shell — layout and wiring only.
 * Wide screens: sections (left), canvas (centre), inspector (right).
 * Narrower screens: sections become a chip bar above the canvas and the
 * inspector slides under the canvas, so every section stays editable.
 */
function EditorShell({ design }: { design: Design }) {
  const { device, setDevice, page, selectedId, setSelectedId, selected } = useEditorState(design)
  const [name, setName] = useState(design.name)
  const [previewMode, setPreviewMode] = useState(false)
  const [publishUrl, setPublishUrl] = useState<string | null>(null)

  // Debounced autosave of the name; document edits will use the same path.
  useEffect(() => {
    if (name === design.name) return
    const t = window.setTimeout(() => designStore.update(design.id, { name: name.trim() || 'Untitled design' }), 400)
    return () => window.clearTimeout(t)
  }, [name, design.id, design.name])

  const updateSelectedProp = (path: (string | number)[], value: unknown) => {
    if (!selectedId) return
    const document = {
      ...design.document,
      pages: design.document.pages.map((currentPage) => ({
        ...currentPage,
        sections: currentPage.sections.map((section) => (
          section.id === selectedId
            ? updateSectionProps(section, path, value)
            : section
        )),
      })),
    }
    designStore.update(design.id, { document })
  }

  const publish = () => {
    designStore.update(design.id, { publishedAt: new Date().toISOString() })
    setPublishUrl(`${window.location.origin}/site/${design.id}`)
  }

  const sectionPicker = (variant: 'list' | 'chips') => (
    <SectionPicker sections={page.sections} selectedId={selectedId} onSelect={setSelectedId} variant={variant} />
  )

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      {/* Top bar */}
      <header className="flex min-h-[56px] shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-slate-200 bg-white px-3 py-2 sm:h-14 sm:flex-nowrap sm:py-0 sm:px-4">
        <Link to="/my-designs" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100" aria-label="Back to my designs">
          <ArrowLeft size={18} /><span className="hidden sm:inline">My designs</span>
        </Link>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Design name"
          className="min-w-0 max-w-xs flex-1 rounded-lg border-0 bg-transparent px-2 py-1.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-600"
        />
        <span className="hidden items-center gap-1 text-xs text-slate-500 sm:inline-flex"><Check size={14} className="text-emerald-600" /> Saved</span>
        <div className="ml-auto flex items-center gap-2">
          <DeviceToggle value={device} onChange={setDevice} />
          <Button size="sm" variant="secondary" leftIcon={previewMode ? <X size={16} /> : <Eye size={16} />} onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button size="sm" onClick={publish}>{design.publishedAt ? 'Update site' : 'Publish'}</Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">
          {!previewMode && (
            <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex" aria-label="Sections">
              <h2 className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"><Layers size={14} /> Sections</h2>
              {sectionPicker('list')}
            </aside>
          )}
          {!previewMode && (
            <nav aria-label="Sections" className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-2 lg:hidden">
              {sectionPicker('chips')}
            </nav>
          )}

          {/* Canvas */}
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-6" aria-label="Canvas">
            {publishUrl && (
              <div className="mx-auto mb-4 flex max-w-[1000px] flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 ring-1 ring-emerald-200">
                <span>Published locally. Anyone with this URL can view the site in this browser.</span>
                <a href={publishUrl} target="_blank" rel="noreferrer" className="font-semibold underline">Open published site</a>
              </div>
            )}
            {!previewMode && <p className="mb-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 ring-1 ring-amber-200 xl:hidden">
              <Info size={16} className="mt-0.5 shrink-0" /> Tap a section to edit it. Its fields appear below the page.
            </p>}
            <div className="mx-auto min-w-0 transition-[max-width] duration-300" style={{ maxWidth: DEVICE_WIDTH[device] }}>
              <div className="overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-slate-900/10">
                <ErrorBoundary fallback={<CanvasUnavailable />}>
                  <ScaledPage key={device} width={DEVICE_WIDTH[device]}>
                    <SiteRenderer
                      document={design.document}
                      device={device}
                      selectedId={previewMode ? undefined : selectedId}
                      onSelect={previewMode ? undefined : setSelectedId}
                    />
                  </ScaledPage>
                </ErrorBoundary>
              </div>
            </div>
          </main>
        </div>

        {/* Inspector: right column on wide screens, under the canvas on narrower ones. */}
        {!previewMode && (
          <aside
            className={cn(
              'flex w-full shrink-0 flex-col overflow-hidden border-t border-slate-200 bg-white max-h-[45vh] xl:max-h-none xl:w-80 xl:border-l xl:border-t-0',
              !selected && 'hidden xl:flex',
            )}
            aria-label="Inspector"
          >
            <h2 className="border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Inspector</h2>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {selected ? (
                <>
                  <div>
                    <p className="text-xs text-slate-500">Selected</p>
                    <p className="text-lg font-semibold text-slate-900">{SECTION_LABEL[selected.type]}</p>
                    <p className="font-mono text-xs text-slate-400">{selected.id}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500"><Wand2 size={14} /> Edit content</p>
                    <p className="mb-3 text-xs text-slate-500">Changes save automatically as you edit.</p>
                    <PropertyFields value={selected.props} onChange={updateSelectedProp} />
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500">Select a section on the canvas to inspect it.</p>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

/** Section navigation, as a vertical list (wide screens) or a horizontal chip bar (narrow screens). */
function SectionPicker({
  sections,
  selectedId,
  onSelect,
  variant,
}: {
  sections: Section[]
  selectedId: string | null
  onSelect: (id: string) => void
  variant: 'list' | 'chips'
}) {
  if (variant === 'chips') {
    return (
      <>
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            aria-current={s.id === selectedId}
            className={cn('shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors', s.id === selectedId ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')}
          >
            {i + 1}. {SECTION_LABEL[s.type]}
          </button>
        ))}
      </>
    )
  }
  return (
    <ol className="flex-1 space-y-1 overflow-y-auto p-2">
      {sections.map((s, i) => (
        <li key={s.id}>
          <button
            type="button"
            onClick={() => onSelect(s.id)}
            aria-current={s.id === selectedId}
            className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors', s.id === selectedId ? 'bg-brand-50 font-semibold text-brand-800' : 'text-slate-700 hover:bg-slate-50')}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-500">{i + 1}</span>
            {SECTION_LABEL[s.type]}
          </button>
        </li>
      ))}
    </ol>
  )
}

function CanvasUnavailable() {
  return (
    <div className="flex h-64 items-center justify-center px-6 text-center text-sm text-slate-500">
      This site couldn’t be displayed. Its saved content may be from an older version of the template.
    </div>
  )
}

function updateAtPath<T>(root: T, path: (string | number)[], value: unknown): T {
  if (path.length === 0) return value as T
  const [key, ...remaining] = path
  if (Array.isArray(root) && typeof key === 'number') {
    return root.map((item, index) => index === key ? updateAtPath(item, remaining, value) : item) as T
  }
  if (root && typeof root === 'object' && typeof key === 'string') {
    const record = root as Record<string, unknown>
    return { ...record, [key]: updateAtPath(record[key], remaining, value) } as T
  }
  return root
}

function updateSectionProps(section: Section, path: (string | number)[], value: unknown): Section {
  switch (section.type) {
    case 'navbar': return { ...section, props: updateAtPath(section.props, path, value) }
    case 'hero': return { ...section, props: updateAtPath(section.props, path, value) }
    case 'story': return { ...section, props: updateAtPath(section.props, path, value) }
    case 'features': return { ...section, props: updateAtPath(section.props, path, value) }
    case 'showcase': return { ...section, props: updateAtPath(section.props, path, value) }
    case 'testimonials': return { ...section, props: updateAtPath(section.props, path, value) }
    case 'cta': return { ...section, props: updateAtPath(section.props, path, value) }
    case 'footer': return { ...section, props: updateAtPath(section.props, path, value) }
  }
}

function PropertyFields({
  value,
  path = [],
  onChange,
}: {
  value: unknown
  path?: (string | number)[]
  onChange: (path: (string | number)[], value: unknown) => void
}) {
  if (typeof value === 'string') {
    const label = String(path[path.length - 1] ?? 'Value')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (letter) => letter.toUpperCase())
    const multiline = value.length > 90 || value.includes('\n')
    const Input = multiline ? 'textarea' : 'input'
    return (
      <label className="mb-3 block text-xs font-medium text-slate-600">
        <span className="mb-1 block">{label}</span>
        <Input
          value={value}
          rows={multiline ? 3 : undefined}
          onChange={(event) => onChange(path, event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </label>
    )
  }

  if (typeof value === 'boolean') {
    return (
      <label className="mb-3 flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={value} onChange={(event) => onChange(path, event.target.checked)} />
        {String(path[path.length - 1] ?? 'Enabled')}
      </label>
    )
  }

  if (Array.isArray(value)) {
    return (
      <fieldset className="mb-4 min-w-0 rounded-lg border border-slate-200 p-2.5">
        <legend className="px-1 text-xs font-semibold text-slate-600">{String(path[path.length - 1] ?? 'Items')}</legend>
        {value.map((item, index) => (
          <div key={`${path.join('.')}-${index}`} className="relative">
            <PropertyFields value={item} path={[...path, index]} onChange={onChange} />
            {typeof item === 'string' && (
              <button
                type="button"
                aria-label={`Remove item ${index + 1}`}
                onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                className="mb-2 text-xs text-rose-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {value.every((item) => typeof item === 'string') && (
          <button type="button" onClick={() => onChange(path, [...value, ''])} className="text-xs font-semibold text-brand-700 hover:underline">
            Add item
          </button>
        )}
      </fieldset>
    )
  }

  if (value && typeof value === 'object') {
    return (
      <div className="space-y-1">
        {Object.entries(value).map(([key, child]) => (
          <PropertyFields key={`${path.join('.')}-${key}`} value={child} path={[...path, key]} onChange={onChange} />
        ))}
      </div>
    )
  }

  return null
}
