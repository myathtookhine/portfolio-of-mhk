import Icon from './Icon'

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
        className={`block h-auto w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`${alt} (image placeholder)`}
      style={{ aspectRatio: ratio }}
      className={`relative flex w-full flex-col items-center justify-center gap-3 border border-dashed border-line bg-surface text-muted ${className}`}
    >
      <Icon name="image" size={28} />
      <span className="label">{label ?? `IMG · ${ratio.replace(/\s/g, '')}`}</span>
    </div>
  )
}
