type Props = {
  index: string
  title: string
  kicker?: string
}

export default function SectionTitle({ index, title, kicker }: Props) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-label text-sm tracking-widest text-primary uppercase">
        &gt; {index}. {kicker ?? title.replace(/\s+/g, '_')}
      </p>
      <h2 className="text-section mt-3 text-text">{title}</h2>
      <div className="mt-5 flex gap-1" aria-hidden="true">
        <span className="h-2 w-16 bg-primary" />
        <span className="h-2 w-2 bg-primary" />
        <span className="h-2 w-2 bg-primary/50" />
        <span className="h-2 w-2 bg-primary/25" />
      </div>
    </div>
  )
}
