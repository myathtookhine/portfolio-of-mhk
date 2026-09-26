import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Show the hard primary-colored offset shadow. */
  shadow?: boolean
  /** Lift the card on hover (for clickable cards). */
  interactive?: boolean
}

// clip-path would cut off an outer box-shadow, so the offset shadow is a
// separate clipped layer sitting behind the card.
export default function PixelCard({ children, className = '', shadow = true, interactive }: Props) {
  return (
    <div className={`group/card relative h-full ${interactive ? 'cursor-pointer' : ''}`}>
      {shadow && (
        <div
          aria-hidden="true"
          className={`pixel-corners absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary ${
            interactive ? 'transition-transform duration-100 group-hover/card:translate-x-2.5 group-hover/card:translate-y-2.5' : ''
          }`}
        />
      )}
      <div
        className={`pixel-corners pixel-border relative h-full bg-surface ${
          interactive
            ? 'transition-transform duration-100 group-hover/card:-translate-x-1 group-hover/card:-translate-y-1'
            : ''
        } ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
