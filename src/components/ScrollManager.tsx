import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the #hash target after navigation, or to the top on a route change.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  // null on first render, so the initial load also jumps instantly.
  const prevPathname = useRef<string | null>(null)

  // Layout effect: the new page is in the DOM but not yet painted, so it
  // appears already scrolled into place.
  useLayoutEffect(() => {
    // A new page jumps instantly; the page-wide smooth scrolling would otherwise
    // animate from the previous scroll position. Section links on the same page
    // keep the smooth scroll.
    const samePage = prevPathname.current === pathname
    prevPathname.current = pathname
    const behavior: ScrollBehavior = samePage ? 'smooth' : 'instant'

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      document.getElementById(id)?.scrollIntoView({ behavior })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior })
    }
  }, [pathname, hash, key])

  return null
}
