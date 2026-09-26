import PixelIcon from './PixelIcon'

type Props = {
  /** When set, the real image is shown instead of the placeholder. */
  src?: string
  alt: string
  /** CSS aspect ratio, e.g. "16 / 9". */
  ratio?: string
  label?: string
  className?: string
  /** Show a real image at its own aspect ratio instead of cropping it to `ratio`. */
  natural?: boolean
  loading?: 'lazy' | 'eager'
}

export default function ImagePlaceholder({
  src,
  alt,
  ratio = '16 / 9',
  label,
  className = '',
  natural,
  loading = 'lazy',
}: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        style={natural ? undefined : { aspectRatio: ratio }}
        className={`pixel-corners block h-auto w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`${alt} (image placeholder)`}
      style={{ aspectRatio: ratio }}
      className={`pixel-corners pixel-grid-bg relative flex w-full flex-col items-center justify-center gap-3 border-[3px] border-dashed border-line bg-surface-2 text-muted ${className}`}
    >
      <PixelIcon name="image" size={32} className="text-primary/70" />
      <span className="font-label text-xs tracking-widest uppercase">
        {label ?? `IMG · ${ratio.replace(/\s/g, '')}`}
      </span>
    </div>
  )
}
