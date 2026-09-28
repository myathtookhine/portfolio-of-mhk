import { Link } from 'react-router-dom'
import PixelCard from '../components/PixelCard'
import PixelIcon from '../components/PixelIcon'
import SectionTitle from '../components/SectionTitle'
import Tag from '../components/Tag'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Strengths() {
  const { t } = useLang()
  return (
    <section id="strengths" className="bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="03" title={t(ui.sections.strengths)} kicker="POWER_UPS" />

        <ol className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {profile.strengths.map((s, i) => (
            <li key={s.title.en}>
              <PixelCard className="flex h-full flex-col p-6 sm:p-8">
                <span className="font-display text-sm font-semibold text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-xl text-text sm:text-2xl">{t(s.title)}</h3>
                <p className="mt-3 flex-1 leading-7 text-text/80">{t(s.text)}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="mr-1 font-label text-xs tracking-widest text-muted uppercase">{t(ui.strengths.proof)}</span>
                  {s.proof.map((p) =>
                    p.to ? (
                      <Link
                        key={p.label}
                        to={p.to}
                        className="inline-flex items-center gap-1.5 bg-primary px-2.5 py-1 font-label text-xs tracking-wide text-bg uppercase hover:bg-primary-dark"
                      >
                        {p.label} <PixelIcon name="arrowRight" size={9} />
                      </Link>
                    ) : (
                      <Tag key={p.label}>{p.label}</Tag>
                    ),
                  )}
                </div>
              </PixelCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
