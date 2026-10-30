import type { Template } from '../types/template'
import { businessTemplates } from './catalog/business'
import { commerceTemplates } from './catalog/commerce'
import { foodTemplates } from './catalog/food'
import { healthcareTemplates } from './catalog/healthcare'
import { industriesTemplates } from './catalog/industries'
import { sportsTemplates } from './catalog/sports'
import { wellnessTemplates } from './catalog/wellness'

/** Central template registry. Swap this for an API call later. */
export const templates: Template[] = [
  ...healthcareTemplates,
  ...foodTemplates,
  ...businessTemplates,
  ...commerceTemplates,
  ...wellnessTemplates,
  ...sportsTemplates,
  ...industriesTemplates,
]

export const templateBySlug = (slug: string | undefined): Template | undefined =>
  templates.find((t) => t.slug === slug)

export const templateById = (id: string): Template | undefined =>
  templates.find((t) => t.id === id)
