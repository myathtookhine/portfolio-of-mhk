import { trackEvent } from '../analytics'
import { useLang, type Lang } from '../i18n'

const OPTIONS: { value: Lang; label: string; name: string }[] = [
  { value: 'en', label: 'EN', name: 'English' },
  { value: 'my', label: 'မြန်မာ', name: 'Myanmar' },
]

/** Two-segment EN | မြန်မာ switch. */
export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  return (
    <div role="group" aria-label="Language" className="flex">
      {OPTIONS.map((o, i) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          aria-pressed={lang === o.value}
          aria-label={o.name}
          onClick={() => {
            if (o.value !== lang) trackEvent('language_change', { language: o.value })
            setLang(o.value)
          }}
          className={`chip label cursor-pointer ${i > 0 ? '-ml-px' : ''} ${o.value === 'my' ? 'tracking-normal normal-case' : ''}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
