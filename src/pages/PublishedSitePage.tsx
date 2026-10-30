import { AlertCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { useDesign } from '../hooks/useDesigns'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useViewportDevice } from '../hooks/useViewportDevice'
import { SiteRenderer } from '../renderer/SiteRenderer'

export default function PublishedSitePage() {
  const { designId } = useParams()
  const design = useDesign(designId)
  const device = useViewportDevice()
  useDocumentTitle(design?.name)

  if (!design || !design.publishedAt) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <EmptyState
          icon={<AlertCircle size={26} />}
          title="This site isn’t published"
          description="Publish the design from the editor before sharing its site URL."
          action={<Button to={design ? `/editor/${design.id}` : '/templates'}>{design ? 'Back to editor' : 'Browse templates'}</Button>}
        />
      </div>
    )
  }

  return <SiteRenderer document={design.document} device={device} />
}
