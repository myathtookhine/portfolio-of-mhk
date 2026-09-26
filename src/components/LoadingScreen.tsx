import { useEffect, useRef } from 'react'
import PixelIcon from './PixelIcon'

export type LoaderStage = 'loading' | 'await' | 'leaving'

type Props = {
  stage: LoaderStage
  durationMs: number
  onStart: () => void
  onSkip: () => void
}

const FADE_MS = 300

// A modal <dialog>: the page behind is inert (no tabbing or clicking into it)
// until the visitor chooses how to enter.
export default function LoadingScreen({ stage, durationMs, onStart, onSkip }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const startRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  // Keyboard users land on Start as soon as it appears.
  useEffect(() => {
    if (stage === 'await') startRef.current?.focus()
  }, [stage])

  // Fade out, then close so the page becomes interactive.
  useEffect(() => {
    if (stage !== 'leaving') return
    const timer = window.setTimeout(() => ref.current?.close(), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [stage])

  // Keep the page behind from scrolling while the loader is up.
  useEffect(() => {
    if (stage === 'leaving') return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [stage])

  // Stays true while fading out, so the screen doesn't flip back to "Loading...".
  const loaded = stage !== 'loading'

  return (
    <dialog
      ref={ref}
      aria-label="Welcome"
      // Esc closes the dialog (browsers don't let a page block Esc before any
      // interaction), which counts as "continue without sound".
      onClose={() => stage !== 'leaving' && onSkip()}
      className={`pixel-grid-bg m-0 h-full max-h-none w-full max-w-none place-items-center bg-bg p-4 text-text transition-opacity duration-300 backdrop:bg-bg open:grid ${
        stage === 'leaving' ? 'pointer-events-none opacity-0' : ''
      }`}
    >
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        {/* Screen-reader announcement of the loading state */}
        <p role="status" className="sr-only">
          {loaded ? 'Ready. Press start to enter with sound.' : 'Loading'}
        </p>

        {loaded ? (
          // Once loading completes, only the two ways in remain on screen.
          <div className="flex w-full flex-col items-center gap-6">
            <button
              ref={startRef}
              type="button"
              onClick={onStart}
              disabled={stage === 'leaving'}
              className="pixel-btn pixel-btn-primary w-full animate-pop py-5 text-sm"
            >
              <PixelIcon name="play" size={14} />
              Press start
            </button>
            <button
              type="button"
              onClick={onSkip}
              disabled={stage === 'leaving'}
              className="animate-pop cursor-pointer font-label text-xs tracking-widest text-muted uppercase underline decoration-line decoration-2 underline-offset-4 hover:text-primary"
            >
              Continue without sound
            </button>
          </div>
        ) : (
          <>
            <span className="pixel-corners grid h-16 w-16 animate-float place-items-center bg-primary font-pixel text-sm text-bg">
              MHK
            </span>
            <p aria-hidden="true" className="mt-8 font-pixel text-xs text-text">
              Loading<span className="animate-blink">...</span>
            </p>
            {/* Segmented progress bar, timed to match the loading duration */}
            <div className="mt-5 h-5 w-full p-1 shadow-[inset_0_0_0_3px_var(--color-line)]" aria-hidden="true">
              <div className="h-full animate-loadbar bg-primary" style={{ animationDuration: `${durationMs}ms` }} />
            </div>
            <p className="mt-8 font-label text-xs tracking-widest text-muted uppercase">Myat Htoo Khaing · Portfolio</p>
          </>
        )}
      </div>
    </dialog>
  )
}
