import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:outline-brand-600',
  dark: 'bg-slate-900 text-white shadow-sm hover:bg-slate-800 focus-visible:outline-slate-900',
  secondary: 'bg-white text-slate-800 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus-visible:outline-slate-400',
  ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-400',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-12 gap-2 px-6 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

type ButtonProps = CommonProps & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type LinkButtonProps = CommonProps & { to: string; onClick?: () => void }

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = 'primary', size = 'md', className, children, leftIcon, rightIcon } = props
  const classes = cn(
    'inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition-colors',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
  const content = (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  )

  if (props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} className={classes}>
        {content}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, leftIcon: _l, rightIcon: _r, to: _t, ...rest } = props
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
