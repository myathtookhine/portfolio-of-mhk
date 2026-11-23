type Props = { children: string; tone?: 'default' | 'primary' }

export default function Tag({ children, tone = 'default' }: Props) {
  return (
    <span
      className={`label inline-block border px-2 py-1 ${
        tone === 'primary' ? 'border-primary bg-primary text-on-primary' : 'border-line text-muted'
      }`}
    >
      {children}
    </span>
  )
}
