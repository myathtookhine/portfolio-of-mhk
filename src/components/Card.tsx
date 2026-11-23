import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Darken the hairline border on hover (for clickable cards). */
  interactive?: boolean
}

/** Hairline-bordered panel: no shadow, no rounding. */
export default function Card({ children, className = '', interactive }: Props) {
  return (
    <div
      className={`group/card relative h-full border border-line bg-bg transition-colors duration-200 ${
        interactive ? 'cursor-pointer hover:border-text' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
