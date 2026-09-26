import PixelButton from '../components/PixelButton'
import PixelIcon from '../components/PixelIcon'

export default function NotFound() {
  return (
    <section className="pixel-grid-bg grid min-h-[80svh] place-items-center px-4 pt-24 pb-16 text-center">
      <title>Game Over — 404</title>
      <div>
        <p className="font-label text-sm tracking-widest text-muted uppercase">Error 404</p>
        <h1 className="mt-6 text-[clamp(1.6rem,6vw,3.5rem)] text-primary">Game Over</h1>
        <p className="mx-auto mt-6 max-w-md text-text/80">
          This level doesn't exist. Maybe it was never built, or it moved.
        </p>
        <p className="mt-10 font-pixel text-xs text-text">
          Continue?<span className="animate-blink text-primary">_</span>
        </p>
        <div className="mt-8">
          <PixelButton to="/">
            <PixelIcon name="arrowLeft" size={12} /> Back home
          </PixelButton>
        </div>
      </div>
    </section>
  )
}
