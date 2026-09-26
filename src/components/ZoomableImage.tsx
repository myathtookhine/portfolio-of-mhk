import ImagePlaceholder from './ImagePlaceholder'
import PixelIcon from './PixelIcon'

type Props = {
  src?: string
  alt: string
  onOpen: () => void
  ratio?: string
  natural?: boolean
  loading?: 'lazy' | 'eager'
  className?: string
}

/** An image that opens in the image viewer when clicked (placeholders stay static). */
export default function ZoomableImage({ onOpen, ...image }: Props) {
  if (!image.src) return <ImagePlaceholder {...image} />

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${image.alt}`}
      className="group relative block w-full cursor-zoom-in"
    >
      <ImagePlaceholder {...image} />
      <span
        aria-hidden="true"
        className="pixel-corners pointer-events-none absolute right-3 bottom-3 grid h-10 w-10 place-items-center bg-bg/85 text-primary shadow-[inset_0_0_0_2px_var(--color-line)] transition-transform duration-100 group-hover:scale-110 group-focus-visible:scale-110"
      >
        <PixelIcon name="zoomIn" size={18} />
      </span>
    </button>
  )
}
