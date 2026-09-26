import PixelIcon from './PixelIcon'

type Props = {
  playing: boolean
  onToggle: () => void
}

export default function MusicButton({ playing, onToggle }: Props) {
  const label = playing ? 'Pause background music' : 'Play background music'

  return (
    <button
      type="button"
      data-music-button
      onClick={onToggle}
      aria-label={label}
      title={label}
      // Unclipped round button, so the focus ring isn't cut off by the pixel shape.
      className="group fixed right-4 bottom-4 z-50 grid h-14 w-14 animate-pop cursor-pointer place-items-center rounded-full sm:right-6 sm:bottom-6"
    >
      {/* Pixel rings radiating outward while the music plays */}
      {playing && (
        <>
          <span aria-hidden="true" className="pixel-circle absolute inset-0 animate-radiate bg-primary" />
          <span aria-hidden="true" className="pixel-circle absolute inset-0 animate-radiate bg-primary [animation-delay:0.8s]" />
        </>
      )}
      <span
        aria-hidden="true"
        className="pixel-circle absolute inset-0 bg-primary shadow-[inset_-4px_-4px_0_0_var(--color-primary-dark)] transition-transform duration-100 group-hover:scale-110 group-active:scale-95"
      />
      <PixelIcon name={playing ? 'pause' : 'play'} size={18} className="relative text-bg" />
    </button>
  )
}
