import { FinalCta } from '../components/home/FinalCta'
import { HowItWorks } from '../components/home/HowItWorks'
import { HomeHero } from '../components/home/HomeHero'
import { TemplateSection } from '../components/home/TemplateSection'
import { TemplateCard } from '../components/templates/TemplateCard'
import { templateBySlug } from '../data/templates'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/** Hand-picked starting points, in display order. */
const START_HERE_SLUGS = ['stillwater-yoga', 'riptide-swim-academy', 'ember-and-oak', 'luna-atelier']

export default function HomePage() {
  useDocumentTitle()

  const startHere = START_HERE_SLUGS.map(templateBySlug).filter((t) => t !== undefined)

  return (
    <>
      <HomeHero />

      <TemplateSection id="templates" eyebrow="Start here" title="Templates to get you going" description="A few of our most-loved designs. Browse every template by category." viewAllTo="/templates" viewAllLabel="All templates">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {startHere.map((t) => <TemplateCard key={t.id} template={t} />)}
        </div>
      </TemplateSection>

      <HowItWorks />
      <FinalCta />
    </>
  )
}
