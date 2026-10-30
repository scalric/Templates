import { MousePointerClick, Palette, Rocket } from 'lucide-react'

const steps = [
  {
    title: 'Choose a template',
    description: 'Browse by industry and preview the full page on desktop, tablet and mobile.',
    icon: MousePointerClick,
  },
  {
    title: 'Make it yours',
    description: 'Open it in the editor and customise content, colours and layout. Your work is saved automatically.',
    icon: Palette,
  },
  {
    title: 'Go live',
    description: 'Publish when you are ready. Hosting and custom domains are coming next.',
    icon: Rocket,
  },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="container-page py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">How it works</p>
        <h2 id="how-it-works-title" className="text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          From idea to website in three steps
        </h2>
      </div>

      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <li key={title} className="relative min-h-48 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/80">
            <span aria-hidden="true" className="absolute right-5 top-2 font-display text-5xl font-semibold text-slate-200">
              {index + 1}
            </span>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
              <Icon size={20} />
            </span>
            <h3 className="relative mt-5 font-semibold text-ink">{title}</h3>
            <p className="relative mt-1.5 text-sm leading-relaxed text-ink-soft">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
