import { useEffect, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>'
/** Pause between runs: a random time in this range, forever. */
const MIN_WAIT_MS = 2500
const MAX_WAIT_MS = 7000
const FRAME_MS = 45
/** Frames each letter keeps cycling; later letters settle later, left to right. */
const FRAMES_PER_LETTER = 6

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

/**
 * "Hypertext" effect: every few seconds, at a random moment, the letters
 * scramble through random glyphs and settle back into the text one by one.
 * Each letter sits in a fixed-width cell so the word doesn't jitter.
 */
export default function ScrambleText({ text, className = '' }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let wait: number
    let tick: number

    const run = () => {
      let frame = 0
      const total = text.length * FRAMES_PER_LETTER
      tick = window.setInterval(() => {
        frame++
        setShown(
          [...text]
            .map((c, i) => (frame >= (i + 1) * FRAMES_PER_LETTER || c === ' ' ? c : randomGlyph()))
            .join(''),
        )
        if (frame >= total) {
          window.clearInterval(tick)
          schedule()
        }
      }, FRAME_MS)
    }
    const schedule = () => {
      wait = window.setTimeout(run, MIN_WAIT_MS + Math.random() * (MAX_WAIT_MS - MIN_WAIT_MS))
    }

    schedule()
    return () => {
      window.clearTimeout(wait)
      window.clearInterval(tick)
      setShown(text)
    }
  }, [text])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {[...shown].map((c, i) => (
          <span key={i} className="inline-block w-[1.05em] text-center">
            {c}
          </span>
        ))}
      </span>
    </span>
  )
}
