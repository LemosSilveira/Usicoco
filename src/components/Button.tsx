import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

interface CommonProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type AsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonProps = AsButton | AsAnchor

const BASE =
  'inline-flex items-center justify-center gap-2 min-h-12 rounded-full px-6 font-mono text-xs uppercase tracking-[0.08em] transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-usicoco)] active:scale-[0.97]'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-green-700 text-white hover:bg-green-500',
  ghost: 'border border-current bg-transparent hover:bg-coco-950/5',
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-150 ease-[var(--ease-usicoco)] group-hover:translate-x-1"
    >
      <path
        d="M3 8h10m0 0L9 4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '', ...rest } = props
  const classes = `group ${BASE} ${VARIANTS[variant]} ${className}`
  const showArrow = variant === 'primary'

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
        {showArrow && <Arrow />}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
      {showArrow && <Arrow />}
    </button>
  )
}
