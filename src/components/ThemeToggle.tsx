import { useTheme } from '../theme'
import PixelIcon from './PixelIcon'

/** Sun/moon switch. Shows the theme it will switch to, like a light switch. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = next === 'dark' ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid cursor-pointer place-items-center px-2.5 py-2 text-text/80 shadow-[inset_0_0_0_2px_var(--color-line)] transition-colors hover:text-primary"
    >
      <PixelIcon name={next === 'dark' ? 'moon' : 'sun'} size={14} />
    </button>
  )
}
