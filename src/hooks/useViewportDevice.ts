import { useSyncExternalStore } from 'react'
import type { Device } from '../types/site'

const subscribe = (listener: () => void): (() => void) => {
  window.addEventListener('resize', listener)
  return () => window.removeEventListener('resize', listener)
}

const currentDevice = (): Device => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/** The layout a visitor should see for their screen, updated as the window resizes. */
export function useViewportDevice(): Device {
  return useSyncExternalStore(subscribe, currentDevice, () => 'desktop')
}
