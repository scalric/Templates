import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { ChevronDown, LogOut, Menu, Search, X } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { categories } from '../../data/categories'
import { useAuth } from '../../hooks/useAuth'
import { useDesigns } from '../../hooks/useDesigns'
import { authStore } from '../../lib/authStore'
import { cn } from '../../lib/cn'
import { scrollToTop } from '../../lib/scroll'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('shrink-0 whitespace-nowrap text-2xl font-extrabold tracking-tight text-brand-600', className)}>
      Templates
    </Link>
  )
}

/** Plain text links with a blue underline that grows in on hover and marks the current page. */
const navItemClass = 'relative whitespace-nowrap py-2 text-[15px] font-medium text-ink transition-colors hover:text-brand-600 after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-600 after:transition-transform after:content-[\'\'] hover:after:scale-x-100 focus-visible:after:scale-x-100'
const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(navItemClass, isActive && 'text-brand-600 after:scale-x-100')

/** Desktop "Categories" dropdown: closes on outside click, Escape, and navigation. */
function CategoriesMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { pathname, search } = useLocation()

  useEffect(() => setOpen(false), [pathname, search])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(navItemClass, 'inline-flex items-center gap-1')}
      >
        Categories <ChevronDown size={15} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-[22rem] rounded-2xl border border-ink/10 bg-white p-2 shadow-lift">
          <ul className="grid grid-cols-1 gap-0.5">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/templates?category=${c.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50">
                  <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', c.tint)}><Icon name={c.icon} size={18} /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{c.label}</span>
                    <span className="block truncate text-xs text-ink-soft">{c.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/templates" className="mt-1 block rounded-xl bg-brand-50 px-3 py-2.5 text-center text-sm font-semibold text-brand-700 hover:bg-brand-100">
            Browse all templates
          </Link>
        </div>
      )}
    </div>
  )
}

/** Search icon that opens a search field in the navbar; submitting goes to the templates page. */
function NavSearch() {
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const query = term.trim()
    setOpen(false)
    setTerm('')
    navigate(query ? `/templates?q=${encodeURIComponent(query)}` : '/templates')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setOpen(false)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        aria-expanded={false}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-50 hover:text-brand-600"
      >
        <Search size={20} />
      </button>
    )
  }

  return (
    <form onSubmit={submit} role="search" className="flex items-center gap-1 rounded-full border-2 border-brand-600 bg-white py-1 pl-4 pr-1">
      <input
        autoFocus
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search templates…"
        aria-label="Search templates"
        className="w-56 min-w-0 border-0 bg-transparent p-0 text-sm text-ink placeholder:text-ink-soft/60 focus:ring-0"
      />
      <button type="submit" aria-label="Search" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700">
        <Search size={16} />
      </button>
    </form>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()
  const designs = useDesigns()
  const user = useAuth()

  useEffect(() => setOpen(false), [pathname, search])

  const designsBadge = designs.length > 0 && (
    <span className="ml-1.5 rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-semibold text-brand-700">{designs.length}</span>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur-lg">
      <div className="container-page flex h-20 items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Logo />
        <nav aria-label="Main" className="hidden items-center justify-self-center gap-8 lg:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/templates" className={linkClass} onClick={scrollToTop}>Templates</NavLink>
          <CategoriesMenu />
          <NavLink to="/my-designs" className={linkClass}>My Designs{designsBadge}</NavLink>
        </nav>

        <div className="hidden items-center justify-self-end gap-3 lg:flex">
          {user ? (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white" title={user.email} aria-label={`Signed in as ${user.name}`}>
                {user.name.charAt(0).toUpperCase()}
              </span>
              <button type="button" onClick={() => authStore.signOut()} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-brand-600">
                <LogOut size={15} /> Sign out
              </button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border-2 border-brand-600 px-5 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
            >
              Sign in
            </Link>
          )}
          <NavSearch />
        </div>

        <button className="shrink-0 rounded-lg p-2 text-ink hover:bg-ink/[0.06] lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-ink/10 bg-white px-4 pb-6 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/templates" end className={linkClass} onClick={scrollToTop}>Templates</NavLink>
            <NavLink to="/my-designs" className={linkClass}>My Designs{designsBadge}</NavLink>
          </div>
          <p className="mb-1 mt-5 px-3 text-xs font-semibold uppercase tracking-wider text-ink-soft/70">Categories</p>
          <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/templates?category=${c.id}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-brand-50">
                  <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', c.tint)}><Icon name={c.icon} size={16} /></span>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            {user ? (
              <Button variant="secondary" onClick={() => authStore.signOut()} leftIcon={<LogOut size={16} />}>Sign out ({user.name})</Button>
            ) : (
              <Button to="/sign-in" variant="secondary">Sign in</Button>
            )}
            <Button to="/templates">Browse templates</Button>
          </div>
        </nav>
      )}
    </header>
  )
}
