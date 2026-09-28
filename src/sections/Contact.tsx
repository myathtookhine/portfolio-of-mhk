import PixelButton from '../components/PixelButton'
import PixelCard from '../components/PixelCard'
import PixelIcon, { type IconName } from '../components/PixelIcon'
import SectionTitle from '../components/SectionTitle'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const { contact } = profile

const channels: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
  { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: 'phone', label: 'Mobile', value: contact.phone, href: contact.phoneHref },
  { icon: 'linkedin', label: 'LinkedIn', value: contact.linkedin, href: contact.linkedinHref, external: true },
  { icon: 'github', label: 'GitHub', value: contact.github, href: contact.githubHref, external: true },
]

export default function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="pixel-grid-bg bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="06" title={t(ui.sections.contact)} kicker="CONTACT" />

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <p className="max-w-md text-base leading-8 text-text/90 md:text-lg md:leading-9">
              {t(ui.contact.intro)}
            </p>
            <p className="mt-5 flex max-w-md gap-3 text-sm leading-7 text-muted md:text-base">
              <PixelIcon name="pin" size={14} className="mt-1.5 text-primary" />
              <span>{t(profile.location.contactLine)}</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <PixelButton href={`mailto:${contact.email}`}>
                {t(ui.contact.sayHello)} <PixelIcon name="mail" size={12} />
              </PixelButton>
              <PixelButton href={profile.cvUrl} variant="outline" download>
                {t(ui.hero.downloadCv)} <PixelIcon name="download" size={12} />
              </PixelButton>
            </div>
          </div>

          <ul className="space-y-6">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="block"
                  {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <PixelCard interactive className="flex items-center gap-5 p-5">
                    <span className="pixel-corners grid h-12 w-12 shrink-0 place-items-center bg-primary text-bg">
                      <PixelIcon name={c.icon} size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-label text-xs tracking-widest text-muted uppercase">{c.label}</span>
                      <span className="mt-1 block truncate text-text group-hover/card:text-primary sm:text-base">
                        {c.value}
                      </span>
                    </span>
                    <PixelIcon name={c.external ? 'external' : 'arrowRight'} size={14} className="text-primary" />
                  </PixelCard>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
