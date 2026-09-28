import { createContext, useContext } from 'react'

export type Lang = 'en' | 'my'

/** Text with a Myanmar translation. Plain strings stay the same in both languages. */
export type Localized = { en: string; my: string }
export type Text = string | Localized

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Picks the current language from a Localized value; plain strings pass through. */
  t: (text: Text) => string
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (text) => (typeof text === 'string' ? text : text.en),
})

export const useLang = () => useContext(LanguageContext)
