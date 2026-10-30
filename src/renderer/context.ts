import { createContext, useContext } from 'react'
import type { Device, SiteTheme } from '../types/site'

interface SiteContextValue {
  theme: SiteTheme
  device: Device
}

export const SiteContext = createContext<SiteContextValue | null>(null)

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteRenderer>')
  return ctx
}

/** Pick a value per device. Tablet falls back to desktop, mobile to tablet. */
export function pick<T>(device: Device, values: { desktop: T; tablet?: T; mobile?: T }): T {
  if (device === 'mobile') return values.mobile ?? values.tablet ?? values.desktop
  if (device === 'tablet') return values.tablet ?? values.desktop
  return values.desktop
}
