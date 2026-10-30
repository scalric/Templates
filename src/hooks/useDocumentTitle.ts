import { useEffect } from 'react'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Templates` : 'Templates — Professional website templates'
  }, [title])
}
