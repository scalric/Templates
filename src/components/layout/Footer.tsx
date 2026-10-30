import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import { popularSearches } from '../../data/searches'
import { scrollToTop } from '../../lib/scroll'
import { Logo } from './Navbar'

const linkCls = 'text-ink-soft transition-colors hover:text-brand-700'

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Professionally designed website templates for clinics, restaurants, startups, creators and shops — ready to make your own.
          </p>
        </div>

        <Column title="Templates">
          <li><Link className={linkCls} onClick={scrollToTop} to="/templates">All templates</Link></li>
          <li><Link className={linkCls} onClick={scrollToTop} to="/templates?sort=newest">Recently added</Link></li>
          <li><Link className={linkCls} onClick={scrollToTop} to="/templates?sort=popular">Most popular</Link></li>
          <li><Link className={linkCls} onClick={scrollToTop} to="/templates?price=free">Free templates</Link></li>
          <li><Link className={linkCls} onClick={scrollToTop} to="/templates?price=premium">Premium templates</Link></li>
        </Column>

        <Column title="Categories">
          {categories.map((c) => (
            <li key={c.id}><Link className={linkCls} onClick={scrollToTop} to={`/templates?category=${c.id}`}>{c.label}</Link></li>
          ))}
        </Column>

        <Column title="Popular searches">
          {popularSearches.map((s) => (
            <li key={s.label}><Link className={linkCls} onClick={scrollToTop} to={`/templates?q=${encodeURIComponent(s.q)}`}>{s.label}</Link></li>
          ))}
        </Column>

        <Column title="Account">
          <li><Link className={linkCls} onClick={scrollToTop} to="/my-designs">My designs</Link></li>
          <li><Link className={linkCls} onClick={scrollToTop} to="/sign-in">Sign in</Link></li>
        </Column>
      </div>
      <div className="border-t border-ink/10 py-5 text-center text-xs text-ink-soft">
        © 2026 Templates. Template previews use sample content.
      </div>
    </footer>
  )
}
