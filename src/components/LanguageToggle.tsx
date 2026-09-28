import { useLang, type Lang } from '../i18n'

const OPTIONS: { value: Lang; label: string; name: string }[] = [
  { value: 'en', label: 'EN', name: 'English' },
  { value: 'my', label: 'မြန်မာ', name: 'Myanmar' },
]

/** Two-segment EN | မြန်မာ switch. */
export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  return (
    <div role="group" aria-label="Language" className="flex shadow-[inset_0_0_0_2px_var(--color-line)]">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          aria-pressed={lang === o.value}
          aria-label={o.name}
          onClick={() => setLang(o.value)}
          className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            lang === o.value ? 'bg-primary text-bg' : 'text-text/80 hover:text-primary'
          } ${o.value === 'en' ? 'font-label tracking-wider' : 'font-display'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
