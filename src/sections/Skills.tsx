import { trackEvent } from '../analytics'
import Icon from '../components/Icon'
import SectionTitle from '../components/SectionTitle'
import { education, skillGroups } from '../data/skills'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Skills() {
  const { t } = useLang()
  return (
    <section id="skills" className="border-b border-line px-5 py-20 sm:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="05" title={t(ui.sections.skills)} kicker="Toolkit" />

        <div className="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Skill groups as table rows: group on the left, items on the right */}
          <dl className="border-t border-line">
            {skillGroups.map((g) => (
              <div
                key={g.title}
                data-reveal
                className="grid grid-cols-1 gap-2 border-b border-line py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="label pt-1 text-muted">{g.title}</dt>
                <dd className="leading-7 text-text">{g.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h3 className="label text-muted">Education &amp; Learning</h3>
            <ul className="mt-4 border-t border-line">
              {education.map((e) => (
                <li key={e.title} data-reveal className="border-b border-line py-4">
                  {e.url ? (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('certificate_click', { title: e.title, place: e.place })}
                      className="inline-flex items-center gap-2 text-text underline decoration-line underline-offset-4 hover:decoration-text"
                    >
                      {e.title}
                      <Icon name="external" size={12} />
                      <span className="sr-only">(view certificate, opens in a new tab)</span>
                    </a>
                  ) : (
                    <p className="text-text">{e.title}</p>
                  )}
                  <p className="label mt-2 text-muted">
                    {e.place}
                    {e.note && <span className="text-primary"> · {e.note}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
