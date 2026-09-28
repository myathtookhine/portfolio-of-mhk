import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, type Lang, type Text } from '../i18n'

const STORAGE_KEY = 'lang'

// English by default; remembers the visitor's choice when storage is available.
function readSaved(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'my' ? 'my' : 'en'
  } catch {
    return 'en'
  }
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readSaved)

  // lang="my" switches on the Myanmar typography rules in index.css.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the choice just won't be remembered.
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: (text: Text) => (typeof text === 'string' ? text : text[lang]) }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
