import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { elementTop, smoothScrollTo } from '../smoothScroll'

// Scrolls to the #hash target after navigation, or to the top on a route change.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  // null on first render, so the initial load also jumps instantly.
  const prevPathname = useRef<string | null>(null)

  // Layout effect: the new page is in the DOM but not yet painted, so it
  // appears already scrolled into place.
  useLayoutEffect(() => {
    // A new page jumps instantly; section links on the same page glide there
    // with the eased scroll.
    const samePage = prevPathname.current === pathname
    prevPathname.current = pathname

    const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    const y = el ? elementTop(el) : 0
    if (samePage) smoothScrollTo(y)
    else window.scrollTo({ top: y, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return null
}
