import { useSyncExternalStore } from 'react'
import { designStore } from '../lib/designStore'

export function useDesigns() {
  return useSyncExternalStore(designStore.subscribe, designStore.getAll, designStore.getAll)
}

export function useDesign(id: string | undefined) {
  const designs = useDesigns()
  return designs.find((d) => d.id === id)
}
