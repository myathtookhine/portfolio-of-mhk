import { profile } from '../data/profile'
import PixelIcon from './PixelIcon'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t-[3px] border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center font-label text-xs tracking-widest text-muted uppercase sm:flex-row sm:px-6 sm:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Designed &amp; built with <span className="text-primary">■</span> React + Tailwind
        </p>
        <div className="flex items-center gap-6">
          <a
            href={profile.contact.linkedinHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-primary"
          >
            <PixelIcon name="linkedin" size={12} /> LinkedIn
          </a>
          <a href="#top" className="hover:text-primary">
            ▲ {t(ui.backToTop)}
          </a>
        </div>
      </div>
    </footer>
  )
}
