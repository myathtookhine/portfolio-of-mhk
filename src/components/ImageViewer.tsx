import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import PixelIcon, { type IconName } from './PixelIcon'

export type ViewerImage = { src: string; alt: string }

type Props = {
  images: ViewerImage[]
  /** Index of the open image, or null when the viewer is closed. */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

// Full-screen image viewer with zoom and pan. A native modal <dialog>, so it
// stacks above the project modal, traps focus, and closes on Esc.
export default function ImageViewer({ images, index, onIndexChange, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = index !== null && Boolean(images[index])
  const count = images.length

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // Start keyboard users on Close; browsers differ in what showModal() focuses.
      dialog.querySelector<HTMLButtonElement>('[data-close]')?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Lock page scroll while open; restores whatever was set before (e.g. by the project modal).
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [open])

  const go = useCallback(
    (delta: number) => index !== null && onIndexChange((index + delta + count) % count),
    [index, count, onIndexChange],
  )

  // Arrow keys switch images. On window: clicking the image area moves focus to
  // the dialog element itself, above any handler inside it.
  useEffect(() => {
    if (!open || count < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, count, go])

  return (
    <dialog
      ref={ref}
      aria-label="Image viewer"
      onClose={onClose}
      className="relative m-0 h-full max-h-none w-full max-w-none flex-col bg-bg/95 p-0 text-text backdrop:bg-black/80 open:flex"
    >
      {open && (
        <>
          {/* Keyed by index: each image starts fitted to the screen */}
          <ViewerBody
            key={index}
            image={images[index]}
            position={count > 1 ? `${index + 1} / ${count}` : null}
            onClose={onClose}
          />
          {/* Outside the keyed body, so they keep keyboard focus when the image changes */}
          {count > 1 && (
            <>
              <NavButton side="left" onClick={() => go(-1)} />
              <NavButton side="right" onClick={() => go(1)} />
            </>
          )}
        </>
      )}
    </dialog>
  )
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const STEP = 1.5
const DOUBLE_TAP_ZOOM = 2.5

type View = { s: number; x: number; y: number }
const FIT: View = { s: 1, x: 0, y: 0 }
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

type Gesture =
  | { kind: 'pan'; startX: number; startY: number; x: number; y: number }
  | { kind: 'pinch'; dist: number; s: number }

type BodyProps = {
  image: ViewerImage
  position: string | null
  onClose: () => void
}

function ViewerBody({ image, position, onClose }: BodyProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [view, setView] = useState<View>(FIT)
  // Animate button/keyboard zooms; follow the finger/mouse directly during gestures.
  const [smooth, setSmooth] = useState(true)
  const [dragging, setDragging] = useState(false)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const gesture = useRef<Gesture | null>(null)
  // Where the press started. The target is recorded on pointerdown: once the
  // stage captures the pointer, later events report the stage as their target.
  const press = useRef({ x: 0, y: 0, time: 0, moved: false, onImage: false })
  const lastTap = useRef({ x: 0, y: 0, time: 0 })
  // Set by a tap on the empty area; the close happens on the following click
  // event. Closing on pointerup would let that click land on the page behind.
  const closeOnClick = useRef(false)

  /** Keep the zoomed image covering the stage: no panning past its edges. */
  const constrain = useCallback((v: View): View => {
    const stage = stageRef.current
    const img = imgRef.current
    if (!stage || !img || v.s <= MIN_ZOOM) return FIT
    const maxX = Math.max(0, (img.offsetWidth * v.s - stage.clientWidth) / 2)
    const maxY = Math.max(0, (img.offsetHeight * v.s - stage.clientHeight) / 2)
    return { s: v.s, x: clamp(v.x, -maxX, maxX), y: clamp(v.y, -maxY, maxY) }
  }, [])

  /** Zoom to a new scale, keeping the point (px, py) — relative to the stage centre — in place. */
  const zoomTo = useCallback(
    (next: (s: number) => number, px = 0, py = 0) =>
      setView((v) => {
        const s = clamp(next(v.s), MIN_ZOOM, MAX_ZOOM)
        const r = s / v.s
        return constrain({ s, x: px - (px - v.x) * r, y: py - (py - v.y) * r })
      }),
    [constrain],
  )

  const fromCenter = (clientX: number, clientY: number) => {
    const r = stageRef.current!.getBoundingClientRect()
    return { px: clientX - r.left - r.width / 2, py: clientY - r.top - r.height / 2 }
  }

  const zoomIn = useCallback(() => {
    setSmooth(true)
    zoomTo((s) => s * STEP)
  }, [zoomTo])
  const zoomOut = useCallback(() => {
    setSmooth(true)
    zoomTo((s) => s / STEP)
  }, [zoomTo])
  const fit = useCallback(() => {
    setSmooth(true)
    setView(FIT)
  }, [])

  // Zoom keys, on window for the same reason as the arrow keys.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') zoomIn()
      else if (e.key === '-' || e.key === '_') zoomOut()
      else if (e.key === '0') fit()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomIn, zoomOut, fit])

  // Wheel zoom towards the cursor. Native listener: React's onWheel is passive
  // and can't stop the browser's own ctrl+wheel page zoom.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      setSmooth(false)
      const r = stage.getBoundingClientRect()
      zoomTo((s) => s * Math.exp(-e.deltaY * 0.002), e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2)
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [zoomTo])

  // Re-fit if the window resizes (the fitted image size changes).
  useEffect(() => {
    const onResize = () => setView((v) => constrain(v))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [constrain])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const onImage = e.target === imgRef.current
    closeOnClick.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    setSmooth(false)
    const pts = [...pointers.current.values()]
    if (pts.length === 1) {
      press.current = { x: e.clientX, y: e.clientY, time: e.timeStamp, moved: false, onImage }
      gesture.current = { kind: 'pan', startX: e.clientX, startY: e.clientY, x: view.x, y: view.y }
      if (view.s > MIN_ZOOM) setDragging(true)
    } else if (pts.length === 2) {
      press.current.moved = true // a pinch is never a tap
      gesture.current = { kind: 'pinch', dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), s: view.s }
    }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (Math.hypot(e.clientX - press.current.x, e.clientY - press.current.y) > 6) press.current.moved = true
    const g = gesture.current
    if (!g) return

    if (g.kind === 'pinch') {
      const [a, b] = [...pointers.current.values()]
      if (!a || !b) return
      const { px, py } = fromCenter((a.x + b.x) / 2, (a.y + b.y) / 2)
      const ratio = Math.hypot(a.x - b.x, a.y - b.y) / g.dist
      zoomTo(() => g.s * ratio, px, py)
    } else if (view.s > MIN_ZOOM) {
      setView((v) => constrain({ s: v.s, x: g.x + e.clientX - g.startX, y: g.y + e.clientY - g.startY }))
    }
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId)
    const remaining = [...pointers.current.values()]
    if (remaining.length === 1) {
      // Pinch → one finger left: continue as a pan from here.
      gesture.current = { kind: 'pan', startX: remaining[0].x, startY: remaining[0].y, x: view.x, y: view.y }
      return
    }
    if (remaining.length > 0) return
    gesture.current = null
    setDragging(false)

    const p = press.current
    if (p.moved || e.timeStamp - p.time > 300) return

    // Double tap / double click on the image toggles zoom.
    const t = lastTap.current
    if (p.onImage && e.timeStamp - t.time < 300 && Math.hypot(e.clientX - t.x, e.clientY - t.y) < 30) {
      lastTap.current.time = 0
      setSmooth(true)
      if (view.s > MIN_ZOOM) setView(FIT)
      else {
        const { px, py } = fromCenter(e.clientX, e.clientY)
        zoomTo(() => DOUBLE_TAP_ZOOM, px, py)
      }
      return
    }
    lastTap.current = { x: e.clientX, y: e.clientY, time: e.timeStamp }

    // A single tap on the empty area around the image closes the viewer.
    if (!p.onImage && view.s === MIN_ZOOM) closeOnClick.current = true
  }

  const zoomed = view.s > MIN_ZOOM

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b-[3px] border-line px-3 py-2 sm:px-5">
        <span className="font-label text-xs tracking-widest text-muted uppercase">{position ?? 'Image'}</span>
        <div className="flex items-center gap-1 sm:gap-2">
          <ToolButton icon="zoomOut" label="Zoom out" onClick={zoomOut} disabled={!zoomed} />
          <span aria-live="polite" className="w-14 text-center font-label text-xs tracking-wider text-text">
            {Math.round(view.s * 100)}%
          </span>
          <ToolButton icon="zoomIn" label="Zoom in" onClick={zoomIn} disabled={view.s >= MAX_ZOOM} />
          <ToolButton icon="fit" label="Fit to screen" onClick={fit} disabled={!zoomed} />
          <span aria-hidden="true" className="mx-1 h-6 w-0.75 bg-line" />
          <ToolButton icon="close" label="Close image viewer" onClick={onClose} dataClose />
        </div>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={() => {
          if (!closeOnClick.current) return
          closeOnClick.current = false
          onClose()
        }}
        className={`relative min-h-0 flex-1 touch-none overflow-hidden select-none ${
          zoomed ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
          <img
            ref={imgRef}
            src={image.src}
            alt={image.alt}
            draggable={false}
            onLoad={() => setView((v) => constrain(v))}
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
              transition: smooth ? 'transform 150ms ease-out' : 'none',
            }}
            className={`max-h-full max-w-full object-contain will-change-transform ${zoomed ? '' : 'cursor-zoom-in'}`}
          />
        </div>
      </div>

      {/* Caption + hint */}
      <div className="shrink-0 border-t-[3px] border-line px-4 py-3 text-center sm:px-6">
        <p className="mx-auto max-w-3xl truncate text-sm text-text/85">{image.alt}</p>
        <p className="mt-1 hidden font-label text-xs tracking-widest text-muted uppercase sm:block">
          Scroll to zoom · Drag to move · Double-click to toggle · Esc to close
        </p>
        <p className="mt-1 font-label text-xs tracking-widest text-muted uppercase sm:hidden">
          Pinch or double-tap to zoom
        </p>
      </div>
    </div>
  )
}

function ToolButton({
  icon,
  label,
  onClick,
  disabled,
  dataClose,
}: {
  icon: IconName
  label: string
  onClick: () => void
  disabled?: boolean
  /** Marks the button the viewer focuses when it opens. */
  dataClose?: boolean
}) {
  return (
    <button
      type="button"
      // aria-disabled rather than disabled: a disabled button drops keyboard focus.
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      aria-label={label}
      title={label}
      data-close={dataClose || undefined}
      className="grid h-10 w-10 cursor-pointer place-items-center text-text hover:bg-surface hover:text-primary aria-disabled:cursor-(--cursor-default) aria-disabled:text-muted/40 aria-disabled:hover:bg-transparent"
    >
      <PixelIcon name={icon} size={icon === 'close' || icon === 'fit' ? 14 : 18} />
    </button>
  )
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      className={`pixel-corners absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center bg-bg/85 text-text shadow-[inset_0_0_0_3px_var(--color-line)] hover:bg-primary hover:text-bg ${
        side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'
      }`}
    >
      <PixelIcon name={side === 'left' ? 'arrowLeft' : 'arrowRight'} size={16} />
    </button>
  )
}
