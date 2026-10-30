/**
 * Data integrity check for the template registry.
 * Run with: npm run check:data
 */
import { categories } from '../src/data/categories'
import { templates } from '../src/data/templates'
import { ICON_NAMES } from '../src/types/icons'

const errors: string[] = []
const fail = (msg: string) => errors.push(msg)
const HEX = /^#[0-9a-fA-F]{6}$/
const icons = new Set<string>(ICON_NAMES)
const categoryIds = new Set(categories.map((c) => c.id))

const seen = { slug: new Set<string>(), id: new Set<string>(), section: new Set<string>() }

for (const t of templates) {
  const where = `[${t.slug}]`
  if (seen.slug.has(t.slug)) fail(`${where} duplicate slug`)
  if (seen.id.has(t.id)) fail(`${where} duplicate id`)
  seen.slug.add(t.slug)
  seen.id.add(t.id)

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) fail(`${where} slug must be kebab-case`)
  if (!categoryIds.has(t.category)) fail(`${where} unknown category "${t.category}"`)
  if (Number.isNaN(Date.parse(t.createdAt))) fail(`${where} invalid createdAt`)
  if (t.highlights.length < 3) fail(`${where} needs at least 3 highlights`)
  if (t.includedPages.length < 1) fail(`${where} needs includedPages`)

  const { theme, pages } = t.document
  for (const key of ['primary', 'primaryText', 'secondary', 'background', 'text', 'muted'] as const) {
    if (!HEX.test(theme[key])) fail(`${where} theme.${key} must be a 6-digit hex (got "${theme[key]}")`)
  }

  if (pages.length < 1) fail(`${where} document has no pages`)
  for (const page of pages) {
    const types = page.sections.map((s) => s.type)
    if (types[0] !== 'navbar') fail(`${where} first section must be navbar`)
    if (types[types.length - 1] !== 'footer') fail(`${where} last section must be footer`)
    if (!types.includes('hero')) fail(`${where} page "${page.name}" needs a hero`)

    for (const s of page.sections) {
      if (seen.section.has(s.id)) fail(`${where} duplicate section id ${s.id}`)
      seen.section.add(s.id)

      const check = (name: string | undefined, field: string) => {
        if (name && !icons.has(name)) fail(`${where} ${s.id}: unknown icon "${name}" in ${field}`)
      }
      if (s.type === 'navbar') check(s.props.icon, 'icon')
      if (s.type === 'hero') check(s.props.imageIcon, 'imageIcon')
      if (s.type === 'features') s.props.items.forEach((i) => check(i.icon, 'items.icon'))
      if (s.type === 'showcase') s.props.items.forEach((i) => check(i.icon, 'items.icon'))
    }
  }
}

for (const c of categories) {
  if (!icons.has(c.icon)) fail(`[category ${c.id}] unknown icon "${c.icon}"`)
  if (!templates.some((t) => t.category === c.id)) fail(`[category ${c.id}] has no templates`)
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
console.log(`✓ ${templates.length} templates across ${categories.length} categories validated`)
