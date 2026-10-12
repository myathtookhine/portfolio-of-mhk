import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

/** Dark in the evening and overnight, light through the day, on the visitor's own clock. */
export const DARK_FROM_HOUR = 18
export const DARK_UNTIL_HOUR = 7

export function scheduledTheme(now = new Date()): Theme {
  const hour = now.getHours()
  return hour >= DARK_FROM_HOUR || hour < DARK_UNTIL_HOUR ? 'dark' : 'light'
}

type ThemeContextValue = {
  theme: Theme
  /** True while the clock is deciding, i.e. the visitor hasn't picked a theme. */
  auto: boolean
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  auto: true,
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)
