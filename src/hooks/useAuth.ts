import { useSyncExternalStore } from 'react'
import { authStore } from '../lib/authStore'

export function useAuth() {
  return useSyncExternalStore(authStore.subscribe, authStore.getUser, authStore.getUser)
}
