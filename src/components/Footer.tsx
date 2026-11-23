import { trackEvent } from '../analytics'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <div className="label flex flex-col gap-4 px-5 py-8 text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Designed &amp; built with React + Tailwind</p>
        <div className="flex items-center gap-6">
          <a
            href={profile.contact.linkedinHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('contact_click', { channel: 'linkedin', placement: 'footer' })}
            className="hover:text-text"
          >
            LinkedIn
          </a>
          <a href="#top" className="hover:text-text">
            {t(ui.backToTop)} ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
