import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { elementTop, smoothScrollTo } from '../smoothScroll'

/**
 * Scrolls to the #hash target after navigation, or to the top on a route change.
 *
 * A link opened from outside (e.g. …/#experience) lands before the web fonts
 * and images have loaded; when they arrive, the text above grows and pushes
 * the section down. So after a fresh page load the target is aligned again
 * once fonts and images are in, unless the visitor has started scrolling.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  // null on first render, so the initial load also jumps instantly.
  const prevPathname = useRef<string | null>(null)

  useLayoutEffect(() => {
    // Section links on the same page glide there; a new page jumps instantly.
    const samePage = prevPathname.current === pathname
    prevPathname.current = pathname

    const id = hash ? decodeURIComponent(hash.slice(1)) : ''
    const target = () => (id ? document.getElementById(id) : null)
    const el = target()
    const y = el ? elementTop(el) : 0

    if (samePage) {
      smoothScrollTo(y)
      return
    }
    window.scrollTo({ top: y, left: 0, behavior: 'instant' })
    if (!el) return

    // Re-align after late layout shifts, but never fight the visitor.
    let cancelled = false
    let expected = window.scrollY
    const stop = () => {
      cancelled = true
    }
    const realign = () => {
      const current = target()
      if (cancelled || !current || Math.abs(window.scrollY - expected) > 2) return
      window.scrollTo({ top: elementTop(current), left: 0, behavior: 'instant' })
      expected = window.scrollY
    }
    const onLoad = () => requestAnimationFrame(realign)

    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)
    document.fonts.ready.then(onLoad)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    // Lazy images below the fold settle a little later: one last check.
    const late = window.setTimeout(realign, 1200)

    return () => {
      stop()
      window.clearTimeout(late)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
      window.removeEventListener('load', onLoad)
    }
  }, [pathname, hash, key])

  return null
}
