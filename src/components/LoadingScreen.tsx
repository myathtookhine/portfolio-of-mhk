import { useEffect } from 'react'

type Props = {
  /** True while fading out; the overlay no longer blocks clicks or scrolling. */
  leaving: boolean
  durationMs: number
}

export default function LoadingScreen({ leaving, durationMs }: Props) {
  // Keep the page behind from scrolling while the loader is up.
  useEffect(() => {
    if (leaving) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [leaving])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={leaving || undefined}
      className={`pixel-grid-bg fixed inset-0 z-80 grid place-items-center bg-bg px-4 transition-opacity duration-300 ${
        leaving ? 'pointer-events-none opacity-0' : ''
      }`}
    >
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        <span className="pixel-corners grid h-16 w-16 animate-float place-items-center bg-primary font-pixel text-sm text-bg">
          MHK
        </span>
        <p className="mt-8 font-pixel text-xs text-text">
          Loading<span className="animate-blink">...</span>
        </p>
        {/* Segmented progress bar, timed to match the loader's duration */}
        <div className="mt-5 h-5 w-full p-1 shadow-[inset_0_0_0_3px_var(--color-line)]" aria-hidden="true">
          <div className="h-full animate-loadbar bg-primary" style={{ animationDuration: `${durationMs}ms` }} />
        </div>
        <p className="mt-4 font-label text-xs tracking-widest text-muted uppercase">Myat Htoo Khaing · Portfolio</p>
      </div>
    </div>
  )
}
