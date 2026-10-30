import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { templates } from '../../data/templates'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-600 px-6 py-20 text-center sm:px-12 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-400/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-brand-800/40 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl">
        <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Find the template that fits your business
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          Preview any of our {templates.length} designs in full — desktop, tablet and mobile — before you commit.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/templates"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#fbbf4a] px-6 text-base font-semibold text-ink shadow-sm transition-colors hover:bg-[#f5b028] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbbf4a]"
          >
            Explore templates <ArrowRight size={18} />
          </Link>
          <Link
            to="/my-designs"
            className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-[#fbbf4a] px-6 text-base font-semibold text-[#fbbf4a] transition-colors hover:bg-[#fbbf4a] hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbbf4a]"
          >
            View my designs
          </Link>
        </div>
      </div>
    </section>
  )
}
