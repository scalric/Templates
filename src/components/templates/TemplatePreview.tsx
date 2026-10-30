import { cn } from '../../lib/cn'
import { SiteRenderer } from '../../renderer/SiteRenderer'
import { ScaledPage } from '../../renderer/ScaledPage'
import { DEVICE_WIDTH } from '../../types/site'
import type { Template } from '../../types/template'

/**
 * Miniature, non-interactive browser window rendering the real template.
 * `cropAspect` is the visible height-to-width ratio of the thumbnail (default 0.78).
 */
export function TemplatePreview({ template, className, chrome = true, bare = false, cropAspect = 0.78 }: { template: Template; className?: string; chrome?: boolean; bare?: boolean; cropAspect?: number }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none select-none overflow-hidden bg-white', !bare && 'rounded-2xl border border-slate-200/80', className)}>
      {chrome && <BrowserBar label={`${template.slug}.templates.site`} />}
      <ScaledPage width={DEVICE_WIDTH.desktop} cropAspect={cropAspect}>
        <SiteRenderer document={template.document} />
      </ScaledPage>
    </div>
  )
}

export function BrowserBar({ label }: { label: string }) {
  return (
    <div className="flex h-7 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3">
      <span className="h-2 w-2 rounded-full bg-rose-300" />
      <span className="h-2 w-2 rounded-full bg-amber-300" />
      <span className="h-2 w-2 rounded-full bg-emerald-300" />
      <span className="ml-3 truncate rounded-md bg-white px-2 py-0.5 text-[10px] text-slate-400 ring-1 ring-slate-200">{label}</span>
    </div>
  )
}
