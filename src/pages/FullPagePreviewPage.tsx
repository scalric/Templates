import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { templateBySlug } from '../data/templates'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useViewportDevice } from '../hooks/useViewportDevice'
import { SiteRenderer } from '../renderer/SiteRenderer'

/** The whole template as a visitor would see it, laid out for their screen size. */
export default function FullPagePreviewPage() {
  const { slug } = useParams()
  const template = templateBySlug(slug)
  const device = useViewportDevice()
  useDocumentTitle(template ? `${template.name} — full page` : undefined)

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <EmptyState icon={<ArrowLeft size={26} />} title="Template not found" description="This template may have been moved or removed." action={<Button to="/templates">Browse templates</Button>} />
      </div>
    )
  }

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-slate-900 px-4 py-2.5 text-sm text-white">
        <Link to={`/templates/${template.slug}`} className="inline-flex items-center gap-1.5 font-medium hover:underline">
          <ArrowLeft size={16} /> Back to template
        </Link>
        <span className="truncate text-white/70">{template.name}</span>
      </div>
      <SiteRenderer document={template.document} device={device} />
    </>
  )
}
