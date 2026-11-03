import { useState } from 'react'
import { Icon } from '../components/ui/Icon'
import { cn } from '../lib/cn'
import type { IconName } from '../types/icons'
import { useSite } from './context'

interface Props {
  icon: IconName
  label?: string
  imageUrl?: string
  imagePosition?: string
  seed?: number
  className?: string
  /** Above-the-fold hero image: load eagerly with high fetch priority. */
  priority?: boolean
}

const BLOBS = [
  { a: '-right-12 -top-12 h-64 w-64', b: '-bottom-16 -left-10 h-56 w-56' },
  { a: '-left-10 -top-10 h-56 w-56', b: '-bottom-12 -right-12 h-64 w-64' },
  { a: 'left-1/3 -top-16 h-60 w-60', b: 'bottom-0 -right-8 h-48 w-48' },
]

/**
 * Photo slot. Renders `imageUrl` when provided; otherwise a generated,
 * theme-aware placeholder so templates look finished with zero assets.
 */
export function ImageArt({ icon, label, imageUrl, imagePosition, seed = 0, className, priority = false }: Props) {
  const { theme, preview } = useSite()
  const [failed, setFailed] = useState(false)
  // Thumbnails of other pages are never above the fold, so only full renders get priority.
  const eager = priority && !preview

  // React 18 does not know the camelCase fetchPriority prop, so the DOM attribute is set directly.
  const fetchPriorityAttr: Record<string, string> = eager ? { fetchpriority: 'high' } : {}

  if (imageUrl && !failed) {
    return (
      <img
        src={imageUrl}
        alt={label ?? ''}
        loading={eager ? 'eager' : 'lazy'}
        {...fetchPriorityAttr}
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-cover', className)}
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />
    )
  }

  const blob = BLOBS[seed % BLOBS.length]
  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      style={{ background: `linear-gradient(140deg, ${theme.secondary} 0%, ${theme.primary}40 100%)` }}
    >
      <div className={cn('absolute rounded-full blur-2xl', blob.a)} style={{ background: `${theme.primary}66` }} />
      <div className={cn('absolute rounded-full blur-3xl', blob.b)} style={{ background: `${theme.primary}33` }} />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `radial-gradient(${theme.text} 1px, transparent 1px)`, backgroundSize: '18px 18px' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-[22%] min-h-12 aspect-square items-center justify-center rounded-full shadow-lg backdrop-blur"
          style={{ background: `${theme.background}d9`, color: theme.primary }}
        >
          <Icon name={icon} size={30} strokeWidth={1.5} />
        </div>
      </div>
      {label && (
        <span
          className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur"
          style={{ background: `${theme.background}cc`, color: theme.text }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
