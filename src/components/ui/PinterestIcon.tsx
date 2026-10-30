/** Pinterest glyph; lucide-react does not ship one. */
export function PinterestIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M10.6 16.5 12.2 9.4a1.9 1.9 0 0 1 3.1 1.5c0 2-1.4 3.2-2.7 3.2-1 0-1.6-.8-1.3-1.8M10.6 16.5l-.6 2.3" />
    </svg>
  )
}
