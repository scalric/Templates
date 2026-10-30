import { Compass } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <div className="container-page py-24">
      <EmptyState icon={<Compass size={26} />} title="Page not found" description="The page you’re looking for doesn’t exist." action={<Button to="/">Back to home</Button>} />
    </div>
  )
}
