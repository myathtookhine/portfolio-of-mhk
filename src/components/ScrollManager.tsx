import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the #hash target after navigation, or to the top on a route change.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a frame so the target section has rendered after a route change.
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, key])

  return null
}
