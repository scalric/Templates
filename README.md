# Templates

A website-template marketplace (Canva-Templates-style browsing) built with **React + TypeScript + Vite + Tailwind CSS + lucide-react**. Initial version runs entirely on local mock data.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc -b`) + production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | Strict TypeScript check of `src/` |
| `npm run check:data` | Validates the template registry (unique slugs, known icons/categories, hex colours, section order) |
| `npm run check:render` | Server-renders every template on desktop/tablet/mobile + editor mode, and tests the filter/URL logic |
| `npm run check` | All of the above + build |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home: hero + live search, popular searches, category cards, Featured / Popular / Recently added, final CTA |
| `/templates` | Browse: search, category chips, price + sort (all state lives in the URL, e.g. `?category=dental&sort=newest`) |
| `/templates/:slug` | Details: full-page preview with desktop/tablet/mobile toggle, "Use this template" |
| `/sign-in` | Demo sign-in (localStorage only, no server; any email + 6+ char password) |
| `/my-designs` | Your saved designs (localStorage): open, duplicate, delete |
| `/editor/:designId` | Editor **shell** (layers · canvas · inspector). Not the full editor yet |

## Architecture

```
src/
  types/        site.ts (document model) · template.ts · design.ts · icons.ts
  data/         categories.ts · templates.ts (registry) · builders.ts · catalog/*.ts (template content)
  renderer/     SiteRenderer · sections.tsx (one component per section type) · ScaledPage · ImageArt
  editor/       useEditorState.ts (ephemeral UI state, separate from the document)
  lib/          designStore.ts (localStorage, useSyncExternalStore-compatible) · filterTemplates.ts
  components/   ui/ · layout/ · templates/ · home/
  pages/        one file per route (details, designs and editor are code-split)
```

**The key idea:** a website is plain JSON — `SiteDocument → pages → sections → props`. Template thumbnails, the details preview, My Designs thumbnails and the editor canvas all render through the same `<SiteRenderer document={…} device={…}/>`. So previews are real miniature websites (not screenshots), and "editing" will simply mean producing a new `SiteDocument`.

What this buys you for the editor:

- `SiteRenderer` already supports editor mode (`selectedId` / `onSelect` → selectable sections with hover labels).
- `Design.document` is the persisted source of truth; `useEditorState` holds only view state (device, selection). Undo/redo can later wrap document changes.
- `renderSection()` in `sections.tsx` is the section registry: add a section type by extending `SectionPropsMap`, adding a component, and adding a `case`.
- `designStore` is the only thing that touches storage; swap it for an API without touching components.
- Responsive previews are driven by a `device` prop (not CSS breakpoints), so tablet/mobile can be shown accurately inside a desktop browser.

## Homepage design system

Editorial look: warm paper (`bg-paper`) background, near-black ink (`text-ink`), Fraunces serif headings, and a single vermilion accent (`brand-*` in `tailwind.config.ts`). Change the accent for the whole app by editing that one scale.

- `HeroSearch` — search box with live template suggestions (arrow keys + Enter). Enter on free text goes to `/templates?q=…`.
- `CategoryShowcase` — each category's thumbnail is its most popular template, rendered live, so cards are unique and stay in sync with the data.
- `TemplateSection`, `ScrollRow`, `TemplateCard` (`default` | `featured` variants) — reusable building blocks for any template list.
- Popular-search chips live in `src/data/searches.ts`; `npm run check:render` verifies each returns results.

## Adding a template

Add a `defineTemplate({...})` call to a file in `src/data/catalog/` (or create a new one and register it in `src/data/templates.ts`), then run `npm run check:data`.

## Images

Template imagery is generated, theme-aware art (`ImageArt`) so everything looks finished with zero assets. To use real photography, set `imageUrl` on a hero or showcase item — it falls back to the generated art if the image fails to load. Golden Crumb’s supplied bakery and customer photos are bundled under `public/images/golden-crumb/`.

## Known limitations (v0.1)

- No backend: designs live in this browser's localStorage.
- Editor is a shell: select sections and inspect props; no editing yet.
- Template thumbnails are rendered live, which is fine for ~dozens of templates. For hundreds, pre-render to images at build time.
