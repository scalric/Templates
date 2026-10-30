import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'

interface Props {
  /** Logical width the content is laid out at (e.g. 1280 for desktop). */
  width: number
  children: ReactNode
  className?: string
  /** If set, crops to this height/width ratio (card thumbnails). Otherwise shows the whole page. */
  cropAspect?: number
  /** Allow scaling above 1? Defaults to false. */
  allowUpscale?: boolean
}

/**
 * Lays children out at a fixed logical width and scales them to fit the
 * container with CSS transforms. This is what makes thumbnails pixel-faithful
 * miniature websites rather than screenshots.
 */
export function ScaledPage({ width, children, className, cropAspect, allowUpscale = false }: Props) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)
  const [contentHeight, setContentHeight] = useState(width * (cropAspect ?? 0.75))

  useLayoutEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const measure = () => {
      const s = o.clientWidth / width
      setScale(allowUpscale ? s : Math.min(1, s))
      setContentHeight(i.scrollHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [width, allowUpscale])

  const logicalHeight = cropAspect ? width * cropAspect : contentHeight

  return (
    <div
      ref={outer}
      className={cn('relative w-full overflow-hidden', className)}
      style={{ height: logicalHeight * scale }}
    >
      <div
        ref={inner}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height: cropAspect ? logicalHeight : undefined, overflow: cropAspect ? 'hidden' : undefined, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
