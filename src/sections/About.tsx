import Icon from '../components/Icon'
import SectionTitle from '../components/SectionTitle'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function About() {
  const { t } = useLang()
  return (
    <section id="about" className="border-b border-line px-5 py-20 sm:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="02" title={t(ui.sections.about)} kicker="Profile" />
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10">
          <span aria-hidden="true" className="hidden md:block" />
          <div className="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <div data-reveal className="space-y-6 text-lg leading-8 text-text md:text-xl md:leading-9">
                <p>{t(profile.about)}</p>
                <p className="text-muted">{t(ui.about.codeNote)}</p>
              </div>

              {/* Life outside work */}
              <h3 className="label mt-14 text-muted">{t(ui.about.hobbies)}</h3>
              <ul className="mt-4 border-t border-line">
                {profile.hobbies.map((h) => (
                  <li key={h.icon} data-reveal className="flex gap-5 border-b border-line py-4">
                    <Icon name={h.icon} size={18} className="mt-1 text-text" />
                    <p>
                      <span className="text-text">{t(h.title)}</span>
                      <span className="text-muted"> — {t(h.text)}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* At a glance, as a two-column data table */}
            <div>
              <h3 className="label text-muted">{t(ui.about.stats)}</h3>
              <dl className="mt-4 border-t border-line">
                {profile.facts.map((f) => (
                  <div key={t(f.label)} data-reveal className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b border-line py-3.5">
                    <dt className="label pt-1 text-muted">{t(f.label)}</dt>
                    <dd className="text-sm text-text">{t(f.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
