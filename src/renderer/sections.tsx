import type { ReactNode } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Facebook, Heart, Instagram, Leaf, Linkedin, Menu, Play, Search, ShoppingBag, ShoppingCart, Star, User, Youtube, type LucideIcon } from 'lucide-react'
import { Icon } from '../components/ui/Icon'
import { cn } from '../lib/cn'
import type {
  CtaProps, FeaturesProps, FooterProps, HeroProps, ImageBandProps, NavbarProps, Section, ShowcaseItem, ShowcaseProps, StoryProps, TestimonialsProps,
} from '../types/site'
import { pick, useSite } from './context'
import { ImageArt } from './ImageArt'
import { PinterestIcon } from '../components/ui/PinterestIcon'

/** Accent blue used by the academy layouts (headline highlight, banner button). */
const ACCENT_BLUE = '#1f9ee6'

/** Warm highlight used by the Elevate testimonial band, feature CTA and footer. */
const ACCENT_WARM = '#f2a04f'

/** Olive footer palette from the Elevate reference: dark olive band, cream text and a terracotta accent. */
const FOOTER_OLIVE = '#3a3b2a'
const FOOTER_CREAM = '#f1ece0'
const FOOTER_ACCENT = '#c9673f'

/** Shared design tokens derived from the active theme and device. */
function useTokens() {
  const { theme, device } = useSite()
  return {
    theme,
    device,
    heading: theme.headingFont === 'serif' ? 'font-display font-semibold tracking-tight' : 'font-sans font-bold tracking-tight',
    card: { sharp: 'rounded-none', soft: 'rounded-2xl', round: 'rounded-[2rem]' }[theme.radius],
    btn: { sharp: 'rounded-none', soft: 'rounded-xl', round: 'rounded-full' }[theme.radius],
    px: pick(device, { desktop: 'px-16', tablet: 'px-10', mobile: 'px-6' }),
    py: pick(device, { desktop: 'py-24', tablet: 'py-16', mobile: 'py-12' }),
    h1: pick(device, { desktop: 'text-6xl leading-[1.05]', tablet: 'text-5xl leading-[1.1]', mobile: 'text-4xl leading-[1.1]' }),
    h2: pick(device, { desktop: 'text-4xl', tablet: 'text-3xl', mobile: 'text-3xl' }),
    lead: pick(device, { desktop: 'text-xl', tablet: 'text-lg', mobile: 'text-base' }),
  }
}

const COLS: Record<number, string> = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }
const cols = (n: number) => COLS[Math.min(4, Math.max(1, n))]
type SocialIcon = LucideIcon | typeof PinterestIcon

const SOCIAL_ICONS: Record<NonNullable<FooterProps['socialLinks']>[number]['platform'], SocialIcon> = {
  pinterest: PinterestIcon,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
}

function Shell({ children, className, bg }: { children: ReactNode; className?: string; bg?: string }) {
  const { px, py } = useTokens()
  return (
    <section className={cn(px, py, className)} style={bg ? { background: bg } : undefined}>
      <div className="mx-auto max-w-[1100px]">{children}</div>
    </section>
  )
}

function SectionTitle({ title, subtitle, center = false, light = false }: { title: string; subtitle?: string; center?: boolean; light?: boolean }) {
  const { theme, heading, h2 } = useTokens()
  return (
    <div className={cn('mb-12 max-w-2xl', center && 'mx-auto text-center')}>
      <h2 className={cn(heading, h2, light && 'text-white')}>{title}</h2>
      {subtitle && <p className="mt-3 text-lg" style={{ color: light ? '#dce7e9' : theme.muted }}>{subtitle}</p>}
    </div>
  )
}

function PrimaryButton({ children }: { children: ReactNode }) {
  const { theme, btn } = useTokens()
  return (
    <span role="button" className={cn('inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold', btn)} style={{ background: theme.primary, color: theme.primaryText }}>
      {children}
    </span>
  )
}

