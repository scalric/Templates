import { SearchX } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CategoryChips } from '../components/templates/CategoryChips'
import { CategoryHighlights } from '../components/templates/CategoryHighlights'
import { SearchInput } from '../components/templates/SearchInput'
import { TemplateGrid } from '../components/templates/TemplateGrid'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { categoryById } from '../data/categories'
import { templates } from '../data/templates'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  DEFAULT_FILTERS, filterTemplates, hasActiveFilters, parseFilters, toSearchParams,
  type PriceFilter, type SortKey, type TemplateFilters,
} from '../lib/filterTemplates'

const selectClass = 'h-11 rounded-xl border-0 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-soft ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-brand-600'

export default function TemplatesPage() {
  const [params, setParams] = useSearchParams()
  const filters = useMemo(() => parseFilters(params), [params])
  const results = useMemo(() => filterTemplates(templates, filters), [filters])

  const categoryTemplates = useMemo(
    () => (filters.category === 'all' ? [] : templates.filter((t) => t.category === filters.category)),
    [filters.category],
  )
  // Highlights frame a category; they step aside while the visitor is searching or narrowing by price.
  const showHighlights = filters.category !== 'all' && filters.q === '' && filters.price === 'all'

  const title = filters.category !== 'all' ? categoryById[filters.category].label : 'All templates'
  useDocumentTitle(`${title} — Templates`)

  const update = (patch: Partial<TemplateFilters>) => setParams(toSearchParams({ ...filters, ...patch }), { replace: true })

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {filters.category === 'all' ? 'Website templates' : title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {filters.category === 'all' ? 'Find a polished starting point for any kind of business.' : categoryById[filters.category].description}
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <SearchInput value={filters.q} onChange={(q) => update({ q })} className="flex-1" />
          <div className="flex gap-3">
            <label className="sr-only" htmlFor="price">Price</label>
            <select id="price" value={filters.price} onChange={(e) => update({ price: e.target.value as PriceFilter })} className={`${selectClass} flex-1 lg:flex-none`}>
              <option value="all">Free &amp; premium</option>
              <option value="free">Free only</option>
              <option value="premium">Premium only</option>
            </select>
            <label className="sr-only" htmlFor="sort">Sort by</label>
            <select id="sort" value={filters.sort} onChange={(e) => update({ sort: e.target.value as SortKey })} className={`${selectClass} flex-1 lg:flex-none`}>
              <option value="popular">Most popular</option>
              <option value="newest">Newest</option>
              <option value="az">A – Z</option>
            </select>
          </div>
        </div>
        <CategoryChips value={filters.category} onChange={(category) => update({ category })} />
      </div>

      {showHighlights && <CategoryHighlights templates={categoryTemplates} />}

      <div className="mt-8 flex items-center justify-between text-sm text-slate-500" aria-live="polite">
        <p><span className="font-semibold text-slate-900">{results.length}</span> template{results.length === 1 ? '' : 's'}</p>
        {hasActiveFilters(filters) && (
          <button onClick={() => setParams(toSearchParams(DEFAULT_FILTERS), { replace: true })} className="font-medium text-brand-700 hover:underline">Clear filters</button>
        )}
      </div>

      <div className="mt-6">
        {results.length ? (
          <TemplateGrid templates={results} />
        ) : (
          <EmptyState
            icon={<SearchX size={26} />}
            title="No templates match your search"
            description="Try a different keyword, or clear the filters to see everything."
            action={<Button variant="secondary" onClick={() => setParams(toSearchParams(DEFAULT_FILTERS), { replace: true })}>Clear filters</Button>}
          />
        )}
      </div>
    </div>
  )
}
