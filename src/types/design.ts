import type { SiteDocument } from './site'

/** A user's saved copy of a template. The editor will mutate `document`. */
export interface Design {
  id: string
  name: string
  templateId: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  document: SiteDocument
}
