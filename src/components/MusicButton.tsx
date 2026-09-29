import { useEffect, useRef, useState, type ReactNode } from 'react'
import PixelIcon from './PixelIcon'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

type Props = {
  playing: boolean
  onToggle: () => void
  /** Tempo of the music, used to keep the rings going before the loop starts. */
  beatBpm: number
  /** Beats elapsed in the music, or null while it isn't playing. */
  getBeats: () => number | null
  /** Show the "Sound on?" bubble inviting the visitor to turn music on. */
  showPrompt: boolean
  onPromptAccept: () => void
  onPromptDismiss: () => void
}

/** A new ring on every other beat (the lofi kick); each takes 8 beats to fade out. */
const RING_EVERY_BEATS = 2
const RING_LIFE_BEATS = 8
const RING_COUNT = RING_LIFE_BEATS / RING_EVERY_BEATS
/** Frames per ring, for the stepped pixel look. */
const RING_STEPS = 8
/** How long the "Now playing" bubble stays each time it shows. */
const NOW_PLAYING_MS = 4000
/** While the music plays, the bubble comes back after a random pause in this range. */
const REMINDER_MIN_MS = 12000
const REMINDER_MAX_MS = 30000

/**
 * Pixel rings radiating outward in time with the music. They follow the audio's
 * own clock, so they stay on the beat through pauses and when the loop restarts.
 */
function BeatRings({ beatBpm, getBeats }: Pick<Props, 'beatBpm' | 'getBeats'>) {
  const ringsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      // During the intro the loop hasn't started yet: keep the same tempo on the page clock.
      const beats = getBeats() ?? ((now - start) / 1000) * (beatBpm / 60)
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return
        const t = beats / RING_LIFE_BEATS - i / RING_COUNT
        const step = Math.floor((t - Math.floor(t)) * RING_STEPS) / RING_STEPS
        ring.style.transform = `scale(${1 + step * 1.1})`
        ring.style.opacity = String(0.55 * (1 - step))
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [beatBpm, getBeats])

  return Array.from({ length: RING_COUNT }, (_, i) => (
    <span
      key={i}
      ref={(el) => {
        ringsRef.current[i] = el
      }}
      aria-hidden="true"
      className="pixel-circle absolute inset-0 bg-primary opacity-0"
    />
  ))
}

/** Pixel speech bubble pointing at the music button. */
function Bubble({
  className = '',
  children,
  ...rest
}: {
  className?: string
  children: ReactNode
  role?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
}) {
  return (
    <div className={`relative animate-pop ${className}`} {...rest}>
      <div className="pixel-corners flex items-center bg-surface py-1 pr-1 pl-4 shadow-[inset_0_0_0_3px_var(--color-primary)]">
        {children}
      </div>
      {/* Stepped pixel pointer towards the music button */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 -right-2 h-4 w-2 -translate-y-1/2 bg-primary [clip-path:polygon(0_0,50%_0,50%_25%,100%_25%,100%_75%,50%_75%,50%_100%,0_100%)]"
      />
    </div>
  )
}

export default function MusicButton({
  playing,
  onToggle,
  beatBpm,
  getBeats,
  showPrompt,
  onPromptAccept,
  onPromptDismiss,
}: Props) {
  const { t } = useLang()
  const label = playing ? 'Pause background music' : 'Play background music'

  // Say so when the music starts, then pop up again now and then while it plays.
  const [wasPlaying, setWasPlaying] = useState(playing)
  const [showNowPlaying, setShowNowPlaying] = useState(playing)
  // Reappearances are only visual reminders; screen readers hear it once, at the start.
  const [isReminder, setIsReminder] = useState(false)
  if (playing !== wasPlaying) {
    setWasPlaying(playing)
    setShowNowPlaying(playing)
    setIsReminder(false)
  }
  useEffect(() => {
    if (!playing) return
    const delay = showNowPlaying
      ? NOW_PLAYING_MS
      : REMINDER_MIN_MS + Math.random() * (REMINDER_MAX_MS - REMINDER_MIN_MS)
    const timer = window.setTimeout(() => {
      if (!showNowPlaying) setIsReminder(true)
      setShowNowPlaying(!showNowPlaying)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [playing, showNowPlaying])

  return (
    // data-music-controls: clicks here aren't treated as the page's "first interaction".
    <div data-music-controls className="fixed right-4 bottom-4 z-50 flex items-center gap-4 sm:right-6 sm:bottom-6">
      {showPrompt && (
        <Bubble role="group" aria-label="Background music">
          <button
            type="button"
            onClick={onPromptAccept}
            className="cursor-pointer py-2 font-label text-xs tracking-widest text-text uppercase hover:text-primary"
          >
            <span aria-hidden="true" className="text-primary">
              ♪{' '}
            </span>
            {t(ui.soundOn)}
          </button>
          <button
            type="button"
            onClick={onPromptDismiss}
            aria-label="No thanks, keep the sound off"
            className="ml-1 grid h-8 w-8 cursor-pointer place-items-center text-muted hover:text-primary"
          >
            <PixelIcon name="close" size={10} />
          </button>
        </Bubble>
      )}

      {/* Screen readers hear it too; the region stays mounted so the change is announced. */}
      <div role="status">
        {showNowPlaying && (
          <Bubble className="pointer-events-none" aria-hidden={isReminder || undefined}>
            <p className="py-2 pr-3 font-label text-xs tracking-widest text-text uppercase">
              <span aria-hidden="true" className="inline-block animate-blink text-primary">
                ♪
              </span>{' '}
              {t(ui.nowPlaying)}
            </p>
          </Bubble>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        title={label}
        // Unclipped round button, so the focus ring isn't cut off by the pixel shape.
        className="group relative grid h-14 w-14 shrink-0 animate-pop cursor-pointer place-items-center rounded-full"
      >
        {playing && <BeatRings beatBpm={beatBpm} getBeats={getBeats} />}
        <span
          aria-hidden="true"
          className="pixel-circle absolute inset-0 bg-primary shadow-[inset_-4px_-4px_0_0_var(--color-primary-dark)] transition-transform duration-100 group-hover:scale-110 group-active:scale-95"
        />
        <PixelIcon name={playing ? 'pause' : 'play'} size={18} className="relative text-bg" />
      </button>
    </div>
  )
}
