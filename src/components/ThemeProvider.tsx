import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { trackEvent } from '../analytics'
import { DARK_FROM_HOUR, DARK_UNTIL_HOUR, ThemeContext, scheduledTheme, type Theme } from '../theme'

const STORAGE_KEY = 'theme'
/** Browser chrome on mobile, kept in step with the page background. */
const META_COLOR: Record<Theme, string> = { dark: '#171717', light: '#f4f1e6' }

function readSaved(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

/** Milliseconds until the next 07:00 or 18:00, whichever comes first. */
function msUntilNextSwitch(now = new Date()) {
  const next = new Date(now)
  next.setMinutes(0, 0, 0)
  const hour = now.getHours()
  if (hour < DARK_UNTIL_HOUR) {
    next.setHours(DARK_UNTIL_HOUR)
  } else if (hour < DARK_FROM_HOUR) {
    next.setHours(DARK_FROM_HOUR)
  } else {
    next.setDate(next.getDate() + 1)
    next.setHours(DARK_UNTIL_HOUR)
  }
  return next.getTime() - now.getTime()
}

/**
 * Light or dark by the time of day, until the visitor picks one: their choice is
 * remembered and the clock stops deciding. The matching <html data-theme> is set
 * in index.html before the first paint, so the page never flashes the wrong theme.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [chosen, setChosen] = useState<Theme | null>(readSaved)
  const [scheduled, setScheduled] = useState<Theme>(scheduledTheme)
  const theme = chosen ?? scheduled

  // A page left open through 07:00 or 18:00 should change with the hour. Timers
  // don't fire while a device sleeps, so a returning tab re-checks the clock.
  useEffect(() => {
    let timer: number

    const tick = () => {
      setScheduled(scheduledTheme())
      // A second past the hour, so the new hour has definitely started.
      timer = window.setTimeout(tick, msUntilNextSwitch() + 1000)
    }
    tick()

    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      window.clearTimeout(timer)
      tick()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme])
  }, [theme])

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setChosen(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the choice just won't be remembered.
    }
    trackEvent('theme_change', { theme: next })
  }, [theme])

  const value = useMemo(() => ({ theme, auto: chosen === null, toggle }), [theme, chosen, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
