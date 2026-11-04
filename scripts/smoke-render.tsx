import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { templates } from '../src/data/templates'
import { SiteRenderer } from '../src/renderer/SiteRenderer'
import { filterTemplates, parseFilters, toSearchParams, DEFAULT_FILTERS } from '../src/lib/filterTemplates'
import { upgradeDesign } from '../src/lib/designStore'
import { popularSearches } from '../src/data/searches'
import type { Design } from '../src/types/design'
import type { Device } from '../src/types/site'

let bad = 0
for (const t of templates) {
  for (const device of ['desktop', 'tablet', 'mobile'] as Device[]) {
    const html = renderToStaticMarkup(<SiteRenderer document={t.document} device={device} />)
    const hero = t.document.pages[0].sections.find((s) => s.type === 'hero')!
    const title = (hero.props as { title: string }).title
    // Multi-line titles render one <span> per line, so each line is checked on its own.
    // An accent word is rendered in its own <span>, so check the text on either side of it.
    const accent = (hero.props as { highlight?: string }).highlight
    const titleLines = title.split('\n').flatMap((line) => (accent && line.includes(accent) ? line.split(accent) : [line])).map((line) => line.trim()).filter(Boolean)
    if (!titleLines.every((line) => html.includes(line.replace(/’/g, '&#x27;')) || html.includes(line))) { console.error('missing hero title', t.slug, device); bad++ }
    if (html.length < 4000) { console.error('suspiciously small output', t.slug, device, html.length); bad++ }
  }
  // interactive (editor) mode
  const html = renderToStaticMarkup(<SiteRenderer document={t.document} selectedId={t.document.pages[0].sections[1].id} onSelect={() => {}} />)
  if (!html.includes('data-section-id')) { console.error('editor mode missing section ids', t.slug); bad++ }
}
console.log(`rendered ${templates.length} templates × 3 devices + editor mode`)

