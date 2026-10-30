import { categories } from '../../data/categories'
import { cn } from '../../lib/cn'
import type { CategoryId } from '../../types/template'
import { Icon } from '../ui/Icon'

interface Props {
  value: CategoryId | 'all'
  onChange: (value: CategoryId | 'all') => void
}

export function CategoryChips({ value, onChange }: Props) {
  const base = 'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'
  return (
    <div role="tablist" aria-label="Template categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] sm:mx-0 sm:px-0">
      <button role="tab" aria-selected={value === 'all'} onClick={() => onChange('all')} className={cn(base, value === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50')}>
        All templates
      </button>
      {categories.map((c) => (
        <button key={c.id} role="tab" aria-selected={value === c.id} onClick={() => onChange(c.id)} className={cn(base, value === c.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50')}>
          <Icon name={c.icon} size={16} />
          {c.label}
        </button>
      ))}
    </div>
  )
}
