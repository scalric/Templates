import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

interface Props {
  id?: string
  eyebrow: string
  title: string
  description?: string
  viewAllTo?: string
  viewAllLabel?: string
  /** Alternate background band for rhythm. */
  tinted?: boolean
  children: ReactNode
}

/** Shared frame for the Featured / Popular / Recently added sections. */
export function TemplateSection({ id, eyebrow, title, description, viewAllTo, viewAllLabel = 'View all', tinted, children }: Props) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn('py-16 lg:py-24', tinted && 'bg-paper-dark/60')}>
      <div className="container-page">
        <SectionHeading
          id={id ? `${id}-title` : undefined}
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={viewAllTo ? <Button to={viewAllTo} variant="secondary" rightIcon={<ArrowRight size={16} />}>{viewAllLabel}</Button> : undefined}
        />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