const stillwater = templates.find((template) => template.slug === 'stillwater-yoga')
if (!stillwater) {
  console.error('missing stillwater-yoga template')
  bad++
} else {
  const responsiveLayouts = {
    desktop: {
      navbar: 'grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4',
      story: 'grid-cols-2 gap-16',
      stats: 'mt-7 grid max-w-lg gap-x-4 gap-y-5 grid-cols-4',
      footer: 'grid-cols-[1.4fr_repeat(3,minmax(0,1fr))_1.2fr]',
      practice: 'grid-cols-4 gap-x-5 gap-y-8',
    },
    tablet: {
      navbar: 'grid-cols-[minmax(0,1fr)_auto] gap-3',
      story: 'grid-cols-2 gap-10',
      stats: 'mt-7 grid max-w-lg gap-x-4 gap-y-5 grid-cols-2',
      footer: 'grid-cols-2',
      practice: 'grid-cols-2 gap-x-5 gap-y-8',
    },
    mobile: {
      navbar: 'grid-cols-[minmax(0,1fr)_auto] gap-2',
      story: 'grid-cols-1 gap-10',
      stats: 'mt-7 grid max-w-lg gap-x-4 gap-y-5 mx-auto grid-cols-2 text-left',
      footer: 'grid-cols-1',
      practice: 'grid-cols-1 gap-x-5 gap-y-8',
    },
  } satisfies Record<Device, { navbar: string; story: string; stats: string; footer: string; practice: string }>
  for (const device of ['desktop', 'tablet', 'mobile'] as Device[]) {
    const html = renderToStaticMarkup(<SiteRenderer document={stillwater.document} device={device} />)
    const layout = responsiveLayouts[device]
    for (const [name, value] of Object.entries({
      'navbar layout': layout.navbar,
      'story layout': layout.story,
      'stats layout': layout.stats,
      'footer layout': layout.footer,
      'practice card layout': layout.practice,
      'practice card styling': 'rounded-md aspect-[4/3]',
      'centered practice card titles': 'text-center text-base font-medium',
      'View practice button': 'View practice',
      'provided private training image': '/images/yoga/private-training.webp',
      'private training image position': 'object-position:center center',
      '10+ years metric': '10+',
      '500+ clients metric': '500+',
      '20+ instructors metric': '20+',
      '98% satisfaction metric': '98%',
      'terracotta button and quote accents': 'color:#b76e52',
      'newsletter form': 'Enter your email',
      'footer legal links': 'Privacy policy',
    })) {
      if (!html.includes(value)) {
        console.error(`stillwater ${device} missing ${name}`)
        bad++
      }
    }
    const heroSizing = {
      desktop: 'relative flex items-end overflow-hidden aspect-[1600/579] min-h-[380px]',
      tablet: 'relative flex items-end overflow-hidden min-h-[340px]',
      mobile: 'relative flex items-end overflow-hidden aspect-[4/3]',
    } satisfies Record<Device, string>
    if (!html.includes(heroSizing[device])) {
      console.error(`stillwater ${device} hero sizing can overflow its viewport`)
      bad++
    }
    if (!html.includes('min-w-0 [overflow-wrap:anywhere]')) {
      console.error(`stillwater ${device} footer contact details cannot wrap safely`)
      bad++
    }
    const secondaryCta = html.match(/<span class="[^"]*\bbg-white\b[^"]*" style="([^"]*)">View schedule/)
    if (!secondaryCta || !secondaryCta[1].includes('background:#ffffff') || !secondaryCta[1].includes('color:#26372d')) {
      console.error(`stillwater ${device} secondary hero CTA styling is not white and readable`)
      bad++
    }
    if (!html.includes('background:#b76e52;color:#fff')) {
      console.error(`stillwater ${device} primary CTA color does not match the reference`)
      bad++
    }
    const testimonialFigures = Array.from(html.matchAll(/<figure class="([^"]*)"[^>]*>([\s\S]*?)<\/figure>/g))
    const secondTestimonial = testimonialFigures.find((figure) => figure[2].includes('Training finally fits my routine'))
    const thirdTestimonial = testimonialFigures.find((figure) => figure[2].includes('Simple guidance, real progress'))
    if (!secondTestimonial || !thirdTestimonial) {
      console.error(`stillwater ${device} testimonial separators are missing`)
      bad++
    } else if (
      device === 'mobile' && (secondTestimonial[1].includes('border-l') || !secondTestimonial[1].includes('border-t')) ||
      device === 'tablet' && (!secondTestimonial[1].includes('border-l') || !thirdTestimonial[1].includes('border-t')) ||
      device === 'desktop' && (!secondTestimonial[1].includes('border-l') || thirdTestimonial[1].includes('border-t'))
    ) {
      console.error(`stillwater ${device} testimonial separators do not match the card grid`)
      bad++
    }
    const tabletOrDesktop = device !== 'mobile'
    if (html.includes('Claim offer') !== tabletOrDesktop) {
      console.error(`stillwater ${device} announcement action visibility is incorrect`)
      bad++
    }
    if (html.includes('Book a class') !== tabletOrDesktop) {
      console.error(`stillwater ${device} navbar CTA visibility is incorrect`)
      bad++
    }
  }

  const legacyDocument = JSON.parse(JSON.stringify(stillwater.document)) as typeof stillwater.document
  legacyDocument.theme.primary = '#52745c'
  for (const page of legacyDocument.pages) {
    page.sections = page.sections.map((section) => {
      if (section.type === 'story') {
        const { stats: _stats, ...props } = section.props
        return { ...section, props }
      }
      if (section.type === 'footer') {
        const { brandIcon: _brandIcon, variant: _variant, socialLinks: _socialLinks, newsletter: _newsletter, legalLinks: _legalLinks, ...props } = section.props
        return { ...section, props }
      }
      if (section.type === 'showcase' && section.props.title === 'Find your practice') {
        const { cardStyle: _cardStyle, buttonLabel: _buttonLabel, ...props } = section.props
        return {
          ...section,
          props: {
            ...props,
            items: props.items.map((item) => item.title === 'Private training'
              ? { ...item, title: 'Gentle flow', imageUrl: '/images/yoga/gentle-flow.webp', imagePosition: 'center 72%' }
              : item),
          },
        }
      }
      return section
    })
  }
  const upgraded = upgradeDesign({
    id: 'legacy-stillwater',
    name: 'Stillwater Yoga — my site',
    templateId: stillwater.id,
    createdAt: '2026-09-20',
    updatedAt: '2026-09-20',
    document: legacyDocument,
  } satisfies Design)
  const migratedHtml = renderToStaticMarkup(<SiteRenderer document={upgraded.document} device="desktop" />)
  for (const value of ['10+', '500+', '20+', '98%', 'Private training', 'View practice', 'Stay connected', 'Privacy policy', 'private-training.webp', 'object-position:center center', 'color:#b76e52']) {
    if (!migratedHtml.includes(value)) {
      console.error(`legacy Stillwater design missing migrated content: ${value}`)
      bad++
    }
  }
}

// Filter logic
const f = (q: string, extra = {}) => filterTemplates(templates, { ...DEFAULT_FILTERS, q, ...extra }).map((t) => t.slug)
const checks: [string, boolean][] = [
  ['search "dental" finds 2', f('dental').length === 2],
  ['search "bakery" finds golden-crumb', f('bakery').includes('golden-crumb-bakery')],
  ['category filter', f('', { category: 'saas' }).length === 1],
  ['free filter', f('', { price: 'free' }).every((s) => templates.find((t) => t.slug === s)!.price === 'free')],
  ['newest sort first is newest', f('', { sort: 'newest' })[0] === [...templates].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0].slug],
  ['A–Z sort', templates.find((t) => t.slug === f('', { sort: 'az' })[0])!.name === [...templates].sort((a, b) => a.name.localeCompare(b.name))[0].name],
  ['no-match is empty', f('zzzzqq').length === 0],
  ['URL round-trip', JSON.stringify(parseFilters(toSearchParams({ q: 'x', category: 'dental', price: 'free', sort: 'az' }))) === JSON.stringify({ q: 'x', category: 'dental', price: 'free', sort: 'az' })],
  ['bad URL params fall back', parseFilters(new URLSearchParams('category=nope&sort=zzz&price=q')).category === 'all'],
  ['defaults give empty params', toSearchParams(DEFAULT_FILTERS).toString() === ''],
]
for (const ps of popularSearches) checks.push([`suggestion "${ps.label}" returns results`, f(ps.q).length > 0])
for (const [name, ok] of checks) { console.log(ok ? '  ✓' : '  ✗', name); if (!ok) bad++ }
process.exit(bad ? 1 : 0)
