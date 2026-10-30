import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { Device } from '../../types/site'

const OPTIONS: { id: Device; label: string; icon: typeof Monitor }[] = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
]

export function DeviceToggle({ value, onChange }: { value: Device; onChange: (d: Device) => void }) {
  return (
    <div role="radiogroup" aria-label="Preview device" className="inline-flex rounded-xl bg-slate-100 p-1">
      {OPTIONS.map(({ id, label, icon: IconCmp }) => (
        <button
          key={id}
          role="radio"
          aria-checked={value === id}
          onClick={() => onChange(id)}
          title={label}
          className={cn('inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors', value === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800')}
        >
          <IconCmp size={16} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
