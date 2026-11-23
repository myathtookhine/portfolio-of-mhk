type Props = {
  index: string
  title: string
  /** Short English label beside the number, e.g. "Work". */
  kicker: string
}

/** Numbered section heading: a small index label, then a large serif title. */
export default function SectionTitle({ index, title, kicker }: Props) {
  return (
    <div data-reveal className="mb-12 grid grid-cols-1 gap-5 md:mb-16 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10">
      <p className="label flex gap-4 pt-2 text-muted">
        <span className="text-text">{index}</span>
        {kicker}
      </p>
      <h2 className="text-section text-text">{title}</h2>
    </div>
  )
}
