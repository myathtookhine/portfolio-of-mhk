import { useEffect, useRef } from 'react'
import Icon from './Icon'

const INTERACTIVE = 'a, button, [role="button"], summary, label, select'
/** How quickly the cursor catches up with the pointer, per 60fps frame. */
const FOLLOW = 0.35

/**
 * Cursor in the style of the reference: a small square that inverts whatever is
 * under it (mix-blend-mode: difference), turning into a round blue badge with an
 * arrow over links and buttons. Mouse and trackpad only; touch screens keep
 * their own behaviour. Hidden while a modal is open: modals render in the top
 * layer, above anything on the page, so the system cursor takes over there.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dot = dotRef.current
    const badge = badgeRef.current
    if (!dot || !badge) return

    const root = document.documentElement
    let x = -100
    let y = -100
    let cx = x
    let cy = y
    let hovering = false
    let scale = 0.2
    let inside = false
    let frame = 0
    let last = 0

    const render = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16.7
      last = now
      const ease = 1 - (1 - FOLLOW) ** (dt / 16.7)
      cx += (x - cx) * ease
      cy += (y - cy) * ease

      const modal = document.querySelector('dialog[open]') !== null
      const active = inside && !modal
      root.classList.toggle('custom-cursor', active)

      dot.style.transform = `translate3d(${cx - 4}px, ${cy - 4}px, 0)`
      dot.style.opacity = active && !hovering ? '1' : '0'
      scale += ((active && hovering ? 1 : 0.2) - scale) * ease
      badge.style.transform = `translate3d(${cx - 12}px, ${cy - 12}px, 0) scale(${scale})`
      badge.style.opacity = active && hovering ? '1' : '0'
      frame = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (!inside) {
        // First move after entering: jump there instead of sliding in from the edge.
        cx = x
        cy = y
        inside = true
      }
      hovering = (e.target as Element).closest?.(INTERACTIVE) != null
    }
    const onLeave = () => {
      inside = false
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      root.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-100 h-2 w-2 rounded-[1px] bg-white opacity-0 mix-blend-difference transition-opacity duration-150"
      />
      <div
        ref={badgeRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-100 grid h-6 w-6 place-items-center rounded-full bg-primary text-on-primary opacity-0 transition-opacity duration-150"
      >
        <Icon name="arrowUpRight" size={12} />
      </div>
    </>
  )
}
