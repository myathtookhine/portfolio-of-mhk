import { trackEvent } from '../analytics'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const { contact } = profile

const channels: { label: string; value: string; href: string; external?: boolean }[] = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Mobile', value: contact.phone, href: contact.phoneHref },
  { label: 'LinkedIn', value: contact.linkedin, href: contact.linkedinHref, external: true },
  { label: 'GitHub', value: contact.github, href: contact.githubHref, external: true },
]

export default function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 md:py-28 lg:px-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p data-reveal className="label flex gap-4 text-muted">
            <span className="text-text">06</span>Contact
          </p>
          {/* The statement is the heading, set large like the hero. */}
          <h2 data-reveal className="mt-6 text-[clamp(3rem,7vw,5.75rem)] leading-[0.95] tracking-[-0.025em] text-text">
            {t(ui.sections.contact)}
            <span className="text-accent">.</span>
          </h2>
          <p data-reveal className="mt-8 max-w-md text-lg leading-8 text-muted">{t(ui.contact.intro)}</p>
          <p className="mt-5 flex max-w-md gap-3 text-sm leading-7 text-muted">
            <Icon name="pin" size={16} className="mt-1 text-text" />
            <span>{t(profile.location.contactLine)}</span>
          </p>
        </div>

        <div className="flex flex-col justify-end">
          <ul className="border-t border-line">
            {channels.map((c) => (
              <li key={c.label} data-reveal>
                <a
                  href={c.href}
                  // Phones: label above the value, so the full address fits. Wider: label | value | arrow.
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 border-b border-line py-5 transition-colors hover:border-text sm:grid-cols-[90px_minmax(0,1fr)_auto] sm:gap-4"
                  onClick={() => trackEvent('contact_click', { channel: c.label.toLowerCase(), placement: 'card' })}
                  {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <span className="label col-start-1 text-muted">{c.label}</span>
                  <span className="col-start-1 text-text [overflow-wrap:anywhere] sm:col-start-2 sm:truncate">
                    {c.value}
                  </span>
                  <Icon
                    name={c.external ? 'arrowUpRight' : 'arrowRight'}
                    size={16}
                    className="col-start-2 row-span-2 row-start-1 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-text sm:col-start-3 sm:row-span-1"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              href={`mailto:${contact.email}`}
              onClick={() => trackEvent('contact_click', { channel: 'email', placement: 'contact_cta' })}
            >
              {t(ui.contact.sayHello)} <Icon name="mail" size={14} />
            </Button>
            <Button
              href={profile.cvUrl}
              variant="outline"
              download
              onClick={() => trackEvent('cv_download', { placement: 'contact' })}
            >
              {t(ui.hero.downloadCv)} <Icon name="download" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
