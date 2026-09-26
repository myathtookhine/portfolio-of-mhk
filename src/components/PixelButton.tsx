import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  href?: string
  to?: string
  variant?: 'primary' | 'outline'
  external?: boolean
  download?: boolean
  className?: string
  onClick?: () => void
}

export default function PixelButton({
  children,
  href,
  to,
  variant = 'primary',
  external,
  download,
  className = '',
  onClick,
}: Props) {
  // Full width on phones, natural width from the sm breakpoint up.
  const cls = `pixel-btn pixel-btn-${variant} w-full sm:w-auto ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        download={download || undefined}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
