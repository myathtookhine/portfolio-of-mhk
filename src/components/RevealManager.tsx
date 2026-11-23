import { useEffect } from 'react'

/** Delay between elements that come into view together, so they cascade. */
const STAGGER_MS = 90

/**
 * Reveal on scroll: every [data-reveal] element fades and rises into place the
 * first time it scrolls into view. index.html arms it (html.reveal-ready) before
 * the first paint; the styles live in index.css. New elements (route changes,
 * opened sections) are picked up automatically.
 */
export default function RevealManager() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('reveal-ready')) return

    const observer = new IntersectionObserver(
      (entries) => {
        const shown = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        shown.forEach((entry, i) => {
          const el = entry.target as HTMLElement
          el.style.setProperty('--reveal-delay', `${i * STAGGER_MS}ms`)
          el.classList.add('is-revealed')
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    const observeNew = () =>
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => observer.observe(el))
    observeNew()

    const mutations = new MutationObserver(observeNew)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}
