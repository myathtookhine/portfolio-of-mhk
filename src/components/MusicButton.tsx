import PixelIcon from './PixelIcon'

type Props = {
  playing: boolean
  onToggle: () => void
  /** Show the "Sound on?" bubble inviting the visitor to turn music on. */
  showPrompt: boolean
  onPromptAccept: () => void
  onPromptDismiss: () => void
}

export default function MusicButton({ playing, onToggle, showPrompt, onPromptAccept, onPromptDismiss }: Props) {
  const label = playing ? 'Pause background music' : 'Play background music'

  return (
    // data-music-controls: clicks here aren't treated as the page's "first interaction".
    <div data-music-controls className="fixed right-4 bottom-4 z-50 flex items-center gap-4 sm:right-6 sm:bottom-6">
      {showPrompt && (
        <div role="group" aria-label="Background music" className="relative animate-pop">
          <div className="pixel-corners flex items-center bg-surface py-1 pr-1 pl-4 shadow-[inset_0_0_0_3px_var(--color-primary)]">
            <button
              type="button"
              onClick={onPromptAccept}
              className="cursor-pointer py-2 font-label text-xs tracking-widest text-text uppercase hover:text-primary"
            >
              <span aria-hidden="true" className="text-primary">
                ♪{' '}
              </span>
              Sound on?
            </button>
            <button
              type="button"
              onClick={onPromptDismiss}
              aria-label="No thanks, keep the sound off"
              className="ml-1 grid h-8 w-8 cursor-pointer place-items-center text-muted hover:text-primary"
            >
              <PixelIcon name="close" size={10} />
            </button>
          </div>
          {/* Stepped pixel pointer towards the music button */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 -right-2 h-4 w-2 -translate-y-1/2 bg-primary [clip-path:polygon(0_0,50%_0,50%_25%,100%_25%,100%_75%,50%_75%,50%_100%,0_100%)]"
          />
        </div>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        title={label}
        // Unclipped round button, so the focus ring isn't cut off by the pixel shape.
        className="group relative grid h-14 w-14 shrink-0 animate-pop cursor-pointer place-items-center rounded-full"
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
    </div>
  )
}
