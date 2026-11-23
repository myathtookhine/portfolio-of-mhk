/**
 * Eased page scrolling, without a library.
 *
 * - Mouse wheel / trackpad: the page glides towards where the wheel points, so
 *   each notch eases out instead of jumping.
 * - Section jumps (nav, buttons, #anchors): a timed tween with an ease-in-out curve.
 *
 * Touch, keyboard and scrollbar scrolling stay native. Everything is off for
 * visitors who prefer reduced motion.
 */

/** Share of the remaining distance covered per 60fps frame: lower = slower, softer. */
const WHEEL_EASE = 0.075
/** Anchor jumps: duration grows with distance, within these bounds. */
const MIN_JUMP_MS = 900
const MAX_JUMP_MS = 1800

let target = 0
let current = 0
let wheelFrame = 0
let lastTime = 0
let tweenFrame = 0

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight
const clamp = (v: number) => Math.min(Math.max(v, 0), maxScroll())
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

function stopAll() {
  cancelAnimationFrame(wheelFrame)
  cancelAnimationFrame(tweenFrame)
  wheelFrame = 0
  tweenFrame = 0
}

function wheelStep(now: number) {
  const dt = lastTime ? Math.min(now - lastTime, 64) : 16.7
  lastTime = now
  // Frame-rate independent ease: the same feel at 60Hz and 120Hz.
  const ease = 1 - (1 - WHEEL_EASE) ** (dt / 16.7)
  current += (target - current) * ease
  if (Math.abs(target - current) < 0.5) {
    current = target
    window.scrollTo(0, current)
    wheelFrame = 0
    return
  }
  window.scrollTo(0, current)
  wheelFrame = requestAnimationFrame(wheelStep)
}

/** True if the wheel should scroll something inside the page rather than the page itself. */
function scrollsInside(el: EventTarget | null, deltaY: number) {
  if (!(el instanceof Element)) return false
  for (let node: Element | null = el; node && node !== document.body; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node)
    if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
      const atTop = node.scrollTop <= 0
      const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true
    }
  }
  return false
}

function onWheel(e: WheelEvent) {
  if (e.defaultPrevented || e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
  // Modals and the open mobile menu lock the page: leave those to the browser.
  if (document.querySelector('dialog[open]') || document.body.style.overflow === 'hidden') return
  if (scrollsInside(e.target, e.deltaY)) return

  e.preventDefault()
  const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY

  if (tweenFrame) stopAll()
  if (!wheelFrame) {
    // Start from wherever the page is now (it may have moved by keyboard or scrollbar).
    current = window.scrollY
    target = current
    lastTime = 0
    wheelFrame = requestAnimationFrame(wheelStep)
  }
  target = clamp(target + delta)
}

/** Ease the page to a y position. */
export function smoothScrollTo(y: number) {
  stopAll()
  const to = clamp(y)
  if (reducedMotion()) {
    window.scrollTo(0, to)
    return
  }
  const from = window.scrollY
  const distance = to - from
  if (Math.abs(distance) < 1) return
  const duration = Math.min(MAX_JUMP_MS, Math.max(MIN_JUMP_MS, Math.abs(distance) * 0.5))
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo(0, from + distance * easeInOutCubic(t))
    tweenFrame = t < 1 ? requestAnimationFrame(step) : 0
  }
  tweenFrame = requestAnimationFrame(step)
}

/** Where an element's top should land: below the fixed top bar on phones and tablets. */
export function elementTop(el: Element) {
  const headerOffset = window.innerWidth >= 1024 ? 0 : 64
  return el.getBoundingClientRect().top + window.scrollY - headerOffset
}

/** Same-page #anchor links (not router links, which ScrollManager handles). */
function onClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const link = (e.target as Element).closest?.('a[href^="#"]')
  if (!link || link.hasAttribute('data-native-anchor')) return
  const id = decodeURIComponent(link.getAttribute('href')!.slice(1))
  const el = id === 'top' ? document.body : document.getElementById(id)
  if (!el) return
  e.preventDefault()
  smoothScrollTo(id === 'top' ? 0 : elementTop(el))
}

/** Turn it on; returns a cleanup function. */
export function initSmoothScroll() {
  document.addEventListener('click', onClick)
  if (reducedMotion()) return () => document.removeEventListener('click', onClick)

  window.addEventListener('wheel', onWheel, { passive: false })
  return () => {
    stopAll()
    window.removeEventListener('wheel', onWheel)
    document.removeEventListener('click', onClick)
  }
}
