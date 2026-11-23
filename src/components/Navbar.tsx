import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { trackEvent } from '../analytics'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'
import AvailabilityBadge from './AvailabilityBadge'
import Icon from './Icon'
import LanguageToggle from './LanguageToggle'
import ScrambleText from './ScrambleText'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { id: 'projects', label: ui.nav.projects },
  { id: 'about', label: ui.nav.about },
  { id: 'strengths', label: ui.nav.strengths },
  { id: 'experience', label: ui.nav.experience },
  { id: 'skills', label: ui.nav.skills },
  { id: 'contact', label: ui.nav.contact },
]

/**
 * The section under the middle of the screen, and how far through it the reader
 * is (0–1), for the index's progress line. Home page only.
 */
function useActiveSection(enabled: boolean) {
  const [state, setState] = useState({ active: '', progress: 0 })

  useEffect(() => {
    if (!enabled) return
    // One section_view per section per visit, so a long read isn't counted twice.
    const seen = new Set<string>()
    let frame = 0

    const measure = () => {
      frame = 0
      const mid = window.innerHeight * 0.5
      let active = ''
      let progress = 0
      for (const { id } of navItems) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, height } = el.getBoundingClientRect()
        if (top <= mid && top + height > mid) {
          active = id
          progress = Math.min(1, Math.max(0, (mid - top) / height))
        }
      }
      // The page bottom can't scroll the last section past the middle: finish it.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        active = navItems[navItems.length - 1].id
        progress = 1
      }
      if (active && !seen.has(active)) {
        seen.add(active)
        trackEvent('section_view', { section: active })
      }
      setState((s) => (s.active === active && Math.abs(s.progress - progress) < 0.005 ? s : { active, progress }))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])

  return enabled ? state : { active: '', progress: 0 }
}

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="block" aria-label={`${profile.name}, home`}>
      <ScrambleText
        text="MHK"
        className="block font-label text-[22px] leading-none font-semibold text-text hover:text-primary"
      />
    </Link>
  )
}

function Index({ active, progress, onNavigate, placement }: {
  active: string
  progress: number
  onNavigate?: () => void
  placement: 'desktop' | 'mobile'
}) {
  const { t } = useLang()
  return (
    <ul className="border-t border-line">
      {navItems.map(({ id, label }, i) => {
        const current = active === id
        return (
          <li key={id} className="relative border-b border-line">
            <Link
              to={{ pathname: '/', hash: id }}
              aria-current={current ? 'location' : undefined}
              onClick={() => {
                trackEvent('nav_click', { section: id, placement })
                onNavigate?.()
              }}
              className={`label flex items-baseline gap-5 py-3 transition-colors hover:text-text ${
                current || !active ? 'text-text' : 'text-muted'
              } ${placement === 'mobile' ? 'py-4 text-[13px]' : ''}`}
            >
              <span className="w-5 shrink-0 text-muted">{String(i + 1).padStart(2, '0')}</span>
              {t(label)}
            </Link>
            {current && (
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 h-px bg-text"
                style={{ width: `${Math.max(4, progress * 100)}%` }}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function Navbar() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const { active, progress } = useActiveSection(pathname === '/')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {/* Desktop: the index stays put on the left while the work scrolls on the right. */}
      <aside className="hidden border-r border-line lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:px-7 lg:py-7">
        <Wordmark />
        <nav aria-label="Main" className="mt-14">
          <Index active={active} progress={progress} placement="desktop" />
        </nav>

        <div className="mt-auto space-y-4">
          <AvailabilityBadge />
          <a
            href={`mailto:${profile.contact.email}`}
            onClick={() => trackEvent('contact_click', { channel: 'email', placement: 'sidebar' })}
            className="block text-sm break-all text-muted underline decoration-line underline-offset-4 hover:text-text hover:decoration-text"
          >
            {profile.contact.email}
          </a>
        </div>
      </aside>

      {/* Desktop: theme and language chips, top right. */}
      <div className="fixed top-6 right-8 z-40 hidden items-center gap-2 lg:flex">
        <a
          href={profile.cvUrl}
          download
          onClick={() => trackEvent('cv_download', { placement: 'nav' })}
          className="chip label"
        >
          CV <Icon name="download" size={12} />
        </a>
        <ThemeToggle />
        <LanguageToggle />
      </div>

      {/* Phones and tablets: a slim top bar with a full-screen index. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg lg:hidden">
        <div className="flex h-16 items-center justify-between gap-3 px-5 sm:px-8">
          <Wordmark onClick={close} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              type="button"
              className="chip w-8 cursor-pointer px-0"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} size={14} />
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="flex h-[calc(100svh-4rem)] flex-col overflow-y-auto bg-bg px-5 pt-8 pb-10 sm:px-8"
          >
            <Index active={active} progress={progress} onNavigate={close} placement="mobile" />
            <a
              href={`mailto:${profile.contact.email}`}
              className="mt-auto pt-10 text-sm break-all text-muted hover:text-text"
              onClick={() => trackEvent('contact_click', { channel: 'email', placement: 'nav' })}
            >
              {profile.contact.email}
            </a>
          </nav>
        )}
      </header>

      {/* Floating call to action, bottom right; steps aside once the contact section is on screen. */}
      {active !== 'contact' && !open && (
        <Link
          to={{ pathname: '/', hash: 'contact' }}
          onClick={() => trackEvent('nav_click', { section: 'contact', placement: 'floating_cta' })}
          className="group fixed right-4 bottom-4 z-40 flex animate-pop items-center gap-6 bg-primary px-4 py-3 text-on-primary transition-colors hover:bg-text hover:text-bg sm:right-6 sm:bottom-6 sm:h-24 sm:w-64 sm:flex-col sm:items-stretch sm:justify-between sm:p-4"
        >
          <Icon
            name="arrowUpRight"
            size={18}
            className="order-last transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:order-first sm:self-end"
          />
          <span className="text-sm font-medium">{t(ui.sections.contact)}</span>
        </Link>
      )}
    </>
  )
}
