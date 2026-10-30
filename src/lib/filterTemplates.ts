import { categoryById } from '../data/categories'
import type { CategoryId, Template } from '../types/template'

export type SortKey = 'popular' | 'newest' | 'az'
export type PriceFilter = 'all' | 'free' | 'premium'

export interface TemplateFilters {
  q: string
  category: CategoryId | 'all'
  price: PriceFilter
  sort: SortKey
}

export const DEFAULT_FILTERS: TemplateFilters = { q: '', category: 'all', price: 'all', sort: 'popular' }

const SORTS: SortKey[] = ['popular', 'newest', 'az']
const PRICES: PriceFilter[] = ['all', 'free', 'premium']

export function parseFilters(sp: URLSearchParams): TemplateFilters {
  const category = sp.get('category') ?? 'all'
  const price = sp.get('price') as PriceFilter | null
  const sort = sp.get('sort') as SortKey | null
  return {
    q: sp.get('q') ?? '',
    category: category === 'all' || category in categoryById ? (category as TemplateFilters['category']) : 'all',
    price: price && PRICES.includes(price) ? price : 'all',
    sort: sort && SORTS.includes(sort) ? sort : 'popular',
  }
}

/** Only non-default values are written, which keeps URLs short and shareable. */
export function toSearchParams(f: TemplateFilters): URLSearchParams {
  const sp = new URLSearchParams()
  if (f.q.trim()) sp.set('q', f.q)
  if (f.category !== 'all') sp.set('category', f.category)
  if (f.price !== 'all') sp.set('price', f.price)
  if (f.sort !== 'popular') sp.set('sort', f.sort)
  return sp
}

export function hasActiveFilters(f: TemplateFilters): boolean {
  return Boolean(f.q.trim()) || f.category !== 'all' || f.price !== 'all'
}

export function filterTemplates(list: Template[], f: TemplateFilters): Template[] {
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean)
  const result = list.filter((t) => {
    if (f.category !== 'all' && t.category !== f.category) return false
    if (f.price !== 'all' && t.price !== f.price) return false
    if (!terms.length) return true
    const haystack = [t.name, t.tagline, t.description, categoryById[t.category].label, ...t.tags]
      .join(' ')
      .toLowerCase()
    return terms.every((term) => haystack.includes(term))
  })

  switch (f.sort) {
    case 'newest':
      return result.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    case 'az':
      return result.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return result.sort((a, b) => b.popularity - a.popularity)
  }
}
