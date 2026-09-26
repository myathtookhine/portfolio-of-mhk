import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'
import PixelIcon from './PixelIcon'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'vision', label: 'Vision' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [enabled])

  return enabled ? active : ''
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(pathname === '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'bg-bg/95 shadow-[0_3px_0_0_var(--color-line)] backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link to="/" onClick={close} className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="pixel-corners grid h-9 w-9 place-items-center bg-primary font-display text-sm font-bold text-bg">
            MHK
          </span>
          <span className="hidden font-label text-sm tracking-widest text-text uppercase group-hover:text-primary sm:inline">
            {profile.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <Link
                to={{ pathname: '/', hash: id }}
                className={`block px-3 py-2 font-label text-sm tracking-wider uppercase transition-colors hover:text-primary ${
                  active === id ? 'text-primary' : 'text-text/80'
                }`}
              >
                {active === id && <span aria-hidden="true">▸ </span>}
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center text-text hover:text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <PixelIcon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100svh-4rem)] overflow-y-auto border-t-[3px] border-line bg-bg px-4 py-8 lg:hidden">
          <ul className="flex flex-col gap-2">
            {navItems.map(({ id, label }, i) => (
              <li key={id}>
                <Link
                  to={{ pathname: '/', hash: id }}
                  onClick={close}
                  className="flex items-center gap-4 px-2 py-3 font-display text-lg font-semibold text-text hover:bg-surface hover:text-primary"
                >
                  <span className="text-primary">0{i + 1}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t-[3px] border-dashed border-line pt-6 font-label text-sm text-muted">
            <a href={`mailto:${profile.contact.email}`} className="hover:text-primary">
              {profile.contact.email}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
