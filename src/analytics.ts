import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Analytics 4.
 *
 * gtag.js is only loaded in production builds that have a measurement ID, so
 * `npm run dev` never writes to the real property; in dev every call is logged
 * to the console instead.
 *
 * Page views are sent by hand (see usePageView) because this is a single-page
 * app: gtag's own page_view fires on the first load only, so every route change
 * after it would go unrecorded.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? ''
// A real ID looks like G-ABC1234XYZ; an empty or half-filled one turns GA off.
const enabled = import.meta.env.PROD && /^G-[A-Z0-9]{6,}$/.test(MEASUREMENT_ID)

/** The events this site sends. Listed here so the names stay consistent. */
type EventName =
  | 'cv_download'
  | 'contact_click'
  | 'case_study_click'
  | 'project_modal_open'
  | 'project_link_click'
  | 'certificate_click'
  | 'image_zoom'
  | 'nav_click'
  | 'section_view'
  | 'language_change'
  | 'theme_change'
  | 'music_toggle'
  | 'sound_prompt'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loaded = false
/** URL of the previous page view: the browser referrer is only right for the first one. */
let lastPage: string | undefined

function load() {
  if (loaded) return
  loaded = true

  window.dataLayer = window.dataLayer ?? []
  // gtag.js reads the real `arguments` object, so this can't be an arrow
  // function, and an array isn't a drop-in replacement.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.append(script)
}

/** Sends one GA4 event. A no-op when analytics is off. */
export function trackEvent(name: EventName, params: EventParams = {}) {
  if (!enabled) {
    if (import.meta.env.DEV) console.info('[analytics]', name, params)
    return
  }
  load()
  window.gtag?.('event', name, params)
}

function trackPageView(title: string) {
  const page = window.location.href
  if (enabled) {
    load()
    window.gtag?.('event', 'page_view', {
      page_title: title,
      page_location: page,
      page_referrer: lastPage ?? (document.referrer || undefined),
    })
  } else if (import.meta.env.DEV) {
    console.info('[analytics] page_view', { page_title: title, page_location: page })
  }
  lastPage = page
}

/**
 * Sends a page_view for the current route, and again whenever it changes.
 *
 * `title` defaults to the document title, which is what pages that don't set
 * their own want. `null` sends nothing, for a page standing in for another one
 * that reports the view itself.
 */
export function usePageView(title?: string | null) {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (title === null) return
    trackPageView(title ?? document.title)
  }, [pathname, search, title])
}
