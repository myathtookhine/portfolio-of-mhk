import ImagePlaceholder from './ImagePlaceholder'
import Icon from './Icon'

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
        className="pointer-events-none absolute right-3 bottom-3 grid h-9 w-9 place-items-center border border-line bg-bg/90 text-text transition-colors group-hover:border-text group-focus-visible:border-text"
      >
        <Icon name="zoomIn" size={16} />
      </span>
    </button>
  )
}
