import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'neutral' | 'brand' | 'premium' | 'free' | 'new'

const TONES: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-50 text-brand-700',
  premium: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  free: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  new: 'bg-brand-600 text-white',
}

export function Badge({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', TONES[tone], className)}>
      {children}
    </span>
  )
}
