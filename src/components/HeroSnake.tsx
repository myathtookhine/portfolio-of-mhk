import { useEffect, useRef } from 'react'

/** Grid cell size in CSS px; matches the 16px dot grid of .pixel-grid-bg. */
const CELL = 16
/** Gap between segments, so each reads as a separate pixel block. */
const GAP = 2
const LENGTH = 5
/** Milliseconds per step: quicker while chasing the cursor. */
const FOLLOW_TICK = 30
const WANDER_TICK = 110

type Cell = { x: number; y: number }
const DIRS: Cell[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]

/**
 * A pixel snake on the hero's dot grid. It chases the pointer while it's over
 * the hero, and wanders between random spots otherwise. Renders to a canvas
 * over the hero content (clicks pass through); the parent must be positioned.
 */
export default function HeroSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const area = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !area || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const theme = getComputedStyle(document.documentElement)
    const color = (name: string, fallback: string) => theme.getPropertyValue(name).trim() || fallback
    const BODY = color('--color-primary', '#fab304')
    const SHADE = color('--color-primary-dark', '#c98f00')
    const EYE = color('--color-bg', '#171717')

    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let body: Cell[] = []
    let dir: Cell = { x: 1, y: 0 }
    let pointer: Cell | null = null
    let wanderTo: Cell = { x: 0, y: 0 }
    let raf = 0
    let last = 0
    let acc = 0
    let running = false

    const randomCell = (): Cell => ({
      x: 1 + Math.floor(Math.random() * Math.max(1, cols - 2)),
      y: 1 + Math.floor(Math.random() * Math.max(1, rows - 2)),
    })
    const clampCell = (c: Cell): Cell => ({
      x: Math.min(cols - 1, Math.max(0, c.x)),
      y: Math.min(rows - 1, Math.max(0, c.y)),
    })

    const resize = () => {
      const r = area.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = r.width
      height = r.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.max(4, Math.floor(width / CELL))
      rows = Math.max(4, Math.floor(height / CELL))
      if (body.length === 0) {
        // Start in the lower-left area, heading right.
        const start = { x: Math.min(LENGTH + 2, cols - 2), y: Math.floor(rows * 0.75) }
        body = Array.from({ length: LENGTH }, (_, i) => clampCell({ x: start.x - i, y: start.y }))
        wanderTo = randomCell()
      } else {
        body = body.map(clampCell)
        wanderTo = clampCell(wanderTo)
      }
      draw()
    }

    const step = () => {
      const head = body[0]
      if (!pointer && head.x === wanderTo.x && head.y === wanderTo.y) wanderTo = randomCell()
      const goal = pointer ?? wanderTo
      // Cells the head may not enter (the tail tip moves away this step).
      const occupied = new Set(body.slice(0, -1).map((c) => `${c.x},${c.y}`))

      let best: Cell | null = null
      let bestScore = Infinity
      for (const d of DIRS) {
        if (d.x === -dir.x && d.y === -dir.y) continue // no 180° turns
        const nx = head.x + d.x
        const ny = head.y + d.y
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
        // Straight-line distance, not Manhattan: when the goal is directly behind,
        // turning scores better than running away, so the snake makes a U-turn.
        let score = Math.hypot(goal.x - nx, goal.y - ny)
        if (occupied.has(`${nx},${ny}`)) score += 1000
        if (d.x === dir.x && d.y === dir.y) score -= 0.4 // prefer straight runs
        if (!pointer) score += Math.random() * 1.2 // meander while wandering
        if (score < bestScore) {
          bestScore = score
          best = d
        }
      }
      // Boxed in (only possible in tiny areas): turn around.
      const d = best ?? { x: -dir.x, y: -dir.y }
      dir = d
      body.unshift(clampCell({ x: head.x + d.x, y: head.y + d.y }))
      body.pop()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const size = CELL - GAP
      for (let i = body.length - 1; i >= 0; i--) {
        const c = body[i]
        const t = i / (body.length - 1) // 0 = head, 1 = tail tip
        // Taper the last few segments.
        const inset = t > 0.8 ? 3 : t > 0.6 ? 1 : 0
        ctx.globalAlpha = 1 - t * 0.45
        ctx.fillStyle = i === 0 ? BODY : i % 2 ? SHADE : BODY
        ctx.fillRect(c.x * CELL + GAP / 2 + inset, c.y * CELL + GAP / 2 + inset, size - inset * 2, size - inset * 2)
      }
      ctx.globalAlpha = 1

      // Eyes: two dark pixels on the head, towards the direction of travel.
      const h = body[0]
      const x0 = h.x * CELL + GAP / 2
      const y0 = h.y * CELL + GAP / 2
      const e = 3 // eye size
      const near = 2 // distance from the leading edge
      const spread = [3, size - 3 - e]
      ctx.fillStyle = EYE
      for (const s of spread) {
        const ex = dir.x === 1 ? x0 + size - near - e : dir.x === -1 ? x0 + near : x0 + s
        const ey = dir.y === 1 ? y0 + size - near - e : dir.y === -1 ? y0 + near : y0 + s
        ctx.fillRect(ex, ey, e, e)
      }
    }

    const frame = (ts: number) => {
      acc += Math.min(ts - last, 250) // don't fast-forward after a pause
      last = ts
      const tick = pointer ? FOLLOW_TICK : WANDER_TICK
      let moved = false
      while (acc >= tick) {
        step()
        acc -= tick
        moved = true
      }
      if (moved) draw()
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const toCell = (e: PointerEvent): Cell => {
      const r = area.getBoundingClientRect()
      return clampCell({ x: Math.floor((e.clientX - r.left) / CELL), y: Math.floor((e.clientY - r.top) / CELL) })
    }
    const onMove = (e: PointerEvent) => {
      pointer = toCell(e)
    }
    const onLeave = () => {
      pointer = null
      wanderTo = randomCell()
    }
    // Touch has no hover: follow while the finger is down, then go back to wandering.
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') onLeave()
    }

    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerdown', onMove)
    area.addEventListener('pointerleave', onLeave)
    area.addEventListener('pointerup', onUp)
    area.addEventListener('pointercancel', onLeave)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(area)
    // Only animate while the hero is on screen.
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    visibility.observe(area)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibility.disconnect()
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerdown', onMove)
      area.removeEventListener('pointerleave', onLeave)
      area.removeEventListener('pointerup', onUp)
      area.removeEventListener('pointercancel', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 h-full w-full" />
}
