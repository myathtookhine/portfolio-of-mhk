import { useEffect, useRef } from 'react'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

type Props = {
  /** True while fading out after loading completes. */
  leaving: boolean
  durationMs: number
  /** Called once the loader has closed (after the fade, or early via Esc). */
  onDone: () => void
}

const FADE_MS = 300

// A modal <dialog>, so the page behind is inert while loading. Esc closes it
// early and goes straight to the portfolio.
export default function LoadingScreen({ leaving, durationMs, onDone }: Props) {
  const { t } = useLang()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  // Fade out, then close; the dialog's close event hands control back.
  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => ref.current?.close(), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [leaving])

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
    <dialog
      ref={ref}
      aria-label="Loading"
      onClose={onDone}
      className={`pixel-grid-bg m-0 h-full max-h-none w-full max-w-none place-items-center bg-bg p-4 text-text transition-opacity duration-300 backdrop:bg-bg open:grid ${
        leaving ? 'pointer-events-none opacity-0' : ''
      }`}
    >
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        <p role="status" className="sr-only">
          {t(ui.loading)}
        </p>
        <span className="pixel-corners grid h-16 w-16 animate-float place-items-center bg-primary font-display text-lg font-bold text-bg">
          MHK
        </span>
        <p aria-hidden="true" className="mt-8 font-display text-base font-semibold text-text">
          {t(ui.loading)}<span className="animate-blink">...</span>
        </p>
        {/* Segmented progress bar, timed to match the loading duration */}
        <div className="mt-5 h-5 w-full p-1 shadow-[inset_0_0_0_3px_var(--color-line)]" aria-hidden="true">
          <div className="h-full animate-loadbar bg-primary" style={{ animationDuration: `${durationMs}ms` }} />
        </div>
        <p className="mt-8 font-label text-xs tracking-widest text-muted uppercase">Myat Htoo Khaing · Portfolio</p>
      </div>
    </dialog>
  )
}
