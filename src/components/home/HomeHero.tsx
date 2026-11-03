import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const HERO_PREVIEWS = [
  {
    slug: 'brightsmile-dental',
    name: 'Brightsmile Dental',
    image: '/images/hero/brightsmile-dental.webp',
    className: 'left-0 top-[10%] z-10 -rotate-3',
  },
  {
    slug: 'flowdesk-saas',
    name: 'Flowdesk SaaS',
    image: '/images/hero/flowdesk-saas.webp',
    className: 'right-0 top-0 z-20 rotate-3',
  },
  {
    slug: 'ember-and-oak',
    name: 'Ember & Oak',
    image: '/images/hero/ember-and-oak.webp',
    className: 'left-[12%] top-[39%] z-30 -rotate-1',
  },
]

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand-600">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-400/40 blur-3xl" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-8 pb-14 pt-14 sm:gap-12 sm:pb-20 sm:pt-20 lg:min-h-[620px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-16">
        <div className="relative z-10 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-800/60 px-4 py-1.5 text-sm font-semibold text-[#fbbf4a] shadow-soft ring-1 ring-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf4a]" aria-hidden="true" />
            Website templates for every industry
          </p>

          <h1 className="mx-auto mt-7 max-w-3xl text-balance font-sans text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:mx-0 lg:text-7xl">
            Find the <em className="font-extrabold not-italic text-brand-200">Perfect</em> Website <span className="text-[#fbbf4a]">Template</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl lg:mx-0">
            Beautifully designed, ready-to-customise sites for clinics, restaurants, startups, creators and shops.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              to="/templates"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#fbbf4a] px-6 text-base font-semibold text-ink shadow-sm transition-colors hover:bg-[#f5b028] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbbf4a]"
            >
              Browse templates <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div aria-label="Featured website templates" className="relative mx-auto h-[310px] w-full max-w-[620px] sm:h-[430px] lg:h-[500px]">
          {HERO_PREVIEWS.map((preview) => (
            <Link
              key={preview.slug}
              to={`/templates/${preview.slug}`}
              aria-label={`View ${preview.name} template`}
              className={`absolute block w-[82%] overflow-hidden rounded-2xl shadow-lift ring-1 ring-ink/10 transition-transform duration-500 hover:z-40 hover:scale-[1.03] hover:rotate-0 sm:w-[76%] ${preview.className}`}
            >
              <img src={preview.image} alt={`${preview.name} website template preview`} className="block h-auto w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