function GhostButton({ children, onDark = false, outline = false }: { children: ReactNode; onDark?: boolean; outline?: boolean }) {
  const { theme, btn } = useTokens()
  return (
    <span
      role="button"
      className={cn('inline-flex items-center gap-2 border px-6 py-3.5 text-base font-semibold', onDark && (outline ? 'bg-black/20 text-white' : 'bg-white'), btn)}
      style={{ background: onDark ? outline ? 'rgba(0,0,0,0.2)' : '#ffffff' : undefined, borderColor: onDark ? outline ? 'rgba(255,255,255,0.6)' : '#ffffff' : `${theme.text}33`, color: onDark && outline ? '#ffffff' : theme.text }}
    >
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */

export function NavbarSection({ props }: { props: NavbarProps }) {
  const { theme, device, px, btn, heading } = useTokens()
  if (props.layout === 'nexora') {
    return (
      <header className={cn('flex items-center justify-between gap-6 border-b', pick(device, { desktop: 'px-12 py-4', tablet: 'px-8 py-4', mobile: 'px-5 py-4' }))} style={{ background: theme.background, color: theme.text, borderColor: `${theme.text}14` }}>
        <div className="flex min-w-0 items-center gap-3">
          <span style={{ color: theme.primary }}><Icon name={props.icon} size={34} strokeWidth={2} /></span>
          <span className="min-w-0">
            <span className="block font-sans text-xl font-bold leading-none">{props.brand}</span>
            {props.subtitle && <span className="mt-1 block whitespace-nowrap text-[10px]" style={{ color: theme.muted }}>{props.subtitle}</span>}
          </span>
        </div>
        {device === 'desktop' && (
          <nav aria-label="Main navigation" className="flex items-center gap-7 text-[13px] font-medium">
            {props.links.map((link, index) => (
              <span key={link} className={cn('whitespace-nowrap pb-1', index === 0 && 'border-b-2')} style={index === 0 ? { borderColor: theme.primary, color: theme.primary } : undefined}>{link}</span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-5">
          {device !== 'mobile' && <Search size={18} aria-label="Search" />}
          {device === 'desktop' ? (
            <span className="inline-flex items-center gap-3 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>
              <User size={18} />
              <span className="h-5 w-px" style={{ background: `${theme.primaryText}66` }} aria-hidden="true" />
              {props.cta}
            </span>
          ) : (
            <Menu size={22} aria-label="Open menu" />
          )}
        </div>
      </header>
    )
  }
  if (props.layout === 'athletic') {
    return (
      <header className={cn('flex items-center justify-between gap-6', pick(device, { desktop: 'px-10 py-4', tablet: 'px-6 py-4', mobile: 'px-5 py-4' }))} style={{ background: theme.text, color: theme.background }}>
        <div className="flex items-center gap-2.5">
          <span style={{ color: theme.primary }}><Icon name={props.icon} size={24} /></span>
          <span className="font-sans text-lg font-black uppercase tracking-tight">{props.brand}</span>
        </div>
        {device === 'desktop' && (
          <nav aria-label="Main navigation" className="flex items-center gap-7 text-sm font-medium">
            {props.links.map((link, index) => (
              <span key={link} className={cn('whitespace-nowrap pb-1', index === 0 && 'border-b-2')} style={index === 0 ? { borderColor: theme.primary, color: theme.primary } : undefined}>{link}</span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-4">
          {device !== 'mobile' && (
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-md px-5 py-2.5 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>
              {props.cta}<ArrowRight size={15} />
            </span>
          )}
          {device !== 'desktop' && <Menu size={24} aria-label="Open menu" />}
        </div>
      </header>
    )
  }
  if (props.layout === 'aesthetic') {
    return (
      <header className={cn('flex items-center justify-between gap-6', pick(device, { desktop: 'px-14 py-7', tablet: 'px-8 py-6', mobile: 'px-5 py-5' }))} style={{ background: theme.background, color: theme.text }}>
        <div className="min-w-0">
          <span className={cn('block whitespace-nowrap font-display uppercase leading-none tracking-[0.16em]', device === 'mobile' ? 'text-xl' : 'text-[26px]')}>{props.brand}</span>
          {props.subtitle && <span className="mt-2 block whitespace-nowrap text-[9px] uppercase tracking-[0.32em]" style={{ color: `${theme.text}99` }}>{props.subtitle}</span>}
        </div>
        {device === 'desktop' && (
          <nav aria-label="Main navigation" className="flex items-center gap-9 text-[11px] font-medium uppercase tracking-[0.18em]">
            {props.links.map((link) => <span key={link} className="whitespace-nowrap">{link}</span>)}
          </nav>
        )}
        <div className="flex items-center gap-5">
          {device !== 'mobile' && (
            <span className="inline-flex whitespace-nowrap px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ background: theme.primary, color: theme.primaryText }}>{props.cta}</span>
          )}
          {device !== 'desktop' && <Menu size={24} aria-label="Open menu" />}
        </div>
      </header>
    )
  }
  if (props.layout === 'elevate') {
    return (
      <header className={cn('flex items-center justify-between gap-4 py-5', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))} style={{ background: theme.background, color: theme.text }}>
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: theme.primary, color: theme.primaryText }}>
            <Icon name={props.icon} size={20} />
          </span>
          <span className="min-w-0 border-l pl-3" style={{ borderColor: `${theme.text}33` }}>
            <span className="block whitespace-nowrap font-display text-xl font-semibold leading-none">{props.brand}</span>
            {props.subtitle && <span className="mt-1 block whitespace-nowrap text-[10px] uppercase tracking-[0.14em]" style={{ color: `${theme.text}99` }}>{props.subtitle}</span>}
          </span>
        </div>
        {device === 'desktop' && (
          <nav className="flex items-center gap-8 text-sm font-medium">
            {props.links.map((link) => <span key={link} className="whitespace-nowrap">{link}</span>)}
          </nav>
        )}
        <div className="flex items-center gap-4">
          {props.showSearch && device !== 'mobile' && <Search size={18} aria-label="Search" />}
          {device !== 'mobile' && <User size={18} aria-label="Account" />}
          {device !== 'mobile' && (
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>
              {props.cta}<ArrowRight size={15} />
            </span>
          )}
          {device !== 'desktop' && <span className="flex h-10 w-10 items-center justify-center"><Menu size={24} aria-label="Open menu" /></span>}
        </div>
      </header>
    )
  }
  if (props.layout === 'academy') {
    return (
      <header
        className={cn('flex items-center justify-between gap-4 border-b py-4', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))}
        style={{ background: theme.background, borderColor: `${theme.text}14`, color: theme.text }}
      >
        <div className="flex min-w-0 items-center gap-2.5" style={{ color: theme.primary }}>
          <Icon name={props.icon} size={device === 'mobile' ? 30 : 36} strokeWidth={2} className="shrink-0" />
          <span className="min-w-0">
            <span className={cn('block whitespace-nowrap font-sans font-black uppercase leading-none tracking-tight', device === 'mobile' ? 'text-base' : 'text-xl')}>{props.brand}</span>
            {props.subtitle && <span className="mt-1 block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: theme.primary }}>{props.subtitle}</span>}
          </span>
        </div>
        {device === 'desktop' && (
          <nav className="flex items-center gap-5 text-sm font-medium">
            {props.links.map((link, index) => (
              <span key={link} className={cn('whitespace-nowrap', index === 0 && 'font-semibold')} style={index === 0 ? { color: theme.primary } : undefined}>{link}</span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-2.5">
          {props.phone && device === 'desktop' && (
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold" style={{ borderColor: theme.primary, color: theme.primary }}>
              <Icon name="phone" size={15} />{props.phone}
            </span>
          )}
          {device !== 'mobile' && (
            <span className="inline-flex whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-white" style={{ background: theme.primary }}>{props.cta}</span>
          )}
          {device !== 'desktop' && (
            <span className="flex h-10 w-10 items-center justify-center"><Menu size={24} /></span>
          )}
        </div>
      </header>
    )
  }
  if (props.layout === 'boutique') {
    return (
      <header className={cn('border-b bg-white', pick(device, { desktop: 'px-12', tablet: 'px-6', mobile: 'px-4' }))} style={{ borderColor: `${theme.text}14`, color: theme.text }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center py-4">
          {device === 'desktop' ? (
            <nav aria-label="Main navigation" className="flex items-center gap-7 text-[13px] font-medium" style={{ color: theme.muted }}>
              {props.links.map((link) => <span key={link} className="whitespace-nowrap">{link}</span>)}
            </nav>
          ) : (
            <span className="flex justify-start"><Menu size={22} aria-label="Open menu" /></span>
          )}
          <span className={cn('whitespace-nowrap font-sans font-semibold uppercase tracking-[0.35em]', device === 'mobile' ? 'text-lg' : 'text-2xl')}>{props.brand}</span>
          <div className="flex items-center justify-self-end gap-4">
            {props.showSearch && <Search size={device === 'mobile' ? 18 : 20} aria-label="Search" />}
            {device !== 'mobile' && <User size={20} aria-label="Account" />}
            {device === 'desktop' && <Heart size={20} aria-label="Wishlist" />}
            <span className="relative" aria-label="Bag, 0 items">
              <ShoppingBag size={device === 'mobile' ? 18 : 20} />
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">0</span>
            </span>
          </div>
        </div>
      </header>
    )
  }
  if (props.layout === 'bakery') {
    const links = device === 'tablet' ? props.links.filter((link) => ['Home', 'Our Menu', 'Café'].includes(link)) : props.links
    return (
      <header className={cn('border-b border-[#4d2414]/10 bg-[#fffaf5] py-3', pick(device, {
        desktop: 'px-12',
        tablet: 'px-8',
        mobile: 'px-5',
      }))} style={{ color: theme.text }}>
        <div className={cn('mx-auto grid max-w-[1200px] items-center gap-3', pick(device, {
          desktop: 'grid-cols-[140px_minmax(0,1fr)_auto]',
          tablet: 'grid-cols-[125px_minmax(0,1fr)_auto]',
          mobile: 'grid-cols-[minmax(0,1fr)_auto]',
        }))}>
          <div className="flex items-center gap-2.5">
            <Icon name="croissant" size={25} className="shrink-0 text-[#702d12]" />
            <span className="min-w-0 text-[#542413]">
              <span className={cn('block whitespace-nowrap font-display font-bold italic leading-none', device === 'mobile' ? 'text-lg' : 'text-xl')}>{props.brand}</span>
              <span className="mt-1 block text-center text-[8px] font-semibold tracking-[0.3em]">BAKERY</span>
            </span>
          </div>
          {device !== 'mobile' && (
            <nav aria-label="Main navigation" className={cn('flex items-center justify-center font-medium text-[#37251e]', device === 'desktop' ? 'gap-5 text-sm' : 'gap-3 text-xs')}>
              {links.map((link, index) => (
                <span key={link} className={cn('whitespace-nowrap py-2', index === 0 && 'border-b border-[#542413] text-[#542413]')}>{link}</span>
              ))}
            </nav>
          )}
          <div className={cn('flex items-center justify-self-end', device === 'mobile' ? 'gap-1' : 'gap-3')}>
            {props.showSearch && device !== 'mobile' && (
              <span role="img" aria-label="Search" className="flex h-9 w-9 items-center justify-center text-[#542413]">
                <Search size={18} />
              </span>
            )}
            <span role="img" aria-label="Shopping cart, 1 item" className="relative flex h-9 w-9 items-center justify-center text-[#542413]">
              <ShoppingCart size={19} />
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#542413] px-1 text-[9px] font-semibold text-white">1</span>
            </span>
            <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#542413] font-semibold text-white', device === 'mobile' ? 'px-2.5 py-2 text-[10px]' : 'px-4 py-2 text-xs')}>
              {props.cta}<ArrowRight size={14} />
            </span>
            {device === 'mobile' && (
              <span role="img" aria-label="Open menu" className="flex h-9 w-8 items-center justify-center text-[#542413]">
                <Menu size={21} />
              </span>
            )}
          </div>
        </div>
      </header>
    )
  }
  return (
    <>
      {props.announcement && (
        <div className={cn('flex items-center justify-between gap-4 py-2.5 text-xs font-medium tracking-wide', px)} style={{ background: theme.text, color: theme.background }}>
          <span className="flex items-center gap-2"><Leaf size={14} />{props.announcement}</span>
          {device !== 'mobile' && <span className="inline-flex shrink-0 items-center gap-2 uppercase">Claim offer <ArrowRight size={14} /></span>}
        </div>
      )}
      <header
        className={cn(
          'grid items-center border-b py-4',
          pick(device, {
            desktop: 'grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4',
            tablet: 'grid-cols-[minmax(0,1fr)_auto] gap-3',
            mobile: 'grid-cols-[minmax(0,1fr)_auto] gap-2',
          }),
          px,
        )}
        style={{ borderColor: `${theme.text}14` }}
      >
        <div className="flex items-center gap-2.5">
          <span className={cn('flex h-9 w-9 items-center justify-center', btn === 'rounded-full' ? 'rounded-full' : 'rounded-lg')} style={{ background: theme.primary, color: theme.primaryText }}>
            <Icon name={props.icon} size={19} />
          </span>
          <span className={cn(props.announcement ? 'text-lg uppercase tracking-[0.16em]' : 'text-xl', heading)}>{props.brand}</span>
        </div>
        {device === 'desktop' && (
          <nav className="flex items-center justify-center gap-6 text-[13px] font-medium uppercase tracking-wide" style={{ color: theme.muted }}>
            {props.links.map((l) => <span key={l}>{l}</span>)}
          </nav>
        )}
        <div className="flex items-center justify-self-end gap-3">
          {props.showSearch && (
            <span role="img" aria-label="Search" className="flex h-10 w-10 items-center justify-center rounded-full" style={{ color: theme.text }}>
              <Search size={19} />
            </span>
          )}
          {device !== 'mobile' && (
            <span className={cn('inline-flex px-5 py-2.5 text-sm font-semibold', btn)} style={{ background: theme.primary, color: theme.primaryText }}>{props.cta}</span>
          )}
          {device !== 'desktop' && <span className="flex h-10 w-10 items-center justify-center"><Menu size={24} /></span>}
        </div>
      </header>
    </>
  )
}

export function HeroSection({ props }: { props: HeroProps }) {
  const { theme, device, heading, h1, lead, px, card } = useTokens()
  const centered = props.layout === 'centered'
  const stacked = device === 'mobile' || centered

  if (props.layout === 'nexora') {
    const lines = props.title.split('\n')
    const accent = (line: string) => {
      if (!props.highlight || !line.includes(props.highlight)) return line
      const [before, after] = line.split(props.highlight)
      return (
        <>
          {before}
          <span style={{ color: theme.primary }}>{props.highlight}</span>
          {after}
        </>
      )
    }
    return (
      <section className="relative overflow-hidden" style={{ background: theme.background, color: theme.text }}>
        <div className={cn('grid items-center', pick(device, { desktop: 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 px-12 pb-4 pt-14', tablet: 'grid-cols-1 gap-8 px-8 pb-4 pt-12', mobile: 'grid-cols-1 gap-8 px-5 pb-2 pt-10' }))}>
          <div>
            <h2 className={cn('font-sans font-bold leading-[1.05] tracking-tight', pick(device, { desktop: 'text-[60px]', tablet: 'text-[48px]', mobile: 'text-[38px]' }))}>
              {lines.map((line) => <span key={line} className="block">{accent(line)}</span>)}
            </h2>
            <p className="mt-6 max-w-[420px] text-base leading-relaxed" style={{ color: theme.muted }}>{props.subtitle}</p>
            {props.benefits && (
              <ul className="mt-10 grid grid-cols-3 gap-6">
                {props.benefits.map((benefit) => (
                  <li key={benefit.title} className="text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: theme.secondary, color: theme.primary }}>
                      <Icon name={benefit.icon} size={24} />
                    </span>
                    <p className="mt-3 text-sm font-semibold leading-snug">{benefit.title}</p>
                    <p className="mt-1 text-xs leading-snug" style={{ color: theme.muted }}>{benefit.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={cn('relative overflow-hidden rounded-[2rem]', pick(device, { desktop: 'h-[460px]', tablet: 'h-[380px]', mobile: 'h-[300px]' }))}>
            <ImageArt priority icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center'} className="h-full w-full object-cover" />
          </div>
        </div>
        {props.searchFields && (
          <div className={cn('relative z-10 rounded-2xl bg-white shadow-xl', pick(device, { desktop: 'mx-12 -mt-14 flex items-end gap-4 p-6', tablet: 'mx-8 -mt-10 grid grid-cols-2 gap-4 p-5', mobile: 'mx-5 mb-6 grid gap-4 p-5' }))} style={{ color: theme.text }}>
            {props.searchFields.map((field) => (
              <div key={field.label} className="min-w-0 flex-1">
                <p className="mb-2 text-xs font-semibold">{field.label}</p>
                <div className="rounded-lg border px-3 py-3 text-sm" style={{ borderColor: `${theme.text}1f`, color: theme.muted }}>{field.placeholder}</div>
              </div>
            ))}
            <span className={cn('inline-flex shrink-0 items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold', device === 'mobile' && 'w-full')} style={{ background: theme.primary, color: theme.primaryText }}>{props.primaryCta}</span>
          </div>
        )}
      </section>
    )
  }

  if (props.layout === 'athletic') {
    return (
      <section className="relative overflow-hidden" style={{ background: theme.text, color: theme.background }}>
        <div className="relative flex flex-col justify-end" style={{ aspectRatio: device === 'mobile' ? '4 / 5' : '1633 / 963' }}>
          <div className="absolute inset-0 overflow-hidden">
            <ImageArt priority icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center 30%'} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(180deg, ${theme.text}40 0%, ${theme.text}26 40%, ${theme.text}e6 100%)` }} />
          <h2 className={cn('relative z-10 font-sans font-bold leading-[0.95] tracking-tight', pick(device, { desktop: 'px-10 text-[104px]', tablet: 'px-6 text-[72px]', mobile: 'px-5 text-[38px]' }))} style={{ color: theme.primary }}>
            {props.title.split('\n').map((line) => <span key={line} className="block">{line}</span>)}
          </h2>
          <div className={cn('relative z-10 w-fit max-w-[320px] border backdrop-blur-sm', pick(device, { desktop: 'mb-10 ml-10 p-6', tablet: 'mb-8 ml-6 p-5', mobile: 'mb-6 ml-5 p-4' }))} style={{ background: `${theme.text}b3`, borderColor: `${theme.background}26` }}>
            {props.eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>}
            <p className="mt-2 text-xl leading-snug">{props.subtitle}</p>
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'aesthetic') {
    const lines = props.title.split('\n')
    const image = (className: string) => (
      <ImageArt priority icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center 30%'} className={className} />
    )
    return (
      <section className="relative overflow-hidden" style={{ background: theme.background, color: theme.text }}>
        {device === 'desktop' && (
          <>
            <div className="absolute inset-y-0 right-0 w-[62%]">{image('h-full w-full object-cover')}</div>
            <div className="absolute inset-y-0 left-0 w-[70%]" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${theme.background} 0%, ${theme.background} 38%, ${theme.background}00 100%)` }} />
          </>
        )}
        <div className={cn('relative z-10', pick(device, { desktop: 'flex min-h-[660px] items-center px-14 py-16', tablet: 'px-8 pb-8 pt-12', mobile: 'px-5 pb-8 pt-10' }))}>
          <div className="max-w-[460px]">
            {props.eyebrow && <p className={cn('uppercase tracking-[0.22em]', device === 'mobile' ? 'text-[10px]' : 'text-[11px]')} style={{ color: `${theme.text}b3` }}>{props.eyebrow}</p>}
            <h2 className={cn('mt-6 font-display font-normal uppercase leading-[1.02] tracking-[0.02em]', pick(device, { desktop: 'text-[76px]', tablet: 'text-6xl', mobile: 'text-[44px]' }))}>
              {lines.map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
            <span className="mt-8 block h-px w-12" style={{ background: theme.text }} aria-hidden="true" />
            <p className={cn('mt-7 max-w-[320px] leading-relaxed', device === 'mobile' ? 'text-sm' : 'text-[15px]')} style={{ color: `${theme.text}bf` }}>{props.subtitle}</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <span className="inline-flex whitespace-nowrap px-9 py-4 text-[11px] font-medium uppercase tracking-[0.2em]" style={{ background: theme.primary, color: theme.primaryText }}>{props.primaryCta}</span>
              {props.secondaryCta && <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] underline underline-offset-8">{props.secondaryCta}</span>}
            </div>
          </div>
        </div>
        {device !== 'desktop' && (
          <div className={cn('relative overflow-hidden', device === 'mobile' ? 'h-[320px]' : 'h-[400px]')}>{image('h-full w-full object-cover')}</div>
        )}
        {props.sealText && device === 'desktop' && (
          <div className="absolute bottom-16 right-[24%] z-10 flex h-[132px] w-[132px] items-center justify-center rounded-full" style={{ background: theme.background, color: theme.text }} aria-hidden="true">
            <svg viewBox="0 0 132 132" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="aesthetic-seal-ring" d="M66,66 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
              </defs>
              <text className="fill-current text-[9px] uppercase tracking-[0.28em]">
                <textPath href="#aesthetic-seal-ring">{props.sealText} · {props.sealText} ·</textPath>
              </text>
            </svg>
            <Icon name="sparkles" size={26} />
          </div>
        )}
      </section>
    )
  }

  if (props.layout === 'elevate') {
    const lines = props.title.split('\n')
    const image = (className: string) => (
      <ImageArt priority icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center 30%'} className={className} />
    )
    return (
      <section className="relative overflow-hidden" style={{ background: theme.background, color: theme.text }}>
        {device === 'desktop' && (
          <>
            <div className="absolute inset-0">{image('h-full w-full object-cover')}</div>
            <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${theme.background} 0%, ${theme.background}e6 36%, ${theme.background}00 72%)` }} />
          </>
        )}
        <div className={cn('relative z-10', pick(device, { desktop: 'flex min-h-[600px] items-center px-12 py-20', tablet: 'px-8 pb-8 pt-14', mobile: 'px-5 pb-6 pt-12' }))}>
          <div className="max-w-[520px]">
            <h2 className={cn('font-display font-normal leading-[1.05] tracking-tight', pick(device, { desktop: 'text-[64px]', tablet: 'text-5xl', mobile: 'text-[42px]' }))}>
              {lines.map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
            <p className={cn('mt-6 max-w-[400px] leading-relaxed', device === 'mobile' ? 'text-sm' : 'text-base')} style={{ color: `${theme.text}b3` }}>{props.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <span className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>
                {props.primaryCta}<ArrowRight size={16} />
              </span>
              {props.secondaryCta && (
                <span className="inline-flex items-center gap-3 text-sm font-semibold">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border" style={{ borderColor: `${theme.text}55` }}>
                    <Play size={14} fill="currentColor" />
                  </span>
                  {props.secondaryCta}
                </span>
              )}
            </div>
          </div>
        </div>
        {device !== 'desktop' && (
          <div className={cn('relative overflow-hidden', props.imageAspect === 'portrait' ? undefined : device === 'mobile' ? 'h-[300px]' : 'h-[380px]')} style={props.imageAspect === 'portrait' ? { aspectRatio: '4 / 5' } : undefined}>{image('h-full w-full object-cover')}</div>
        )}
      </section>
    )
  }

  if (props.layout === 'boutique') {
    const lines = props.title.split('\n')
    return (
      <section className={cn('relative flex items-center overflow-hidden text-white', pick(device, { desktop: 'min-h-[600px]', tablet: 'min-h-[520px]', mobile: 'min-h-[460px]' }))}>
        <ImageArt priority icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center 35%'} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" aria-hidden="true" />
        <div className={cn('relative z-10 max-w-[560px]', pick(device, { desktop: 'px-14 py-16', tablet: 'px-10 py-12', mobile: 'px-6 py-14' }))}>
          {props.eyebrow && <p className="text-xs uppercase tracking-[0.25em] text-white/90">{props.eyebrow}</p>}
          <h2 className={cn('mt-4 font-sans font-normal uppercase leading-[1.05] tracking-[0.02em]', pick(device, { desktop: 'text-[56px]', tablet: 'text-5xl', mobile: 'text-[38px]' }))}>
            {lines.map((line) => <span key={line} className="block">{line}</span>)}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/90">{props.subtitle}</p>
          <span className="mt-8 inline-flex items-center bg-white px-7 py-3 text-sm font-medium text-black">{props.primaryCta}</span>
        </div>
      </section>
    )
  }
  if (props.layout === 'academy') {
    const lines = props.title.split('\n')
    const benefits = props.benefits ?? []
    const image = (className: string) => (
      <ImageArt priority icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center center'} className={className} />
    )
    return (
      <section className="relative overflow-hidden" style={{ background: theme.background }}>
        {device === 'desktop' && (
          <>
            <div className="absolute inset-0">{image('h-full w-full object-cover')}</div>
            <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${theme.background} 0%, ${theme.background}f2 34%, ${theme.background}00 70%)` }} />
          </>
        )}
        <div className={cn('relative z-10 mx-auto max-w-[1200px]', pick(device, { desktop: 'flex min-h-[460px] flex-col justify-center px-12 py-16', tablet: 'px-8 pt-12', mobile: 'px-5 pt-10' }))}>
          <div className="max-w-[500px]">
            <h2 className={cn('font-sans font-black uppercase leading-[1.02] tracking-tight', pick(device, { desktop: 'text-[56px]', tablet: 'text-5xl', mobile: 'text-[38px]' }))} style={{ color: theme.text }}>
              {lines.map((line, index) => (
                <span key={line} className="block" style={index === lines.length - 1 ? { color: ACCENT_BLUE } : undefined}>{line}</span>
              ))}
            </h2>
            <p className={cn('mt-5 max-w-[420px] leading-relaxed', device === 'mobile' ? 'text-sm' : 'text-base')} style={{ color: theme.muted }}>{props.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white" style={{ background: theme.primary }}>
                <Icon name="calendar" size={17} />{props.primaryCta}
              </span>
              {props.secondaryCta && (
                <span className="inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3.5 text-sm font-semibold" style={{ borderColor: theme.primary, color: theme.primary }}>
                  {props.secondaryCta}<ArrowRight size={16} />
                </span>
              )}
            </div>
          </div>
          {device === 'desktop' && benefits.length > 0 && (
            <ul className="mt-12 flex max-w-[640px] flex-wrap gap-x-8 gap-y-3 border-t pt-6" style={{ borderColor: `${theme.text}14` }}>
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: theme.text }}>
                  <span style={{ color: theme.primary }}><Icon name={benefit.icon} size={20} /></span>{benefit.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        {device !== 'desktop' && (
          <>
            <div className={cn('relative mt-8 overflow-hidden', device === 'mobile' ? 'h-[230px]' : 'h-[300px]')}>{image('h-full w-full object-cover')}</div>
            {benefits.length > 0 && (
              <ul className={cn('grid gap-4 px-5 py-8', device === 'mobile' ? 'grid-cols-2' : 'grid-cols-4 px-8')}>
                {benefits.map((benefit) => (
                  <li key={benefit.title} className="flex flex-col items-center gap-2 text-center text-xs font-medium" style={{ color: theme.text }}>
                    <span style={{ color: theme.primary }}><Icon name={benefit.icon} size={22} /></span>{benefit.title}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    )
  }

  if (props.layout === 'bakery') {
    const trustItems = props.benefits ?? []
    return (
      <section className="overflow-hidden" style={{ background: theme.background }}>
        <div className={cn('relative mx-auto max-w-[1440px] overflow-hidden', pick(device, {
          desktop: 'min-h-[420px]',
          tablet: 'min-h-[390px]',
          mobile: '',
        }))}>
          {device !== 'mobile' && (
            <>
              <ImageArt priority
                icon={props.imageIcon}
                label={props.imageLabel}
                imageUrl={props.imageUrl}
                imagePosition={props.imagePosition ?? 'center center'}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f1] from-0% via-[#fff8f1]/95 via-40% to-transparent to-75%" aria-hidden="true" />
              {props.handwritten && (
                <p className={cn('absolute right-10 top-7 z-10 -rotate-6 font-script leading-[1.05] text-[#7a4a33]/80', device === 'desktop' ? 'text-3xl' : 'text-2xl')} aria-hidden="true">
                  {props.handwritten.map((line) => <span key={line} className="block">{line}</span>)}
                </p>
              )}
            </>
          )}
          <div className={cn('relative z-10 mx-auto w-full max-w-[1200px]', pick(device, {
            desktop: 'px-12 py-14',
            tablet: 'px-10 py-12',
            mobile: 'px-6 pb-5 pt-9',
          }))}>
            <div className={cn('max-w-[440px]', device === 'mobile' && 'max-w-none')}>
              {props.eyebrow && (
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8d4a2d] sm:text-xs">
                  {props.eyebrow}
                </p>
              )}
              <h2 className={cn(heading, 'text-[#351b12]', pick(device, {
                desktop: 'text-[48px] leading-[0.99]',
                tablet: 'text-[42px] leading-[1.02]',
                mobile: 'max-w-[340px] text-[36px] leading-[1.02]',
              }))}>{props.title}</h2>
              <p className={cn('mt-3 max-w-[340px] text-sm leading-[1.5] text-[#72584b]', device === 'mobile' && 'text-[13px]')}>
                {props.subtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#542413] px-5 py-2.5 text-xs font-semibold text-white">
                  {props.primaryCta}<ArrowRight size={15} />
                </span>
                {props.secondaryCta && (
                  <span className="inline-flex items-center rounded-full border border-[#542413]/35 px-5 py-2.5 text-xs font-semibold text-[#542413]">
                    {props.secondaryCta}
                  </span>
                )}
              </div>
              {device !== 'mobile' && trustItems.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {trustItems.map((item) => (
                    <div key={item.title} className="flex items-center gap-2 text-[#542413]">
                      <Icon name={item.icon} size={22} />
                      <span className="max-w-[82px] text-[10px] font-medium leading-tight">{item.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {device === 'mobile' && (
            <>
              <div className="h-[205px] overflow-hidden">
                <ImageArt priority
                  icon={props.imageIcon}
                  label={props.imageLabel}
                  imageUrl={props.imageUrl}
                  imagePosition={props.imagePosition ?? '78% center'}
                  className="h-full w-full object-cover"
                />
              </div>
              {trustItems.length > 0 && (
                <div className="grid grid-cols-3 gap-2 px-4 py-4">
                  {trustItems.map((item) => (
                    <div key={item.title} className="flex items-center gap-1.5 text-[#542413]">
                      <Icon name={item.icon} size={20} />
                      <span className="text-[9px] font-medium leading-tight">{item.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    )
  }

  if (props.layout === 'overlay') {
    return (
      <section className={cn('relative pb-10', props.benefits && 'mb-10')}>
        <div className={cn('relative flex items-end overflow-hidden', pick(device, {
          desktop: 'aspect-[1600/579] min-h-[380px]',
          tablet: 'min-h-[340px]',
          mobile: props.mobileHeroHeight === 'tall' ? 'min-h-[480px]' : 'aspect-[4/3]',
        }))}>
          <ImageArt priority
            icon={props.imageIcon}
            label={props.imageLabel}
            imageUrl={props.imageUrl}
            imagePosition={props.imagePosition ?? pick(device, { desktop: 'center center', tablet: '62% center', mobile: '62% 38%' })}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" aria-hidden="true" />
          <div className={cn('relative z-10 mx-auto w-full max-w-[1100px]', px, pick(device, {
            desktop: 'pb-24 pt-24',
            mobile: props.mobileHeroHeight === 'tall' ? 'pb-14 pt-14' : 'pb-20 pt-20',
          }))}>
            <div className="max-w-2xl text-white">
              {props.eyebrow && <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white/85">{props.eyebrow}</p>}
              <h2 className={cn(heading, h1)}>{props.title}</h2>
              <p className={cn('mt-5 max-w-lg', lead, 'text-white/85')}>{props.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton>{props.primaryCta}<ArrowRight size={18} /></PrimaryButton>
                {props.secondaryCta && <GhostButton onDark outline={props.secondaryCtaStyle === 'outline'}>{props.secondaryCta}</GhostButton>}
              </div>
            </div>
          </div>
        </div>
        {props.benefits && (
          <div className={cn('relative z-20 mx-auto -mt-12 grid max-w-[1100px] overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-slate-900/5', px, device === 'mobile' ? cols(Math.min(props.benefits.length, 2)) : props.benefits.length === 5 ? 'grid-cols-5' : cols(Math.min(props.benefits.length, 4)))}>
            {props.benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className={cn('flex flex-col items-center px-4 py-5 text-center', index > 0 && 'border-l border-slate-200')}
              >
                <span className="mb-3" style={{ color: theme.primary }}><Icon name={benefit.icon} size={24} /></span>
                <h3 className="text-sm font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-1.5 max-w-[13rem] text-xs leading-relaxed text-ink-soft">{benefit.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    )
  }

  const text = (
    <div className={cn(centered && 'mx-auto max-w-3xl text-center')}>
      {props.eyebrow && (
        <span className="mb-5 inline-block rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: theme.secondary, color: theme.primary }}>
          {props.eyebrow}
        </span>
      )}
      {/* h2, not h1: the renderer is embedded inside host pages that own the single h1. */}
      <h2 className={cn(heading, h1)}>{props.title}</h2>
      <p className={cn('mt-6', lead)} style={{ color: theme.muted }}>{props.subtitle}</p>
      <div className={cn('mt-9 flex flex-wrap gap-3', centered && 'justify-center')}>
        <PrimaryButton>{props.primaryCta}<ArrowRight size={18} /></PrimaryButton>
        {props.secondaryCta && <GhostButton>{props.secondaryCta}</GhostButton>}
      </div>
      {props.stats && (
        <dl className={cn('mt-12 flex gap-10', centered && 'justify-center', device === 'mobile' && 'gap-6')}>
          {props.stats.map((s) => (
            <div key={s.label}>
              <dt className={cn('text-3xl', heading)}>{s.value}</dt>
              <dd className="mt-1 text-sm" style={{ color: theme.muted }}>{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )

  const image = (
    <div className={cn('overflow-hidden shadow-xl', card, centered ? 'mx-auto mt-14 aspect-[16/7] max-w-4xl' : props.imageAspect === 'landscape' ? pick(device, { desktop: 'aspect-[4/3]', mobile: 'mt-10 aspect-[4/3]' }) : pick(device, { desktop: 'aspect-[4/5]', mobile: 'mt-10 aspect-[4/3]' }))}>
      <ImageArt priority icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition} />
    </div>
  )

  return (
    <section
      className={cn(px, props.benefits ? 'pb-10 pt-12' : pick(device, { desktop: 'py-20', mobile: 'py-10' }))}
      style={props.benefits ? { background: `linear-gradient(110deg, ${theme.secondary} 0%, ${theme.background} 72%)` } : undefined}
    >
      <div className={cn('mx-auto max-w-[1100px]', !stacked && 'grid grid-cols-[1.1fr_0.9fr] items-center gap-16')}>
        {text}
        {image}
      </div>
      {props.benefits && (
        <div className={cn('mx-auto mt-10 grid max-w-[1100px] gap-5 border-t border-sky-200/70 pt-6', pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2', mobile: 'grid-cols-2' }))}>
          {props.benefits.map((benefit) => (
            <article key={benefit.title} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0" style={{ color: theme.primary }}><Icon name={benefit.icon} size={22} /></span>
              <div>
                <h3 className="text-sm font-semibold">{benefit.title}</h3>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: theme.muted }}>{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export function StorySection({ props }: { props: StoryProps }) {
  const { theme, device, heading, h2, lead, px, py, card, btn } = useTokens()
  const [first, second] = props.images
  if (props.layout === 'committed') {
    const image = props.images[0]
    return (
      <section className={cn(px, pick(device, { desktop: 'py-20', tablet: 'py-16', mobile: 'py-12' }))} style={{ background: theme.secondary, color: theme.text }}>
        <div className={cn('mx-auto grid max-w-[1200px] items-center', pick(device, { desktop: 'grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)] gap-12', tablet: 'grid-cols-2 gap-10', mobile: 'grid-cols-1 gap-10' }))}>
          <div>
            {props.eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>}
            <h2 className={cn('mt-3 font-sans font-bold leading-tight tracking-tight', pick(device, { desktop: 'text-4xl', tablet: 'text-3xl', mobile: 'text-3xl' }))}>{props.title}</h2>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: theme.muted }}>{props.description}</p>
            {props.buttonLabel && (
              <span className="mt-7 inline-flex rounded-lg px-6 py-3 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>{props.buttonLabel}</span>
            )}
          </div>
          <ul className="space-y-7">
            {props.stats?.map((stat) => (
              <li key={stat.label} className="flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: theme.background, color: theme.primary }}>
                  <Icon name={stat.icon} size={22} />
                </span>
                <span>
                  <span className="block font-sans text-3xl font-bold leading-none">{stat.value}</span>
                  <span className="mt-1 block text-sm" style={{ color: theme.muted }}>{stat.label}</span>
                </span>
              </li>
            ))}
          </ul>
          {image && (
            <div className={cn('relative overflow-hidden rounded-2xl', device !== 'desktop' && 'col-span-full')} style={{ aspectRatio: '888 / 735' }}>
              <div className="absolute inset-0">
                <ImageArt icon="stethoscope" imageUrl={image.imageUrl} imagePosition={image.imagePosition ?? 'center'} label={image.label} />
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  if (props.layout === 'wellness') {
    const image = props.images[0]
    const lines = props.title.split('\n')
    return (
      <section className="relative overflow-hidden" style={{ background: theme.secondary, color: theme.text }}>
        <div className={cn('grid items-center', pick(device, { desktop: 'grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]', tablet: 'grid-cols-1', mobile: 'grid-cols-1' }))}>
          {image && (
            <div className="relative overflow-hidden" style={{ aspectRatio: '1376 / 1143' }}>
              <div className="absolute inset-0">
                <ImageArt icon="heart" imageUrl={image.imageUrl} imagePosition={image.imagePosition ?? 'center'} label={image.label} />
              </div>
            </div>
          )}
          <div className={pick(device, { desktop: 'px-14 py-16', tablet: 'px-8 py-12', mobile: 'px-5 py-12' })}>
            {props.eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>}
            <h2 className={cn('mt-3 font-sans font-bold leading-tight tracking-tight', pick(device, { desktop: 'text-5xl', tablet: 'text-4xl', mobile: 'text-3xl' }))}>
              {lines.map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
            <p className="mt-5 max-w-[460px] text-sm leading-relaxed" style={{ color: theme.muted }}>{props.description}</p>
            {props.buttonLabel && (
              <span className="mt-7 inline-flex rounded-lg px-6 py-3 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>{props.buttonLabel}</span>
            )}
            {props.stats && (
              <ul className="mt-10 space-y-7">
                {props.stats.map((stat) => (
                  <li key={stat.label} className="flex items-center gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: theme.background, color: theme.primary }}>
                      <Icon name={stat.icon} size={22} />
                    </span>
                    <span>
                      <span className="block font-sans text-3xl font-bold leading-none">{stat.value}</span>
                      <span className="mt-1 block text-sm" style={{ color: theme.muted }}>{stat.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'athletic') {
    const [big, small] = props.images
    return (
      <section className={cn(px, pick(device, { desktop: 'py-20', tablet: 'py-16', mobile: 'py-12' }))} style={{ background: theme.background, color: theme.text }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{props.eyebrow}</span>
            <span className="h-px flex-1" style={{ background: `${theme.text}22` }} aria-hidden="true" />
          </div>
          <div className={cn('mt-8 grid gap-10', pick(device, { desktop: 'grid-cols-2', tablet: 'grid-cols-1', mobile: 'grid-cols-1' }))}>
            <h2 className={cn('font-sans font-black uppercase leading-[0.95] tracking-tight', pick(device, { desktop: 'text-[68px]', tablet: 'text-5xl', mobile: 'text-4xl' }))}>
              {props.highlight && props.title.includes(props.highlight) ? (
                <>
                  {props.title.split(props.highlight)[0]}
                  <span style={{ color: theme.primary }}>{props.highlight}</span>
                  {props.title.split(props.highlight)[1]}
                </>
              ) : props.title}
            </h2>
            <div className={cn('grid gap-6 self-end', pick(device, { desktop: 'grid-cols-2', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
              <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>{props.description}</p>
              <div>
                {props.details && <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>{props.details}</p>}
                {props.buttonLabel && (
                  <span className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-md px-5 py-3 text-sm font-semibold" style={{ background: theme.text, color: theme.background }}>
                    {props.buttonLabel}<ArrowRight size={15} style={{ color: theme.primary }} />
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={cn('mt-14 grid gap-5', pick(device, { desktop: 'grid-cols-[1fr_1fr]', tablet: 'grid-cols-1', mobile: 'grid-cols-1' }))}>
            {big && (
              <div className="relative overflow-hidden rounded-md" style={{ aspectRatio: '1147 / 1372' }}>
                <div className="absolute inset-0 overflow-hidden">
                  <ImageArt icon="trophy" imageUrl={big.imageUrl} imagePosition={big.imagePosition ?? 'center'} label={big.label} />
                </div>
                {props.stats && (
                  <dl className={cn('absolute inset-x-4 bottom-4 grid gap-3', pick(device, { desktop: 'grid-cols-[1fr_1fr_auto]', tablet: 'grid-cols-[1fr_1fr_auto]', mobile: 'grid-cols-2' }))}>
                    {props.stats.map((stat) => (
                      <div key={stat.label} className="px-4 py-3" style={{ background: `${theme.text}d9`, color: theme.background }}>
                        <dt className="font-sans text-2xl font-black leading-none" style={{ color: theme.primary }}>{stat.value}</dt>
                        <dd className="mt-1 text-xs">{stat.label}</dd>
                      </div>
                    ))}
                    <div className="flex items-center justify-center px-4" style={{ background: `${theme.text}d9`, color: theme.primary }} aria-hidden="true">
                      <ArrowRight size={22} />
                    </div>
                  </dl>
                )}
              </div>
            )}
            <div className="flex flex-col gap-5">
              {small && (
                <div className="relative w-[72%] overflow-hidden rounded-md" style={{ aspectRatio: '1066 / 1475' }}>
                  <div className="absolute inset-0 overflow-hidden">
                    <ImageArt icon="trophy" imageUrl={small.imageUrl} imagePosition={small.imagePosition ?? 'center'} label={small.label} />
                  </div>
                </div>
              )}
              <div className="flex flex-1 flex-col justify-end gap-5">
                {props.milestone && (
                  <div className="flex items-end gap-4">
                    <span className="font-sans text-[120px] font-black leading-[0.8]" style={{ color: theme.primary }}>{props.milestone.value}</span>
                    <span className="pb-1 font-sans text-2xl font-semibold leading-tight">{props.milestone.label}</span>
                  </div>
                )}
                {props.highlights && (
                  <ul className="space-y-2.5 text-sm">
                    {props.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: theme.primary }} aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  if (props.layout === 'about') {
    const image = props.images[0]
    return (
      <section className={cn('relative overflow-hidden', pick(device, { desktop: 'py-20', tablet: 'py-16', mobile: 'py-12' }))} style={{ background: theme.background, color: theme.text }}>
        {image && device === 'desktop' && (
          <>
            <div className="absolute inset-0">
              <ImageArt icon="building" imageUrl={image.imageUrl} imagePosition={image.imagePosition ?? 'center'} label={image.label} />
            </div>
            <div className="absolute inset-0" aria-hidden="true" style={{ background: device === 'desktop' ? `linear-gradient(90deg, ${theme.background}f2 0%, ${theme.background}b3 38%, ${theme.background}00 80%)` : `${theme.background}bf` }} />
          </>
        )}
        {image && device !== 'desktop' && (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1600 / 553' }}>
            <ImageArt icon="building" imageUrl={image.imageUrl} imagePosition={image.imagePosition ?? 'center'} label={image.label} />
          </div>
        )}
        <div className={cn('relative z-10', px)}>
          <div className={cn('max-w-[480px]', device === 'desktop' ? 'py-16' : 'py-6')}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>
            <h2 className={cn('font-display font-normal', pick(device, { desktop: 'text-[40px] leading-[1.1]', tablet: 'text-4xl', mobile: 'text-3xl' }))}>{props.title}</h2>
            <p className="mt-5 text-sm leading-relaxed md:text-[15px]" style={{ color: theme.muted }}>{props.description}</p>
            {props.highlights && (
              <ul className="mt-6 space-y-3">
                {props.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-sm font-medium">
                    <span className="shrink-0" style={{ color: theme.primary }}><Check size={18} /></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
            {props.buttonLabel && (
              <span className="mt-7 inline-flex whitespace-nowrap px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em]" style={{ background: theme.primary, color: theme.primaryText }}>{props.buttonLabel}</span>
            )}
          </div>
          {props.stats && (
            <dl className={cn('mx-auto mt-16 grid max-w-[1100px] gap-5', pick(device, { desktop: 'grid-cols-3', tablet: 'grid-cols-3', mobile: 'grid-cols-1' }))}>
              {props.stats.map((stat) => (
                <div key={stat.label} className={cn('border px-7 py-6', card)} style={{ borderColor: `${theme.text}14`, background: theme.secondary }}>
                  <dt className={cn(heading, 'text-[34px] leading-none')}>{stat.value}</dt>
                  <dd className="mt-2 text-sm" style={{ color: theme.muted }}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>
    )
  }
  if (props.layout === 'elevate') {
    return (
      <section className={cn(px, 'py-20')} style={{ background: theme.background }}>
        <div className={cn('mx-auto grid max-w-[1100px] items-center', pick(device, {
          desktop: 'grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14',
          tablet: 'grid-cols-1 gap-10',
          mobile: 'grid-cols-1 gap-8',
        }))}>
          {first && (
            <div className={cn('overflow-hidden', card, first.aspect && device !== 'desktop' ? undefined : pick(device, { desktop: 'h-[400px]', tablet: 'h-[340px]', mobile: 'h-[260px]' }))} style={first.aspect && device !== 'desktop' ? { aspectRatio: first.aspect } : undefined}>
              <ImageArt icon="dumbbell" imageUrl={first.imageUrl} imagePosition={first.imagePosition ?? 'center 62%'} label={first.label} />
            </div>
          )}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>
            <h2 className={cn(heading, h2, pick(device, { desktop: 'text-[38px] leading-[1.1]', tablet: 'text-3xl', mobile: 'text-3xl' }))} style={{ color: theme.text }}>{props.title}</h2>
            <p className={cn('mt-4 leading-relaxed', device === 'mobile' ? 'text-sm' : 'text-base')} style={{ color: theme.muted }}>{props.description}</p>
            {props.stats && (
              <dl className={cn('mt-8 grid gap-y-6', pick(device, { desktop: 'grid-cols-3', tablet: 'grid-cols-3', mobile: 'grid-cols-3' }))}>
                {props.stats.map((stat, index) => (
                  <div key={stat.label} className={cn('min-w-0', index > 0 && 'border-l pl-5')} style={{ borderColor: `${theme.text}22` }}>
                    <dt className={cn(heading, 'text-[34px] leading-none')} style={{ color: theme.text }}>{stat.value}</dt>
                    <dd className="mt-2 text-xs leading-snug" style={{ color: theme.muted }}>{stat.label}</dd>
                  </div>
                ))}
              </dl>
            )}
            {props.buttonLabel && (
              <span className={cn('mt-8 inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold', btn)} style={{ borderColor: theme.primary, color: theme.primary }}>
                {props.buttonLabel}<ArrowRight size={16} />
              </span>
            )}
          </div>
        </div>
      </section>
    )
  }
  if (props.layout === 'bakery') {
    const stacked = device === 'mobile'
    const imageRight = props.imageSide === 'right'
    return (
      <section className="relative overflow-hidden" style={{ background: theme.background }}>
        <div className={cn('mx-auto grid max-w-[1440px]', stacked ? 'grid-cols-1' : imageRight ? 'grid-cols-[45fr_55fr]' : 'grid-cols-[55fr_45fr]')}>
          {first && (
            <div className={cn('overflow-hidden', !stacked && (imageRight ? 'order-2' : 'order-1'), pick(device, { desktop: 'min-h-[360px]', tablet: 'min-h-[300px]', mobile: 'aspect-[16/10]' }))}>
              <ImageArt icon="smile" imageUrl={first.imageUrl} imagePosition={first.imagePosition} label={first.label} />
            </div>
          )}
          <div className={cn('relative flex items-center', !stacked && (imageRight ? 'order-1' : 'order-2'), pick(device, { desktop: 'px-14 py-10', tablet: 'px-8 py-8', mobile: 'px-6 py-8' }))}>
            <div className={cn('relative max-w-[400px]', imageRight && device === 'desktop' && 'ml-auto')}>
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8d4a2d]">{props.eyebrow}</p>
              <h2 className={cn(heading, 'text-[#351b12]', pick(device, { desktop: 'text-4xl leading-[1.08]', tablet: 'text-3xl leading-[1.1]', mobile: 'text-[28px] leading-[1.1]' }))}>{props.title}</h2>
              <p className="mt-3 text-sm leading-[1.6] text-[#72584b]">{props.description}</p>
              {props.buttonLabel && (
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#542413] px-5 py-2.5 text-xs font-semibold text-white">
                  {props.buttonLabel}<ArrowRight size={14} />
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }
  if (props.layout === 'split') {
    return (
      <section className={cn(px, py)} style={{ background: theme.background }}>
        <div className={cn('mx-auto grid max-w-[1100px] items-center', pick(device, {
          desktop: 'grid-cols-2 gap-14',
          tablet: 'grid-cols-2 gap-10',
          mobile: 'grid-cols-1 gap-8',
        }))}>
          {first && (
            <div className={cn('overflow-hidden rounded-2xl shadow-lg', props.imageSide === 'right' ? 'md:order-2' : 'md:order-1', pick(device, { desktop: 'h-[340px]', tablet: 'h-[300px]', mobile: 'h-[260px]' }))}>
              <ImageArt icon="smile" imageUrl={first.imageUrl} imagePosition={first.imagePosition} label={first.label} />
            </div>
          )}
          <div className={props.imageSide === 'right' ? 'md:order-1' : 'md:order-2'}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>
            <h2 className={cn(heading, h2, 'max-w-lg', pick(device, { desktop: 'text-4xl', tablet: 'text-3xl', mobile: 'text-3xl' }))}>{props.title}</h2>
            <p className={cn('mt-4 max-w-lg', lead, 'text-base')} style={{ color: theme.muted }}>{props.description}</p>
            {props.highlights && (
              <ul className="mt-5 space-y-2.5">
                {props.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2.5 text-sm" style={{ color: theme.muted }}>
                    <span className="shrink-0" style={{ color: theme.primary }}><Check size={17} /></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
            {props.stats && (
              <dl className={cn('mt-8 grid gap-x-6 gap-y-6', pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2', mobile: 'grid-cols-2' }))}>
                {props.stats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <span className="block" style={{ color: theme.primary }}><Icon name={stat.icon} size={22} strokeWidth={1.6} /></span>
                    <dt className={cn(heading, 'mt-3 text-3xl leading-none')} style={{ color: theme.text }}>{stat.value}</dt>
                    <dd className="mt-2 text-xs leading-snug" style={{ color: theme.muted }}>{stat.label}</dd>
                  </div>
                ))}
              </dl>
            )}
            {props.buttonLabel && (
              <span className={cn('mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold', { sharp: 'rounded-none', soft: 'rounded-xl', round: 'rounded-full' }[theme.radius])} style={{ background: theme.primary, color: theme.primaryText }}>
                {props.buttonLabel}<ArrowRight size={16} />
              </span>
            )}
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className={cn(px, py)} style={{ background: '#f5f0e6' }}>
      <div className={cn('mx-auto grid max-w-[1100px] items-center', pick(device, {
        desktop: 'grid-cols-2 gap-16',
        tablet: 'grid-cols-2 gap-10',
        mobile: 'grid-cols-1 gap-10',
      }))}>
        <div className={cn('relative mx-auto w-full max-w-[500px]', pick(device, {
          desktop: 'h-[440px]',
          tablet: 'h-[360px]',
          mobile: 'h-[300px]',
        }))}>
          {first && (
            <div className="absolute right-[5%] top-0 h-[82%] w-[68%] overflow-hidden rounded-sm shadow-xl">
              <ImageArt icon="leaf" imageUrl={first.imageUrl} imagePosition={first.imagePosition ?? 'center top'} label={first.label} />
            </div>
          )}
          {second && (
            <div className="absolute bottom-0 left-[4%] h-[58%] w-[48%] overflow-hidden border-[10px] border-[#f5f0e6] shadow-lg">
              <ImageArt icon="leaf" imageUrl={second.imageUrl} label={second.label} />
            </div>
          )}
          <p className={cn('absolute bottom-8 right-0 max-w-24 text-center text-[10px] uppercase leading-5 tracking-[0.22em] text-[#52745c]', device === 'mobile' && 'hidden')}>
            Stronger<br />Balanced<br />Healthier
          </p>
        </div>
        <div className={cn(device === 'mobile' && 'text-center')}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>
          <h2 className={cn(heading, h2, 'max-w-lg', pick(device, { desktop: 'text-5xl', tablet: 'text-4xl', mobile: 'mx-auto text-4xl' }))}>{props.title}</h2>
          <p className={cn('mt-5 max-w-lg', lead)} style={{ color: theme.muted }}>{props.description}</p>
          {props.stats && (
            <dl className={cn('mt-7 grid max-w-lg gap-x-4 gap-y-5', pick(device, {
              desktop: 'grid-cols-4',
              tablet: 'grid-cols-2',
              mobile: 'mx-auto grid-cols-2 text-left',
            }))}>
              {props.stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <div className="flex items-center gap-2" style={{ color: theme.primary }}>
                    <Icon name={stat.icon} size={20} />
                    <dt className={cn(heading, 'text-xl leading-none')}>{stat.value}</dt>
                  </div>
                  <dd className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-wide" style={{ color: theme.muted }}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <blockquote className="mt-7 border-l-2 pl-4 text-sm italic leading-relaxed" style={{ borderColor: theme.primary, color: theme.muted }}>
            “{props.quote}”
          </blockquote>
          <span className={cn('mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold', { sharp: 'rounded-none', soft: 'rounded-xl', round: 'rounded-full' }[theme.radius], device === 'mobile' && 'justify-center')}>
            Our approach <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection({ props }: { props: FeaturesProps }) {
  const { theme, device, card, heading, px } = useTokens()
  if (props.layout === 'steps') {
    return (
      <section className={cn(px, 'py-16')} style={{ background: theme.background }}>
        <div className={cn('mx-auto max-w-[1200px] rounded-[2rem]', pick(device, { desktop: 'p-12', tablet: 'p-8', mobile: 'p-5' }))} style={{ background: theme.text, color: theme.background }}>
          <div className="flex items-start justify-between gap-6">
            <div>
              {props.eyebrow && (
                <span className="flex items-center gap-3 text-sm font-semibold" style={{ color: theme.primary }}>
                  <span className="h-8 w-8 shrink-0 rounded-full" style={{ background: theme.primary }} aria-hidden="true" />
                  {props.eyebrow}
                </span>
              )}
              <h2 className={cn('mt-4 font-sans font-bold leading-tight tracking-tight', pick(device, { desktop: 'text-5xl', tablet: 'text-4xl', mobile: 'text-3xl' }))}>{props.title}</h2>
            </div>
            {props.buttonLabel && (
              <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-6 py-3 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>
                {props.buttonLabel}<ArrowRight size={15} />
              </span>
            )}
          </div>
          <div className={cn('mt-12 grid gap-10', pick(device, { desktop: 'grid-cols-1', tablet: 'grid-cols-1', mobile: 'grid-cols-1' }))}>
            <div>
              {props.subtitle && <p className="text-base leading-relaxed" style={{ color: `${theme.background}cc` }}>{props.subtitle}</p>}
            </div>
            <div className={cn('grid gap-4', pick(device, { desktop: 'grid-cols-5', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
              {props.items.map((item, index) => (
                <article key={item.title} className="rounded-2xl p-6" style={{ background: `${theme.background}0f` }}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Step {index + 1}</span>
                    <span style={{ color: theme.primary }}><Icon name={item.icon} size={18} /></span>
                  </div>
                  <h3 className="mt-6 text-lg font-medium leading-snug">{item.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: `${theme.background}99` }}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'player') {
    const [small, large] = props.images ?? []
    return (
      <section className={cn(px, 'py-16')} style={{ background: theme.background }}>
        <div className={cn('mx-auto max-w-[1200px] rounded-[2rem]', pick(device, { desktop: 'p-12', tablet: 'p-8', mobile: 'p-5' }))} style={{ background: theme.text, color: theme.background }}>
          {props.eyebrow && (
            <span className="flex items-center gap-3 text-sm font-semibold" style={{ color: theme.primary }}>
              <span className="h-8 w-8 shrink-0 rounded-full" style={{ background: theme.primary }} aria-hidden="true" />
              {props.eyebrow}
            </span>
          )}
          <div className={cn('mt-10 grid gap-10', pick(device, { desktop: 'grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-start', tablet: 'grid-cols-1', mobile: 'grid-cols-1' }))}>
            <div>
              <h2 className={cn('font-sans font-bold leading-tight tracking-tight', pick(device, { desktop: 'text-5xl', tablet: 'text-4xl', mobile: 'text-3xl' }))}>{props.title}</h2>
              <ul className="mt-10 space-y-7">
                {props.items.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-1 shrink-0" style={{ color: theme.primary }}><Icon name={item.icon} size={20} /></span>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: `${theme.background}99` }}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {props.buttonLabel && <span className="mt-10 inline-flex items-center gap-2 whitespace-nowrap rounded-md px-6 py-3 text-sm font-semibold" style={{ background: theme.primary, color: theme.primaryText }}>{props.buttonLabel}<ArrowRight size={15} /></span>}
            </div>
            {(small || large) && (
              <div className="grid gap-5">
                {small && (
                  <div className={cn('relative w-[60%] overflow-hidden rounded-2xl', device === 'mobile' && 'w-full')} style={{ aspectRatio: '1416 / 1111' }}>
                    <div className="absolute inset-0 overflow-hidden">
                      <ImageArt icon="trophy" imageUrl={small.imageUrl} imagePosition={small.imagePosition ?? 'center'} label={small.label} />
                    </div>
                  </div>
                )}
                {large && (
                  <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: '1318 / 1193' }}>
                    <div className="absolute inset-0 overflow-hidden">
                      <ImageArt icon="trophy" imageUrl={large.imageUrl} imagePosition={large.imagePosition ?? 'center'} label={large.label} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'process') {
    return (
      <section className={cn(px, 'py-20')} style={{ background: theme.background, color: theme.text }}>
        <div className="mx-auto max-w-[1100px]">
          <h2 className={cn('text-center font-display font-normal', pick(device, { desktop: 'text-[40px]', tablet: 'text-4xl', mobile: 'text-3xl' }))}>{props.title}</h2>
          <div className={cn('mt-14 grid gap-10', pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
            {props.items.map((item, index) => (
              <div key={item.title} className="relative flex flex-col items-center text-center">
                {index > 0 && device === 'desktop' && (
                  <span className="absolute left-[-50%] top-7 h-px w-full" style={{ background: `${theme.primary}66` }} aria-hidden="true" />
                )}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full" style={{ background: theme.primary, color: theme.primaryText }}>
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed" style={{ color: theme.muted }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  if (props.layout === 'logos') {
    return (
      <section className={cn(px, 'py-7')} style={{ background: theme.background, color: theme.text }}>
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: theme.muted }}>{props.title}</p>
          <div className={cn('mt-5 grid items-center gap-x-8 gap-y-4', pick(device, {
            desktop: 'grid-cols-6',
            tablet: 'grid-cols-3',
            mobile: 'grid-cols-2',
          }))}>
            {props.items.map((item) => (
              <span key={item.title} className={cn(heading, 'text-lg font-bold tracking-tight')} style={{ color: theme.text }}>
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </section>
    )
  }
  if (props.layout === 'bakery') {
    return (
      <section className={cn('py-9', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.secondary }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-7 text-center">
            {props.eyebrow && <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8d4a2d]">{props.eyebrow}</p>}
            <h2 className={cn(heading, 'text-[#351b12]', device === 'mobile' ? 'text-2xl' : 'text-3xl')}>{props.title}</h2>
          </div>
          <div className={cn('grid', pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2 gap-y-7', mobile: 'grid-cols-2 gap-y-7' }))}>
            {props.items.map((item, index) => (
              <article key={item.title} className={cn('px-4 text-center', device === 'desktop' && index > 0 && 'border-l border-[#542413]/15', device !== 'desktop' && index % 2 === 1 && 'border-l border-[#542413]/15')}>
                <Icon name={item.icon} size={30} strokeWidth={1.25} className="mx-auto text-[#8d4a2d]" />
                <h3 className="mt-2.5 text-sm font-semibold text-[#32190f]">{item.title}</h3>
                <p className="mx-auto mt-1 max-w-[190px] text-xs leading-relaxed text-[#72584b]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }
  if (props.layout === 'stats') {
    return (
      <section className={cn('py-4', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))} style={{ background: theme.background }}>
        <dl className={cn('mx-auto grid max-w-[1100px] rounded-2xl bg-[#f1f7fd] py-8 ring-1 ring-[#0c4a8a]/10', pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2 gap-y-8', mobile: 'grid-cols-2 gap-y-8' }))}>
          {props.items.map((item, index) => (
            <div
              key={item.title}
              className={cn('flex flex-col items-center px-4 text-center', index > 0 && (device === 'desktop' || index % 2 === 1) && 'border-l')}
              style={{ borderColor: `${theme.primary}22` }}
            >
              <span style={{ color: theme.primary }}><Icon name={item.icon} size={30} strokeWidth={1.5} /></span>
              <dt className={cn('mt-3 text-3xl font-bold', heading)} style={{ color: theme.text }}>{item.title}</dt>
              <dd className="mt-1 text-sm" style={{ color: theme.muted }}>{item.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    )
  }
  if (props.layout === 'elevate') {
    return (
      <section aria-label={props.title} className={cn(px, 'py-10')} style={{ background: theme.secondary }}>
        <div className={cn('mx-auto grid max-w-[1100px] gap-x-8 gap-y-6', pick(device, {
          desktop: 'grid-cols-4',
          tablet: 'grid-cols-2',
          mobile: 'grid-cols-2',
        }))}>
          {props.items.map((item) => (
            <article key={item.title} className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: theme.background, color: theme.primary }}>
                <Icon name={item.icon} size={20} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold" style={{ color: theme.text }}>{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: theme.muted }}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }
  if (props.layout === 'strip') {
    return (
      <section aria-label={props.title} className={cn(px, 'py-6')} style={{ background: '#191711' }}>
        <div className={cn('mx-auto grid max-w-[1100px] gap-5', pick(device, {
          desktop: 'grid-cols-4',
          tablet: 'grid-cols-2',
          mobile: 'grid-cols-2',
        }))}>
          {props.items.map((item) => (
            <article key={item.title} className="flex items-center gap-3">
              <Icon name={item.icon} size={22} className="shrink-0 text-amber-500" />
              <div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }
  const n = pick(device, { desktop: props.items.length, tablet: 2, mobile: 1 })
  return (
    <Shell bg={`${theme.secondary}66`}>
      <SectionTitle title={props.title} subtitle={props.subtitle} center />
      <div className={cn('grid gap-6', cols(n))}>
        {props.items.map((item) => (
          <div key={item.title} className={cn('p-7', card)} style={{ background: theme.background, border: `1px solid ${theme.text}12` }}>
            <span className={cn('mb-5 flex h-12 w-12 items-center justify-center', card === 'rounded-none' ? 'rounded-none' : 'rounded-xl')} style={{ background: theme.secondary, color: theme.primary }}>
              <Icon name={item.icon} size={24} />
            </span>
            <h3 className={cn('text-xl', heading)}>{item.title}</h3>
            <p className="mt-2 leading-relaxed" style={{ color: theme.muted }}>{item.description}</p>
          </div>
        ))}
      </div>
    </Shell>
  )
}

/** Eyebrow, title and optional "view all" action shared by the bakery showcase layouts. */
function BakeryHeading({ eyebrow, title, actionLabel }: { eyebrow?: string; title: string; actionLabel?: string }) {
  const { device, heading } = useTokens()
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8d4a2d]">{eyebrow}</p>}
        <h2 className={cn(heading, 'text-[#351b12]', device === 'mobile' ? 'text-2xl' : 'text-3xl')}>{title}</h2>
      </div>
      {actionLabel && (
        <span className="inline-flex shrink-0 items-center gap-1.5 pb-1 text-xs font-semibold text-[#542413]">{actionLabel}<ArrowRight size={14} /></span>
      )}
    </div>
  )
}

export function ShowcaseSection({ props }: { props: ShowcaseProps }) {
  const { theme, device, card, heading, h2, btn, px } = useTokens()
  const dark = props.tone === 'dark'
  const journal = props.layout === 'journal'
  const gallery = props.layout === 'gallery'

  if (props.layout === 'news') {
    return (
      <section className={cn(px, 'py-16')} style={{ background: theme.background, color: theme.text }}>
        <header className="text-center">
          <h2 className={cn('font-sans font-bold tracking-tight', pick(device, { desktop: 'text-3xl', tablet: 'text-3xl', mobile: 'text-2xl' }))}>{props.title}</h2>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full" style={{ background: theme.primary }} aria-hidden="true" />
        </header>
        <div className={cn('mx-auto mt-12 grid max-w-[1200px] gap-6', pick(device, { desktop: 'grid-cols-3', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
          {props.items.map((item, index) => (
            <article key={item.title} className="flex overflow-hidden rounded-xl border" style={{ borderColor: `${theme.text}14`, background: theme.background }}>
              <div className="relative w-[42%] shrink-0 overflow-hidden" style={{ minHeight: 170 }}>
                <div className="absolute inset-0">
                  <ImageArt icon={item.icon ?? 'book-open'} imageUrl={item.imageUrl} imagePosition={item.imagePosition ?? 'center'} label={item.title} seed={index} />
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                <div>
                  {item.tag && <p className="text-xs" style={{ color: theme.muted }}>{item.tag}</p>}
                  <h3 className="mt-2 text-base font-semibold leading-snug">{item.title}</h3>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: theme.primary }}>
                  {item.linkLabel ?? 'Read more'}<ArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (props.layout === 'category-grid') {
    return (
      <section className={cn(px, 'py-16')} style={{ background: theme.background, color: theme.text }}>
        <div className="mx-auto max-w-[1200px]">
          <header className="text-center">
            <h2 className={cn('font-sans font-bold tracking-tight', pick(device, { desktop: 'text-3xl', tablet: 'text-3xl', mobile: 'text-2xl' }))}>{props.title}</h2>
            <span className="mx-auto mt-3 block h-1 w-12 rounded-full" style={{ background: theme.primary }} aria-hidden="true" />
          </header>
          <div className={cn('mt-12 grid gap-5', pick(device, { desktop: 'grid-cols-5', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
            {props.items.map((item) => (
              <article key={item.title} className="flex flex-col items-center rounded-2xl border px-5 py-8 text-center" style={{ borderColor: `${theme.text}14`, background: theme.background }}>
                <span className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: theme.secondary, color: theme.primary }}>
                  <Icon name={item.icon ?? 'sparkles'} size={34} strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-base font-semibold">{item.title}</h3>
                {item.description && <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.muted }}>{item.description}</p>}
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: theme.primary }}>
                  {item.linkLabel ?? 'View products'}<ArrowRight size={13} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'catalog') {
    return (
      <section className={cn(px, 'py-16')} style={{ background: theme.background, color: theme.text }}>
        <div className={cn('mx-auto grid max-w-[1200px] items-start gap-10', pick(device, { desktop: 'grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]', tablet: 'grid-cols-1', mobile: 'grid-cols-1' }))}>
          <div>
            {props.eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>}
            <h2 className={cn('mt-3 font-sans font-bold leading-tight tracking-tight', pick(device, { desktop: 'text-4xl', tablet: 'text-3xl', mobile: 'text-3xl' }))}>{props.title}</h2>
            {props.subtitle && <p className="mt-4 text-sm leading-relaxed" style={{ color: theme.muted }}>{props.subtitle}</p>}
            {props.buttonLabel && (
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold" style={{ borderColor: theme.primary, color: theme.primary }}>
                {props.buttonLabel}<ArrowRight size={15} />
              </span>
            )}
          </div>
          <div className={cn('grid gap-5', pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2', mobile: 'grid-cols-2' }))}>
            {props.items.map((item, index) => (
              <article key={item.title} className="overflow-hidden rounded-2xl" style={{ background: theme.secondary }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: item.aspect ?? '4 / 3' }}>
                  <div className="absolute inset-0">
                    <ImageArt icon={item.icon ?? 'package'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={index} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium" style={{ color: theme.primary }}>
                    {item.linkLabel ?? 'Explore'}<ArrowRight size={13} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'signature') {
    return (
      <section className={cn('py-20', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))} style={{ background: theme.background, color: theme.text }}>
        <div className="mx-auto max-w-[1200px]">
          <header className="text-center">
            {props.eyebrow && <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: `${theme.text}99` }}>{props.eyebrow}</p>}
            <h2 className={cn('mt-3 font-display font-normal uppercase tracking-[0.02em]', pick(device, { desktop: 'text-[44px] leading-tight', tablet: 'text-4xl', mobile: 'text-3xl' }))}>{props.title}</h2>
            <span className="mx-auto mt-5 block h-px w-12" style={{ background: theme.text }} aria-hidden="true" />
          </header>
          <div className={cn('mt-12 grid gap-6', pick(device, { desktop: 'grid-cols-5', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
            {props.items.map((item, index) => (
              <article key={item.title} className="flex flex-col" style={{ background: theme.secondary }}>
                <div className="overflow-hidden" style={{ background: theme.secondary, aspectRatio: '4 / 3' }}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} loading="lazy" className="h-full w-full object-contain" style={{ objectPosition: item.imagePosition ?? 'center top' }} />
                  ) : (
                    <ImageArt icon={item.icon ?? 'sparkles'} imageUrl={item.imageUrl} imagePosition={item.imagePosition ?? 'center'} label={item.title} seed={index} />
                  )}
                </div>
                <div className="flex flex-1 flex-col px-7 pb-7 pt-6" style={item.textInset ? { paddingLeft: item.textInset } : undefined}>
                  <div className="flex items-center gap-4">
                    {item.icon && <span style={{ color: theme.primary }}><Icon name={item.icon} size={26} strokeWidth={1.25} /></span>}
                    <h3 className="font-display text-[22px] font-normal uppercase tracking-[0.04em]" style={{ color: theme.text }}>{item.title}</h3>
                  </div>
                  {item.description && <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.muted }}>{item.description}</p>}
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: theme.text }}>
                    {item.linkLabel ?? props.buttonLabel ?? 'Discover'}<ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'arrivals') {
    return (
      <section className={cn('py-14', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.background }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <h2 className={cn(heading, 'text-2xl uppercase tracking-[0.06em] sm:text-[28px]')} style={{ color: theme.text }}>{props.title}</h2>
            {props.tabs && (
              <nav aria-label="Product categories" className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" style={{ color: theme.muted }}>
                {props.tabs.map((tab, index) => (
                  <span key={tab} className={cn('pb-1', index === 0 && 'border-b-2 font-medium')} style={index === 0 ? { color: theme.text, borderColor: theme.text } : undefined}>{tab}</span>
                ))}
              </nav>
            )}
          </div>
          <div className={cn('mt-10 grid gap-x-3 gap-y-10', pick(device, { desktop: 'grid-cols-6', tablet: 'grid-cols-3', mobile: 'grid-cols-2' }))}>
            {props.items.map((item, index) => (
              <article key={item.title} className="min-w-0">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f1]">
                  <ImageArt icon={item.icon ?? 'bag'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={index} />
                  {item.tag && (
                    <span className="absolute left-2 top-2 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black">{item.tag}</span>
                  )}
                </div>
                <h3 className="mt-3 truncate text-xs" style={{ color: theme.muted }}>{item.title}</h3>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold" style={{ color: theme.text }}>{item.price}</span>
                  <span role="img" aria-label={`Save ${item.title} to wishlist`} className="shrink-0" style={{ color: theme.text }}><Heart size={15} /></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'mosaic') {
    const tile = (item: ShowcaseItem, index: number, className: string, dark: boolean) => (
      <div key={item.title} className={cn('relative overflow-hidden', className)}>
        <ImageArt icon={item.icon ?? 'bag'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={index} />
        <div className={cn('absolute left-6 top-6 max-w-[70%]', dark ? 'text-[#1c1917]' : 'text-white')}>
          <h3 className="text-xl uppercase leading-tight tracking-[0.02em] sm:text-2xl">{item.title}</h3>
          {item.description && <p className="mt-2 text-xs leading-relaxed opacity-90">{item.description}</p>}
          {item.linkLabel && <span className="mt-4 inline-flex items-center gap-2 text-xs">{item.linkLabel}<ArrowRight size={14} /></span>}
        </div>
      </div>
    )
    const [knit, occasion, accessories, sale] = props.items
    return (
      <section className={cn('py-4', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.background }}>
        <div className={cn('mx-auto grid max-w-[1200px] gap-1', pick(device, {
          desktop: 'h-[600px] grid-cols-[1.4fr_1fr_1fr] grid-rows-2',
          tablet: 'grid-cols-2 auto-rows-[260px]',
          mobile: 'grid-cols-1 gap-2',
        }))}>
          {knit && tile(knit, 0, pick(device, { desktop: 'row-span-2', tablet: 'row-span-2', mobile: 'aspect-[4/5]' }), true)}
          {occasion && tile(occasion, 1, pick(device, { desktop: '', tablet: '', mobile: 'aspect-[4/3]' }), true)}
          {accessories && tile(accessories, 2, pick(device, { desktop: '', tablet: '', mobile: 'aspect-[4/3]' }), true)}
          {sale && tile(sale, 3, pick(device, { desktop: 'col-span-2', tablet: 'col-span-2', mobile: 'aspect-[16/9]' }), false)}
        </div>
      </section>
    )
  }

  if (props.layout === 'tiles') {
    return (
      <section className={cn('py-14', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.background }}>
        <div className="mx-auto max-w-[1200px]">
          <h2 className={cn(heading, 'mb-8 text-center text-2xl uppercase tracking-[0.06em] sm:text-[28px]')} style={{ color: theme.text }}>{props.title}</h2>
          <div className={cn('grid gap-2', pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2', mobile: 'grid-cols-2' }))}>
            {props.items.map((item, index) => (
              <article key={item.title} className="relative aspect-[4/5] overflow-hidden">
                <ImageArt icon={item.icon ?? 'bag'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={index} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-4 pt-16 text-white">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">{item.title}</h3>
                  {item.description && <p className="mt-1 text-xs leading-relaxed text-white/90">{item.description}</p>}
                  {item.linkLabel && <span className="mt-3 inline-flex items-center gap-1.5 text-xs">{item.linkLabel}<ArrowRight size={13} /></span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'blog') {
    return (
      <section className={cn('py-20', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))} style={{ background: theme.background }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              {props.eyebrow && <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{props.eyebrow}</p>}
              <h2 className={cn(heading, h2, pick(device, { desktop: 'text-[34px] leading-[1.15]', tablet: 'text-3xl', mobile: 'text-2xl' }))} style={{ color: theme.text }}>{props.title}</h2>
            </div>
            {props.viewAllLabel && (
              <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: theme.text }}>
                {props.viewAllLabel}<ArrowRight size={16} />
              </span>
            )}
          </div>
          <div className={cn('grid gap-6', pick(device, { desktop: 'grid-cols-3', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
            {props.items.map((item, index) => (
              <article key={item.title} className={cn('overflow-hidden border', card)} style={{ borderColor: `${theme.text}14`, background: theme.background, boxShadow: `0 14px 32px -20px ${theme.text}66` }}>
                <div className="h-[200px] overflow-hidden">
                  <ImageArt icon={item.icon ?? 'book-open'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} seed={index} />
                </div>
                <div className="p-6">
                  {item.tag && <p className="text-xs" style={{ color: theme.muted }}>{item.tag}</p>}
                  <h3 className="mt-2 text-base font-bold leading-snug" style={{ color: theme.text }}>{item.title}</h3>
                  {item.linkLabel && (
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: theme.primary }}>
                      {item.linkLabel}<ArrowRight size={15} />
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'elevate' || props.layout === 'team') {
    const team = props.layout === 'team'
    return (
      <section className={cn('py-20', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))} style={{ background: theme.background }}>
        <div className={cn('mx-auto grid max-w-[1100px] items-start', pick(device, {
          desktop: 'grid-cols-[260px_minmax(0,1fr)] gap-12',
          tablet: 'grid-cols-1 gap-10',
          mobile: 'grid-cols-1 gap-10',
        }))}>
          <div>
            {props.eyebrow && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>}
            <h2 className={cn(heading, h2, pick(device, { desktop: 'text-[34px] leading-[1.15]', tablet: 'text-3xl', mobile: 'text-3xl' }))} style={{ color: theme.text }}>{props.title}</h2>
            {props.subtitle && <p className="mt-4 text-sm leading-relaxed" style={{ color: theme.muted }}>{props.subtitle}</p>}
            {props.buttonLabel && (
              team ? (
                <span className={cn('mt-6 inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold', btn)} style={{ borderColor: theme.primary, color: theme.primary }}>
                  {props.buttonLabel}<ArrowRight size={16} />
                </span>
              ) : (
                <span className={cn('mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold', btn)} style={{ background: theme.primary, color: theme.primaryText }}>
                  {props.buttonLabel}<ArrowRight size={16} />
                </span>
              )
            )}
          </div>
          <div className={cn('grid gap-5', team
            ? pick(device, { desktop: 'grid-cols-3', tablet: 'grid-cols-2', mobile: 'grid-cols-1' })
            : pick(device, { desktop: 'grid-cols-4', tablet: 'grid-cols-2', mobile: 'grid-cols-2' }))}>
            {props.items.map((item, index) => (
              team ? (
                <article key={item.title} className={cn('overflow-hidden border', card)} style={{ borderColor: `${theme.text}14`, background: theme.background }}>
                  <div className="h-[240px] overflow-hidden">
                    <ImageArt icon={item.icon ?? 'users'} imageUrl={item.imageUrl} imagePosition={item.imagePosition ?? 'center 15%'} label={item.title} seed={index} />
                  </div>
                  <div className="px-4 py-4 text-center" style={{ background: `${theme.secondary}` }}>
                    <h3 className={cn(heading, 'text-lg leading-tight')} style={{ color: theme.text }}>{item.title}</h3>
                    {item.tag && <p className="mt-1 text-xs" style={{ color: theme.muted }}>{item.tag}</p>}
                  </div>
                </article>
              ) : (
                <article key={item.title} className={cn('relative border', card)} style={{ borderColor: `${theme.text}14`, background: theme.background }}>
                  <div className="relative">
                  <div className={cn('overflow-hidden', card === 'rounded-none' ? '' : 'rounded-t-2xl', item.aspect && device !== 'desktop' ? '' : 'h-[150px]')} style={item.aspect && device !== 'desktop' ? { aspectRatio: '1 / 1', background: theme.secondary } : undefined}>
                    {item.aspect && device !== 'desktop' ? (
                      <img src={item.imageUrl} alt={item.title} loading="lazy" className="h-full w-full object-contain" />
                    ) : (
                      <ImageArt icon={item.icon ?? 'award'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} seed={index} />
                    )}
                  </div>
                  <span
                    className="absolute bottom-0 left-5 flex h-11 w-11 translate-y-1/2 items-center justify-center rounded-full"
                    style={{ background: theme.background, color: theme.primary, boxShadow: `0 6px 16px -6px ${theme.text}55` }}
                  >
                    <Icon name={item.icon ?? 'award'} size={20} />
                  </span>
                  </div>
                  <div className="px-5 pb-6 pt-9">
                    <h3 className="text-sm font-bold" style={{ color: theme.text }}>{item.title}</h3>
                    {item.description && <p className="mt-2 text-xs leading-relaxed" style={{ color: theme.muted }}>{item.description}</p>}
                  </div>
                </article>
              )
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'programs') {
    return (
      <section className={cn('py-16', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))} style={{ background: theme.background }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            {props.eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: theme.primary }}>{props.eyebrow}</p>}
            <h2 className={cn(heading, device === 'mobile' ? 'text-2xl' : 'text-3xl')} style={{ color: theme.text }}>{props.title}</h2>
            <span className="mx-auto mt-3 block h-1 w-10 rounded-full" style={{ background: theme.primary }} aria-hidden="true" />
          </div>
          <div className={cn('grid gap-6', pick(device, { desktop: 'grid-cols-5', tablet: 'grid-cols-2', mobile: 'mx-auto w-full max-w-[360px] grid-cols-1' }))}>
            {props.items.map((item, index) => (
              <article key={item.title} className="relative rounded-2xl bg-white pb-6 text-center shadow-[0_10px_30px_-12px_rgba(12,74,138,0.25)] ring-1 ring-[#0c4a8a]/10">
                <div className="h-[150px] overflow-hidden rounded-t-2xl">
                  <ImageArt icon={item.icon ?? 'award'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={index} />
                </div>
                <span className="absolute left-1/2 top-[126px] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-white ring-4 ring-white" style={{ background: theme.primary }}>
                  <Icon name={item.icon ?? 'award'} size={22} />
                </span>
                <div className="px-4 pt-9">
                  <h3 className="text-base font-bold" style={{ color: theme.text }}>{item.title}</h3>
                  {item.tag && <p className="mt-1 text-xs font-semibold" style={{ color: theme.primary }}>{item.tag}</p>}
                  {item.description && <p className="mt-2 text-xs leading-relaxed" style={{ color: theme.muted }}>{item.description}</p>}
                  {item.linkLabel && (
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: theme.primary }}>{item.linkLabel}<ArrowRight size={13} /></span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'categories') {
    return (
      <section className={cn('py-5', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.background }}>
        <div className={cn('mx-auto grid max-w-[1200px]', pick(device, { desktop: 'grid-cols-8 gap-3', tablet: 'grid-cols-8 gap-2', mobile: 'grid-cols-4 gap-x-2 gap-y-4' }))}>
          {props.items.map((item, index) => (
            <article key={item.title} className="min-w-0 text-center">
              <div className="mx-auto aspect-square w-full max-w-[88px] overflow-hidden rounded-full bg-[#f8e7dc] p-1.5 shadow-sm ring-1 ring-[#542413]/5">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <ImageArt icon={item.icon ?? 'sparkles'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={index} />
                </div>
              </div>
              <h3 className={cn('mt-2 font-medium leading-tight text-[#43271b]', device === 'mobile' ? 'text-[10px]' : 'text-xs')}>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (props.layout === 'favorites') {
    const count = pick(device, { desktop: 5, tablet: 3, mobile: 2 })
    return (
      <section className={cn('py-8', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.background }}>
        <div className="mx-auto max-w-[1200px]">
          <BakeryHeading eyebrow={props.eyebrow} title={props.title} actionLabel={props.viewAllLabel} />
          <div className={cn('grid', pick(device, { desktop: 'grid-cols-5 gap-4', tablet: 'grid-cols-3 gap-4', mobile: 'grid-cols-2 gap-3' }))}>
            {props.items.slice(0, count).map((item, i) => {
              const reviews = item.description?.match(/\((\d+)\)/)?.[1]
              return (
                <article key={item.title} className="min-w-0 overflow-hidden rounded-xl bg-white shadow-[0_6px_20px_-10px_rgba(84,36,19,0.35)] ring-1 ring-[#542413]/5">
                  <div className="aspect-[1.08/1] overflow-hidden">
                    <ImageArt icon={item.icon ?? 'sparkles'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={i} />
                  </div>
                  <div className="p-3">
                    <h3 className="truncate text-[13px] font-semibold text-[#32190f]">{item.title}</h3>
                    <div className="mt-1 flex items-center gap-0.5 text-[#f2a516]">
                      {Array.from({ length: 5 }, (_, n) => <Star key={n} size={10} strokeWidth={0} className="fill-current" aria-hidden="true" />)}
                      {reviews && <span className="ml-1 text-[10px] text-[#80685b]">({reviews})</span>}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#32190f]">{item.price}</span>
                      <span role="img" aria-label={`Add ${item.title} to cart`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#542413] text-white">
                        <ShoppingCart size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  if (props.layout === 'articles') {
    return (
      <section className={cn('py-8', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.background }}>
        <div className="mx-auto max-w-[1200px]">
          <BakeryHeading eyebrow={props.eyebrow} title={props.title} actionLabel={props.viewAllLabel} />
          <div className={cn('grid gap-4', pick(device, { desktop: 'grid-cols-3', mobile: 'grid-cols-1' }))}>
            {props.items.map((item, i) => (
              <article key={item.title} className="flex min-w-0 items-stretch gap-4 overflow-hidden rounded-xl bg-white p-2.5 shadow-[0_6px_20px_-10px_rgba(84,36,19,0.35)] ring-1 ring-[#542413]/5">
                <div className="aspect-[1.1/1] w-[38%] shrink-0 overflow-hidden rounded-lg">
                  <ImageArt icon={item.icon ?? 'sparkles'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={i} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1.5 pr-1">
                  <h3 className="text-[13px] font-semibold leading-snug text-[#32190f]">{item.title}</h3>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-[11px] text-[#80685b]">{item.description}</span>
                    <ArrowRight size={15} className="shrink-0 text-[#542413]" aria-hidden="true" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (props.variant === 'menu') {
    return (
      <Shell bg={dark ? '#203c4a' : undefined} className={dark ? 'text-white' : undefined}>
        <SectionTitle title={props.title} subtitle={props.subtitle} center />
        <div className={cn('grid gap-x-14 gap-y-7', pick(device, { desktop: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
          {props.items.map((item) => (
            <div key={item.title}>
              <div className="flex items-baseline gap-3">
                <h3 className={cn('text-xl', heading)}>{item.title}</h3>
                <span className="flex-1 border-b border-dotted" style={{ borderColor: `${theme.text}40` }} />
                <span className="text-lg font-semibold" style={{ color: theme.primary }}>{item.price}</span>
              </div>
              {item.description && <p className="mt-1" style={{ color: theme.muted }}>{item.description}</p>}
            </div>
          ))}
        </div>
      </Shell>
    )
  }

  const isProducts = props.variant === 'products'
  const programs = props.cardStyle === 'programs'
  const n = pick(device, { desktop: isProducts || gallery ? Math.min(4, props.items.length) : Math.min(3, props.items.length), tablet: 2, mobile: 1 })
  return (
    <Shell bg={dark ? '#203c4a' : gallery ? '#15130f' : journal ? '#f5f0e6' : undefined} className={dark || gallery ? 'text-white' : undefined}>
      <SectionTitle title={props.title} subtitle={props.subtitle} center={isProducts || journal || gallery} light={dark || gallery} />
      <div className={cn('grid gap-6', cols(n), programs && 'gap-x-5 gap-y-8')}>
        {props.items.map((item, i) => (
          <article key={item.title} className={programs ? 'text-center' : undefined}>
            <div className={cn('relative overflow-hidden', programs ? (item.aspect ? 'rounded-md' : 'rounded-md aspect-[4/3]') : card, gallery && 'ring-1 ring-amber-700/80', programs || item.aspect ? undefined : props.imageAspect === 'landscape' ? 'aspect-[16/10]' : isProducts ? 'aspect-[4/5]' : 'aspect-[4/3]')} style={item.aspect ? { aspectRatio: item.aspect } : undefined}>
              <ImageArt icon={item.icon ?? 'sparkles'} imageUrl={item.imageUrl} imagePosition={item.imagePosition} label={item.title} seed={i} />
              {item.tag && isProducts && !programs && (
                <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: theme.background, color: theme.text }}>{item.tag}</span>
              )}
            </div>
            <div className={cn('mt-4 flex items-start justify-between gap-3', programs && 'justify-center')}>
              <div className={programs ? 'w-full' : undefined}>
                <h3 className={cn(programs ? 'text-center text-base font-medium' : 'text-lg', heading)}>{item.title}</h3>
                {item.description && !programs && <p className="mt-1 text-[15px]" style={{ color: dark ? '#dce7e9' : gallery ? '#b5aa98' : theme.muted }}>{item.description}</p>}
                {journal && item.linkLabel && (
                  <span className="mt-3 inline-flex text-xs font-medium uppercase tracking-wide" style={{ color: theme.primary }}>
                    {item.linkLabel} <ArrowRight size={13} className="ml-1" />
                  </span>
                )}
              </div>
              {item.price && <span className="shrink-0 font-semibold">{item.price}</span>}
              {item.tag && !isProducts && (
                <span className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: theme.secondary, color: theme.primary }}>{item.tag}</span>
              )}
            </div>
          </article>
        ))}
      </div>
      {props.buttonLabel && (
        <div className="mt-8 text-center">
          <span
            role="button"
            className={cn('inline-flex items-center justify-center border border-white/70 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10', btn)}
          >
            {props.buttonLabel}
          </span>
        </div>
      )}
    </Shell>
  )
}

export function TestimonialsSection({ props }: { props: TestimonialsProps }) {
  const { theme, device, card, heading } = useTokens()
  if (props.layout === 'stories') {
    const item = props.items[0]
    if (!item) return null
    const titleLines = props.title.split('\n')
    const divider = (
      <span className={cn('shrink-0', device === 'desktop' ? 'h-16 w-px' : 'h-px w-full')} style={{ background: `${theme.primaryText}33` }} aria-hidden="true" />
    )
    return (
      <section className={cn(pick(device, { desktop: 'px-12 py-12', tablet: 'px-8 py-10', mobile: 'px-5 py-10' }))} style={{ background: theme.background }}>
        <div
          className={cn('mx-auto grid max-w-[1100px] items-center gap-6 px-8 py-7', card, pick(device, {
            desktop: 'grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_auto] gap-x-8',
            tablet: 'grid-cols-1',
            mobile: 'grid-cols-1',
          }))}
          style={{ background: theme.primary, color: theme.primaryText }}
        >
          <div>
            {props.eyebrow && <p className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-75">{props.eyebrow}</p>}
            <h2 className={cn(heading, 'mt-2 text-2xl leading-tight')}>
              {titleLines.map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
          </div>
          {device !== 'mobile' && divider}
          <div className="flex gap-4">
            <span className="font-display text-5xl leading-none" style={{ color: ACCENT_WARM }} aria-hidden="true">“</span>
            <blockquote className="text-sm italic leading-relaxed">{item.quote}</blockquote>
          </div>
          {device !== 'mobile' && divider}
          <figure className="flex items-center gap-3">
            {item.imageUrl ? (
              <img loading="lazy" src={item.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
            ) : (
              <span className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold', heading)} style={{ background: theme.primaryText, color: theme.primary }}>{item.name.charAt(0)}</span>
            )}
            <figcaption className="min-w-0">
              <span className="flex gap-0.5" style={{ color: ACCENT_WARM }}>
                {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} strokeWidth={0} className="fill-current" aria-hidden="true" />)}
              </span>
              <span className="mt-1 block text-sm font-semibold">{item.name}</span>
              <span className="block text-xs opacity-75">{item.role}</span>
            </figcaption>
          </figure>
          {device !== 'mobile' && (
            <div className={cn('flex gap-2', device === 'tablet' && 'hidden')}>
              {[ChevronLeft, ChevronRight].map((Arrow, index) => (
                <span key={index} role="img" aria-label={index === 0 ? 'Previous story' : 'Next story'} className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ borderColor: `${theme.primaryText}66` }}>
                  <Arrow size={18} />
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }
  if (props.layout === 'portraits') {
    const n = pick(device, { desktop: 3, tablet: 2, mobile: 1 })
    return (
      <Shell bg={theme.background}>
        {props.eyebrow && <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>{props.eyebrow}</p>}
        <SectionTitle title={props.title} center />
        <div className={cn('grid gap-6', cols(n))}>
          {props.items.map((item) => (
            <figure key={item.name} className={cn('flex flex-col border px-8 py-8', card)} style={{ borderColor: `${theme.text}14`, background: theme.background }}>
              <span className="font-display text-5xl leading-none" style={{ color: theme.primary }} aria-hidden="true">“</span>
              <blockquote className="mt-3 flex-1 text-[15px] italic leading-relaxed" style={{ color: theme.text }}>{item.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {item.imageUrl ? (
                  <img loading="lazy" src={item.imageUrl} alt={item.name} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-semibold" style={{ background: theme.secondary, color: theme.primary }}>{item.name.charAt(0)}</span>
                )}
                <span className="min-w-0">
                  <span className="flex gap-0.5" style={{ color: theme.primary }}>
                    {Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} strokeWidth={0} className="fill-current" aria-hidden="true" />)}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs" style={{ color: theme.muted }}>{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Shell>
    )
  }
  if (props.layout === 'editorial') {
    const n = pick(device, { desktop: Math.min(4, props.items.length), tablet: 2, mobile: 1 })
    return (
      <Shell bg="#f5f0e6">
        <SectionTitle title={props.title} center />
        <div className={cn('grid', cols(n))}>
          {props.items.map((item, index) => (
            <figure
              key={item.name}
              className={cn(
                'px-6 py-3 text-center',
                device === 'mobile' && index > 0 && 'border-t',
                device === 'tablet' && index >= 2 && 'border-t',
                device === 'tablet' && index % 2 === 1 && 'border-l',
                device === 'desktop' && index > 0 && 'border-l',
              )}
              style={{ borderColor: `${theme.primary}35` }}
            >
              <span className="font-display text-4xl leading-none" style={{ color: theme.primary }} aria-hidden="true">“</span>
              <blockquote className="mx-auto mt-1 max-w-[15rem] text-sm leading-relaxed">{item.quote}</blockquote>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: theme.muted }}>
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Shell>
    )
  }

  if (props.layout === 'carousel') {
    const count = pick(device, { desktop: 3, tablet: 2, mobile: 1 })
    return (
      <section className={cn('py-9', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-4' }))} style={{ background: theme.background }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-6 text-center">
            {props.eyebrow && <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8d4a2d]">{props.eyebrow}</p>}
            <h2 className={cn(heading, 'text-[#351b12]', device === 'mobile' ? 'text-2xl' : 'text-3xl')}>{props.title}</h2>
          </div>
          <div className="relative">
            <span role="img" aria-label="Previous testimonials" className={cn('absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#542413] shadow-md ring-1 ring-[#542413]/10', device === 'desktop' ? '-left-5' : '-left-3')}>
              <ChevronLeft size={18} />
            </span>
            <div className={cn('grid gap-4', pick(device, { desktop: 'grid-cols-3', tablet: 'grid-cols-2', mobile: 'grid-cols-1' }))}>
              {props.items.slice(0, count).map((t) => (
                <figure key={t.name} className="flex min-w-0 items-start gap-4 rounded-xl bg-white p-5 shadow-[0_6px_20px_-10px_rgba(84,36,19,0.35)] ring-1 ring-[#542413]/5">
                  {t.imageUrl ? (
                    <img loading="lazy" src={t.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#542413] font-bold text-white">{t.name.charAt(0)}</span>
                  )}
                  <div className="min-w-0">
                    <div className="flex gap-0.5 text-[#f2a516]">
                      {Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} strokeWidth={0} className="fill-current" aria-hidden="true" />)}
                    </div>
                    <blockquote className="mt-2 text-xs leading-relaxed text-[#4d3a31]">“{t.quote}”</blockquote>
                    <figcaption className="mt-2.5 text-xs font-semibold text-[#32190f]">{t.name}</figcaption>
                  </div>
                </figure>
              ))}
            </div>
            <span role="img" aria-label="Next testimonials" className={cn('absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#542413] shadow-md ring-1 ring-[#542413]/10', device === 'desktop' ? '-right-5' : '-right-3')}>
              <ChevronRight size={18} />
            </span>
          </div>
          <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[#542413]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#542413]/25" />
          </div>
        </div>
      </section>
    )
  }

  const n = pick(device, { desktop: Math.min(3, props.items.length), tablet: 2, mobile: 1 })
  return (
    <Shell bg={`${theme.secondary}59`}>
      <SectionTitle title={props.title} center />
      <div className={cn('grid gap-6', cols(n))}>
        {props.items.map((t) => (
          <figure key={t.name} className={cn('flex flex-col justify-between p-7', card)} style={{ background: theme.background, border: `1px solid ${theme.text}12` }}>
            <div className="mb-4 flex gap-0.5" style={{ color: theme.primary }}>
              {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={16} strokeWidth={0} className="fill-current" />)}
            </div>
            <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              {t.imageUrl ? (
                <img loading="lazy" src={t.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <span className={cn('flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold', heading)} style={{ background: theme.primary, color: theme.primaryText }}>
                  {t.name.charAt(0)}
                </span>
              )}
              <span>
                <span className="block text-[15px] font-semibold">{t.name}</span>
                <span className="block text-sm" style={{ color: theme.muted }}>{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Shell>
  )
}

export function CtaSection({ props }: { props: CtaProps }) {
  const { theme, device, card, heading, btn, px } = useTokens()
  const solid = props.tone === 'primary'
  if (props.layout === 'partner') {
    const lines = props.title.split('\n')
    return (
      <section className={cn(px, 'py-10')} style={{ background: theme.background }}>
        <div className={cn('mx-auto flex max-w-[1200px] items-center rounded-[2rem]', pick(device, { desktop: 'gap-10 px-12 py-10', tablet: 'flex-col gap-8 px-8 py-10 text-center', mobile: 'flex-col gap-6 px-6 py-8 text-center' }))} style={{ background: theme.text, color: theme.background }}>
          <div className="flex min-w-0 flex-1 items-center gap-8">
            <span className={cn('flex h-16 w-16 shrink-0 items-center justify-center rounded-full', device !== 'desktop' && 'mx-auto')} style={{ background: theme.background, color: theme.primary }}>
              <Icon name="phone" size={26} />
            </span>
            <h2 className={cn('font-sans font-bold leading-tight tracking-tight', pick(device, { desktop: 'text-4xl', tablet: 'text-3xl', mobile: 'text-2xl' }))}>
              {lines.map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
          </div>
          {props.subtitle && (
            <p className={cn('max-w-[280px] border-l pl-8 text-sm leading-relaxed', device !== 'desktop' && 'border-l-0 pl-0')} style={{ color: `${theme.background}cc`, borderColor: `${theme.background}33` }}>{props.subtitle}</p>
          )}
          <span className={cn('inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-white px-8 py-4 text-sm font-semibold', device !== 'desktop' && 'self-center')} style={{ color: theme.text }}>
            {props.button}<ArrowRight size={16} />
          </span>
        </div>
      </section>
    )
  }

  if (props.layout === 'feature') {
    const lines = props.title.split('\n')
    return (
      <section className="relative overflow-hidden" style={{ background: theme.text, color: theme.background }}>
        {props.imageUrl && (
          <>
            <img loading="lazy" src={props.imageUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: props.imagePosition ?? 'center' }} />
            <div className="absolute inset-0" aria-hidden="true" style={{ background: device === 'desktop' ? `linear-gradient(90deg, ${theme.text}f2 0%, ${theme.text}d9 50%, ${theme.text}99 100%)` : `linear-gradient(180deg, ${theme.text}d9 0%, ${theme.text}99 100%)` }} />
          </>
        )}
        <div className={cn('relative z-10 mx-auto flex max-w-[1100px] gap-10', device === 'desktop' ? 'flex-row items-center px-12 py-14' : 'flex-col items-start', pick(device, { desktop: '', tablet: 'px-8 py-12', mobile: 'px-5 py-12' }))}>
          <h2 className={cn('font-sans font-black uppercase leading-[1.02] tracking-tight', pick(device, { desktop: 'text-[46px]', tablet: 'text-4xl', mobile: 'text-[34px]' }))}>
            {lines.map((line, index) => (
              <span key={line} className={cn('block', index === 1 && 'italic')} style={index === 1 ? { color: ACCENT_WARM } : undefined}>{line}</span>
            ))}
          </h2>
          {device === 'desktop' && <span className="h-28 w-px shrink-0" style={{ background: `${theme.background}40` }} aria-hidden="true" />}
          <div className="max-w-[360px]">
            {props.subtitle && <p className="text-sm leading-relaxed" style={{ color: `${theme.background}d9` }}>{props.subtitle}</p>}
            <span role="button" className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold" style={{ background: ACCENT_WARM, color: theme.text }}>
              {props.button}<ArrowRight size={16} />
            </span>
          </div>
        </div>
      </section>
    )
  }
  if (props.layout === 'banner') {
    const bannerBackground = solid ? theme.primary : theme.secondary
    const bannerText = solid ? theme.primaryText : theme.text
    return (
      <section className="relative overflow-hidden" style={{ background: bannerBackground }}>
        <div className={cn('relative z-10 mx-auto max-w-[1200px]', pick(device, { desktop: 'px-12 py-16', tablet: 'px-8 py-12', mobile: 'px-5 pb-6 pt-12' }))}>
          <div className="max-w-[460px]">
            <h2 className={cn(heading, device === 'mobile' ? 'text-3xl' : 'text-4xl')} style={{ color: bannerText }}>{props.title}</h2>
            {props.subtitle && <p className="mt-3 text-sm leading-relaxed" style={{ color: solid ? '#dce7e9' : theme.muted }}>{props.subtitle}</p>}
            <span role="button" className="mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold" style={{ background: solid ? ACCENT_BLUE : theme.primary, color: solid ? theme.text : theme.primaryText }}>
              {props.button}<ArrowRight size={16} />
            </span>
          </div>
        </div>
        {props.imageUrl && (
          <div className={device === 'mobile' ? 'relative h-56' : 'absolute inset-y-0 right-0 w-[55%]'}>
            <img loading="lazy" src={props.imageUrl} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            {device !== 'mobile' && (
              <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${bannerBackground} 0%, ${bannerBackground}00 45%)` }} />
            )}
          </div>
        )}
      </section>
    )
  }

  if (props.imageUrl) {
    const mobile = device === 'mobile'
    const copy = (
      <div className={cn('relative z-10', mobile ? 'px-6 py-8 text-center' : cn('max-w-[420px] text-left', device === 'desktop' ? 'ml-[36%]' : 'ml-[38%] max-w-[360px]'))}>
        {props.eyebrow && <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8d4a2d]">{props.eyebrow}</p>}
        <h2 className={cn(heading, 'text-[#351b12]', pick(device, { desktop: 'text-4xl leading-[1.1]', tablet: 'text-3xl leading-[1.1]', mobile: 'text-[28px] leading-[1.1]' }))}>{props.title}</h2>
        {props.subtitle && <p className="mt-3 text-sm leading-relaxed text-[#72584b]">{props.subtitle}</p>}
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#542413] px-5 py-2.5 text-xs font-semibold text-white">
          {props.button}<ArrowRight size={14} />
        </span>
      </div>
    )
    if (mobile) {
      return (
        <section style={{ background: '#fbe3dd' }}>
          <div className="h-44 overflow-hidden"><img loading="lazy" src={props.imageUrl} alt="" aria-hidden="true" className="h-full w-full object-cover" style={{ objectPosition: '18% center' }} /></div>
          {copy}
        </section>
      )
    }
    return (
      <section className={cn('relative flex items-center overflow-hidden', device === 'desktop' ? 'min-h-[330px]' : 'min-h-[290px]')} style={{ background: '#fbe3dd' }}>
        <img loading="lazy" src={props.imageUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center center' }} />
        {copy}
        {props.handwritten && device === 'desktop' && (
          <p className="absolute right-[13%] top-10 -rotate-6 font-script text-3xl leading-[1.05] text-[#a3584a]/80" aria-hidden="true">
            {props.handwritten.map((line) => <span key={line} className="block">{line}</span>)}
          </p>
        )}
      </section>
    )
  }

  return (
    <section className={cn(px, pick(device, { desktop: 'py-20', mobile: 'py-10' }))}>
      <div
        className={cn('mx-auto max-w-[1100px] text-center', card, pick(device, { desktop: 'px-16 py-20', mobile: 'px-6 py-12' }))}
        style={{ background: solid ? theme.primary : theme.secondary, color: solid ? theme.primaryText : theme.text }}
      >
        <h2 className={cn(heading, pick(device, { desktop: 'text-5xl', mobile: 'text-3xl' }))}>{props.title}</h2>
        {props.subtitle && <p className="mx-auto mt-4 max-w-xl text-lg opacity-85">{props.subtitle}</p>}
        <span
          role="button"
          className={cn('mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold', btn)}
          style={{ background: solid ? theme.background : theme.primary, color: solid ? theme.text : theme.primaryText }}
        >
          {props.button}<ArrowRight size={18} />
        </span>
      </div>
    </section>
  )
}

export function FooterSection({ props }: { props: FooterProps }) {
  const { theme, device, px, heading } = useTokens()
  if (props.variant === 'elevate') {
    const stacked = device !== 'desktop'
    const pad = pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-6' })
    return (
      <footer style={{ background: FOOTER_OLIVE, color: FOOTER_CREAM }}>
        <div className={cn('mx-auto grid max-w-[1100px] gap-8 py-10', pad, pick(device, { desktop: 'grid-cols-[1fr_1.1fr_1fr] items-center', tablet: 'grid-cols-1', mobile: 'grid-cols-1' }))}>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em]">Let’s connect</p>
            {props.socialLinks && (
              <div className="flex gap-4">
                {props.socialLinks.map((social) => {
                  const SocialGlyph = SOCIAL_ICONS[social.platform]
                  return <span key={social.platform} role="img" aria-label={social.label}><SocialGlyph size={18} aria-hidden="true" /></span>
                })}
              </div>
            )}
          </div>
          <p className={cn('text-xs font-semibold uppercase leading-relaxed tracking-[0.12em]', device === 'desktop' ? 'border-x px-8 text-center' : 'border-t pt-6 text-left')} style={{ borderColor: `${FOOTER_CREAM}33` }}>
            {props.tagline}
          </p>
          {props.newsletter && (
            <div className={cn(device === 'desktop' && 'pl-4')}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">Get weekly training tips</p>
              <div className="mt-3 flex">
                <input aria-label="Email address" type="email" placeholder={props.newsletter.placeholder} className="min-w-0 flex-1 bg-white px-3 py-2.5 text-sm text-[#2a2b20] placeholder:text-[#7a7b6c] focus:outline-none" />
                <span role="img" aria-label={props.newsletter.buttonLabel} className="flex w-11 shrink-0 items-center justify-center" style={{ background: FOOTER_ACCENT, color: FOOTER_CREAM }}>
                  <ArrowRight size={18} />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className={cn('mx-auto max-w-[1100px] border-t pb-10 pt-8', pad)} style={{ borderColor: `${FOOTER_CREAM}22` }}>
          <div className={cn('grid gap-10', pick(device, { desktop: 'grid-cols-[1.2fr_1fr_1fr_1.3fr]', tablet: 'grid-cols-2', mobile: 'grid-cols-2' }))}>
            <div className={cn(stacked && 'col-span-2')}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: FOOTER_ACCENT, color: FOOTER_CREAM }}>
                  <Icon name={props.brandIcon ?? 'dumbbell'} size={20} />
                </span>
                <span className="font-display text-xl font-semibold">{props.brand}</span>
              </div>
            </div>
            {props.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em]">{column.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm" style={{ color: `${FOOTER_CREAM}cc` }}>
                  {column.links.map((link) => <li key={link}>{link}</li>)}
                  {column.details?.map((detail) => (
                    <li key={detail.text} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0" style={{ color: FOOTER_ACCENT }}><Icon name={detail.icon} size={15} /></span>
                      {detail.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs" style={{ color: `${FOOTER_CREAM}99` }}>{props.copyright}</p>
        </div>
      </footer>
    )
  }

  if (props.variant === 'bakery') {
    const stacked = device === 'mobile'
    return (
      <footer className={cn('text-white', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-6' }))} style={{ background: '#3b1d10' }}>
        <div className={cn('mx-auto grid max-w-[1200px] pb-8 pt-11', pick(device, {
          desktop: 'grid-cols-[1.25fr_0.8fr_0.8fr_1.3fr_1.15fr] gap-8',
          tablet: 'grid-cols-2 gap-8',
          mobile: 'grid-cols-2 gap-x-6 gap-y-8',
        }))}>
          <div className={cn(device !== 'desktop' && 'col-span-2')}>
            <div className="flex items-center gap-2.5">
              {props.brandIcon && <Icon name={props.brandIcon} size={30} strokeWidth={1.4} className="shrink-0 text-[#f1d9c8]" />}
              <span>
                <span className="block font-display text-2xl font-bold italic leading-none">{props.brand}</span>
                <span className="mt-1 block text-center text-[8px] font-semibold tracking-[0.3em] text-white/80">BAKERY</span>
              </span>
            </div>
            <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-white/70">{props.tagline}</p>
            {props.socialLinks && (
              <div className="mt-4 flex gap-2.5">
                {props.socialLinks.map((social) => {
                  const SocialGlyph = SOCIAL_ICONS[social.platform]
                  return (
                    <span key={social.platform} role="img" aria-label={social.label} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 text-white/90">
                      <SocialGlyph size={15} aria-hidden="true" />
                    </span>
                  )
                })}
              </div>
            )}
          </div>
          {props.columns.map((column) => (
            <div key={column.title} className={cn(stacked && (column.details || column.rows) && 'col-span-2')}>
              <h3 className="mb-3.5 text-sm font-semibold">{column.title}</h3>
              {column.links.length > 0 && (
                <ul className="space-y-2 text-xs text-white/70">
                  {column.links.map((link) => <li key={link}>{link}</li>)}
                </ul>
              )}
              {column.rows && (
                <ul className="space-y-2 text-xs text-white/70">
                  {column.rows.map((row) => (
                    <li key={row.label} className="flex justify-between gap-3"><span>{row.label}</span><span className="whitespace-nowrap">{row.value}</span></li>
                  ))}
                </ul>
              )}
              {column.details && (
                <ul className="space-y-3 text-xs text-white/70">
                  {column.details.map((detail) => (
                    <li key={detail.text} className="flex items-start gap-2.5">
                      <Icon name={detail.icon} size={15} className="mt-0.5 shrink-0 text-white/85" />
                      <span className="min-w-0 [overflow-wrap:anywhere]">{detail.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className={cn('mx-auto flex max-w-[1200px] gap-3 border-t border-white/15 py-4 text-[11px] text-white/60', stacked ? 'flex-col' : 'items-center justify-between')}>
          <p>{props.copyright}</p>
          {props.legalLinks && (
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {props.legalLinks.map((link, index) => (
                <li key={link} className={cn(index > 0 && 'border-l border-white/25 pl-3')}>{link}</li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    )
  }

  if (props.variant === 'studio' || props.variant === 'dark') {
    const footerBackground = props.variant === 'dark' ? theme.text : '#343d33'
    return (
      <footer className={cn('py-12 text-white', px)} style={{ background: footerBackground }}>
        <div className={cn('mx-auto grid max-w-[1100px] gap-10', pick(device, {
          desktop: 'grid-cols-[1.4fr_repeat(3,minmax(0,1fr))_1.2fr]',
          tablet: 'grid-cols-2',
          mobile: 'grid-cols-1',
        }))}>
          <div className={cn(pick(device, { desktop: '', tablet: 'col-span-2', mobile: '' }))}>
            <div className="flex items-center gap-3">
              {props.brandIcon && (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50">
                  <Icon name={props.brandIcon} size={23} />
                </span>
              )}
              <p className={cn(heading, 'text-xl uppercase tracking-[0.16em]')}>{props.brand}</p>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">{props.tagline}</p>
            {props.socialLinks && (
              <div className="mt-5 flex gap-2.5">
                {props.socialLinks.map((social) => {
                  const SocialIcon = SOCIAL_ICONS[social.platform]
                  return (
                    <span key={social.platform} role="img" aria-label={social.label} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 text-white/90">
                      <SocialIcon size={15} aria-hidden="true" />
                    </span>
                  )
                })}
              </div>
            )}
          </div>
          {props.columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">{column.title}</h3>
              {column.links.length > 0 && (
                <ul className="space-y-2.5 text-sm text-white/70">
                  {column.links.map((link) => <li key={link}>{link}</li>)}
                </ul>
              )}
              {column.details && (
                <ul className="space-y-3 text-sm text-white/70">
                  {column.details.map((detail) => (
                    <li key={detail.text} className="flex items-start gap-2.5">
                      <Icon name={detail.icon} size={16} className="mt-0.5 shrink-0 text-white/85" />
                      <span className="min-w-0 [overflow-wrap:anywhere]">{detail.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {props.newsletter && (
            <div className={cn(pick(device, { desktop: '', tablet: 'col-span-2', mobile: '' }))}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">Stay connected</h3>
              <p className="mb-4 text-sm leading-relaxed text-white/70">Get the latest news, updates and special offers.</p>
              <input
                type="email"
                placeholder={props.newsletter.placeholder}
                aria-label="Email address"
                className="w-full rounded-md border border-white/30 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/55 focus:border-white/70"
              />
              <button type="button" className="mt-2.5 w-full rounded-md bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: footerBackground }}>
                {props.newsletter.buttonLabel}
              </button>
            </div>
          )}
        </div>
        <div className={cn('mx-auto mt-10 max-w-[1100px] border-t border-white/20 pt-5 text-xs text-white/65', pick(device, {
          desktop: 'flex items-center justify-between gap-4',
          tablet: 'flex items-center justify-between gap-4',
          mobile: 'flex flex-col gap-3',
        }))}>
          <p>{props.copyright}</p>
          {props.legalLinks && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {props.legalLinks.map((link) => <li key={link}>{link}</li>)}
            </ul>
          )}
        </div>
      </footer>
    )
  }

  return (
    <footer className={cn('py-14', px)} style={{ borderTop: `1px solid ${theme.text}14` }}>
      <div className={cn('mx-auto max-w-[1100px] gap-10', pick(device, { desktop: props.newsletter ? 'grid grid-cols-[1.4fr_repeat(3,1fr)_1.3fr]' : 'grid grid-cols-[1.4fr_repeat(3,1fr)]', tablet: 'grid grid-cols-2 gap-10', mobile: 'flex flex-col' }))}>
        <div>
          <p className={cn('text-xl', heading)}>{props.brand}</p>
          <p className="mt-2 max-w-xs" style={{ color: theme.muted }}>{props.tagline}</p>
        </div>
        {props.columns.map((c) => (
          <div key={c.title}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider">{c.title}</p>
            <ul className="space-y-2" style={{ color: theme.muted }}>
              {c.links.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
        {props.newsletter && (
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider">Stay connected</p>
            <div className="flex">
              <input type="email" aria-label="Email address" placeholder={props.newsletter.placeholder} className="min-w-0 flex-1 border bg-transparent px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: `${theme.text}33` }} />
              <button type="button" className="shrink-0 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ background: theme.primary, color: theme.primaryText }}>{props.newsletter.buttonLabel}</button>
            </div>
          </div>
        )}
      </div>
      <p className="mx-auto mt-12 max-w-[1100px] text-sm" style={{ color: theme.muted }}>{props.copyright}</p>
    </footer>
  )
}

/** Section registry — the editor will extend this with per-type inspectors. */
export function ImageBandSection({ props }: { props: ImageBandProps }) {
  const { theme, device } = useTokens()
  return (
    <section className={cn('w-full overflow-hidden', pick(device, { desktop: 'h-[380px]', tablet: 'h-[280px]', mobile: 'h-[220px]' }))} style={{ background: theme.background }}>
      <ImageArt icon="sparkles" imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center'} label={props.label} />
    </section>
  )
}

export function renderSection(section: Section): ReactNode {
  switch (section.type) {
    case 'navbar': return <NavbarSection props={section.props} />
    case 'hero': return <HeroSection props={section.props} />
    case 'story': return <StorySection props={section.props} />
    case 'features': return <FeaturesSection props={section.props} />
    case 'showcase': return <ShowcaseSection props={section.props} />
    case 'testimonials': return <TestimonialsSection props={section.props} />
    case 'cta': return <CtaSection props={section.props} />
    case 'footer': return <FooterSection props={section.props} />
    case 'image': return <ImageBandSection props={section.props} />
  }
}
