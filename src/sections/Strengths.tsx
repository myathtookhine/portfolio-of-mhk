import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import SectionTitle from '../components/SectionTitle'
import Tag from '../components/Tag'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Strengths() {
  const { t } = useLang()
  return (
    <section id="strengths" className="border-b border-line px-5 py-20 sm:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="03" title={t(ui.sections.strengths)} kicker="Approach" />

        <ol className="border-t border-line">
          {profile.strengths.map((s, i) => (
            <li
              key={s.title.en}
              data-reveal
              className="grid grid-cols-1 gap-4 border-b border-line py-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
            >
              <span className="font-display text-4xl leading-none text-primary">0{i + 1}</span>
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-10">
                <h3 className="text-3xl text-text sm:text-4xl">{t(s.title)}</h3>
                <div>
                  <p className="leading-7 text-muted">{t(s.text)}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="label mr-1 text-muted">{t(ui.strengths.proof)}</span>
                    {s.proof.map((p) =>
                      p.to ? (
                        <Link
                          key={p.label}
                          to={p.to}
                          className="label inline-flex items-center gap-1.5 border border-primary bg-primary px-2 py-1 text-on-primary transition-colors hover:border-text hover:bg-text hover:text-bg"
                        >
                          {p.label} <Icon name="arrowRight" size={11} />
                        </Link>
                      ) : (
                        <Tag key={p.label}>{p.label}</Tag>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
