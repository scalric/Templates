import type { ReactNode } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Facebook, Heart, Instagram, Leaf, Linkedin, Menu, Search, ShoppingBag, ShoppingCart, Star, User, Youtube, type LucideIcon } from 'lucide-react'
import { Icon } from '../components/ui/Icon'
import { cn } from '../lib/cn'
import type {
  CtaProps, FeaturesProps, FooterProps, HeroProps, NavbarProps, Section, ShowcaseItem, ShowcaseProps, StoryProps, TestimonialsProps,
} from '../types/site'
import { pick, useSite } from './context'
import { ImageArt } from './ImageArt'
import { PinterestIcon } from '../components/ui/PinterestIcon'

/** Accent blue used by the academy layouts (headline highlight, banner button). */
const ACCENT_BLUE = '#1f9ee6'

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

  if (props.layout === 'boutique') {
    const lines = props.title.split('\n')
    return (
      <section className={cn('relative flex items-center overflow-hidden text-white', pick(device, { desktop: 'min-h-[600px]', tablet: 'min-h-[520px]', mobile: 'min-h-[460px]' }))}>
        <ImageArt icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center 35%'} className="absolute inset-0 h-full w-full object-cover" />
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
      <ImageArt icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition ?? 'center center'} className={className} />
    )
    return (
      <section className="relative overflow-hidden" style={{ background: theme.background }}>
        {device !== 'mobile' && (
          <>
            <div className="absolute inset-0">{image('h-full w-full object-cover')}</div>
            <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${theme.background} 0%, ${theme.background}f2 34%, ${theme.background}00 70%)` }} />
          </>
        )}
        <div className={cn('relative z-10 mx-auto max-w-[1200px]', pick(device, { desktop: 'flex min-h-[460px] flex-col justify-center px-12 py-16', tablet: 'px-8 py-12', mobile: 'px-5 pt-10' }))}>
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
              <ImageArt
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
                <ImageArt
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
          <ImageArt
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
          <div className={cn('relative z-20 mx-auto -mt-12 grid max-w-[1100px] overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-slate-900/5', px, device === 'desktop' ? cols(Math.min(props.benefits.length, 4)) : device === 'tablet' ? cols(Math.min(props.benefits.length, 3)) : cols(Math.min(props.benefits.length, 2)))}>
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
      <ImageArt icon={props.imageIcon} label={props.imageLabel} imageUrl={props.imageUrl} imagePosition={props.imagePosition} />
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
  const { theme, device, heading, h2, lead, px, py } = useTokens()
  const [first, second] = props.images
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
  const { theme, device, card, heading, btn } = useTokens()
  const dark = props.tone === 'dark'
  const journal = props.layout === 'journal'
  const gallery = props.layout === 'gallery'

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
            <div className={cn('relative overflow-hidden', programs ? 'rounded-md aspect-[4/3]' : card, gallery && 'ring-1 ring-amber-700/80', programs ? undefined : props.imageAspect === 'landscape' ? 'aspect-[16/10]' : isProducts ? 'aspect-[4/5]' : 'aspect-[4/3]')}>
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
                    <img src={t.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
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
                <img src={t.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
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
            <img src={props.imageUrl} alt="" aria-hidden="true" className="h-full w-full object-cover" />
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
          <div className="h-44 overflow-hidden"><img src={props.imageUrl} alt="" aria-hidden="true" className="h-full w-full object-cover" style={{ objectPosition: '18% center' }} /></div>
          {copy}
        </section>
      )
    }
    return (
      <section className={cn('relative flex items-center overflow-hidden', device === 'desktop' ? 'min-h-[330px]' : 'min-h-[290px]')} style={{ background: '#fbe3dd' }}>
        <img src={props.imageUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center center' }} />
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
  if (props.variant === 'boutique') {
    const stacked = device !== 'desktop'
    return (
      <footer className={cn('border-t py-12', pick(device, { desktop: 'px-12', tablet: 'px-8', mobile: 'px-5' }))} style={{ borderColor: `${theme.text}14`, background: theme.background, color: theme.text }}>
        <div className={cn('mx-auto grid max-w-[1200px] gap-10', pick(device, { desktop: 'grid-cols-[1.3fr_1fr_1fr_1fr_1.4fr]', tablet: 'grid-cols-2', mobile: 'grid-cols-2' }))}>
          <div className={cn(stacked && 'col-span-2')}>
            <p className="font-sans text-2xl font-semibold uppercase tracking-[0.35em]">{props.brand}</p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed" style={{ color: theme.muted }}>{props.tagline}</p>
            {props.socialLinks && (
              <div className="mt-5 flex gap-3">
                {props.socialLinks.map((social) => {
                  const SocialGlyph = SOCIAL_ICONS[social.platform]
                  return (
                    <span key={social.platform} role="img" aria-label={social.label} className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: `${theme.text}33` }}>
                      <SocialGlyph size={14} aria-hidden="true" />
                    </span>
                  )
                })}
              </div>
            )}
          </div>
          {props.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide">{column.title}</h3>
              <ul className="mt-4 space-y-2 text-xs" style={{ color: theme.muted }}>
                {column.links.map((link) => <li key={link}>{link}</li>)}
              </ul>
            </div>
          ))}
          {props.newsletter && (
            <div className={cn(stacked && 'col-span-2')}>
              <h3 className="text-xs font-semibold uppercase tracking-wide">Subscribe</h3>
              <p className="mt-4 text-xs leading-relaxed" style={{ color: theme.muted }}>Join our newsletter and get 10% off your first order.</p>
              <div className="mt-4 flex border" style={{ borderColor: `${theme.text}33` }}>
                <input aria-label="Email address" type="email" placeholder={props.newsletter.placeholder} className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xs focus:outline-none" />
                <span role="img" aria-label={props.newsletter.buttonLabel} className="flex w-10 shrink-0 items-center justify-center" style={{ background: theme.primary, color: theme.primaryText }}>
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-col gap-3 border-t pt-5 text-[11px] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${theme.text}14`, color: theme.muted }}>
          <p>{props.copyright}</p>
          <p className="flex flex-wrap gap-x-5 font-semibold tracking-wide" style={{ color: theme.text }}>
            <span>VISA</span><span>Mastercard</span><span>PayPal</span><span>Apple Pay</span>
          </p>
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
      <div className={cn('mx-auto max-w-[1100px] gap-10', pick(device, { desktop: 'grid grid-cols-[1.4fr_repeat(3,1fr)]', mobile: 'flex flex-col' }))}>
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
      </div>
      <p className="mx-auto mt-12 max-w-[1100px] text-sm" style={{ color: theme.muted }}>{props.copyright}</p>
    </footer>
  )
}

/** Section registry — the editor will extend this with per-type inspectors. */
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
  }
}
