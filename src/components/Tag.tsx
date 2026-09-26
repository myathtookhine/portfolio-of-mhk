type Props = { children: string; tone?: 'default' | 'primary' }

export default function Tag({ children, tone = 'default' }: Props) {
  return (
    <span
      className={`inline-block px-2.5 py-1 font-label text-xs tracking-wide uppercase ${
        tone === 'primary'
          ? 'bg-primary text-bg'
          : 'text-text shadow-[inset_0_0_0_2px_var(--color-line)]'
      }`}
    >
      {children}
    </span>
  )
}
