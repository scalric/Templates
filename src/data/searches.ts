export interface PopularSearch {
  label: string
  /** Query passed to /templates?q= */
  q: string
}

export const popularSearches: PopularSearch[] = [
  { label: 'Dental Clinic', q: 'dental clinic' },
  { label: 'Healthcare', q: 'healthcare' },
  { label: 'Bakery', q: 'bakery' },
  { label: 'Restaurant', q: 'restaurant' },
  { label: 'SaaS', q: 'saas' },
  { label: 'Portfolio', q: 'portfolio' },
]
