import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface Props {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ id, eyebrow, title, description, action, align = 'left' }: Props) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', align === 'center' && 'items-center text-center sm:flex-col sm:items-center')}>
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>}
        <h2 id={id} className="text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-lg text-ink-soft">{description}</p>}
      </div>
      {action}
    </div>
  )
}
