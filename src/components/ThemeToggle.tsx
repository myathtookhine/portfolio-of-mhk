import { useTheme } from '../theme'
import Icon from './Icon'

/** Sun/moon switch. Shows the theme it will switch to, like a light switch. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = next === 'dark' ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className="chip w-8 cursor-pointer px-0">
      <Icon name={next === 'dark' ? 'moon' : 'sun'} size={14} />
    </button>
  )
}
