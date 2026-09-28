import PixelCard from '../components/PixelCard'
import PixelIcon from '../components/PixelIcon'
import SectionTitle from '../components/SectionTitle'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function About() {
  const { t } = useLang()
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="02" title={t(ui.sections.about)} kicker="About_Me" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <div className="space-y-6 text-base leading-8 text-text/90 md:text-lg md:leading-9">
              <p>{t(profile.about)}</p>
              <p className="text-muted">{t(ui.about.codeNote)}</p>
            </div>

            {/* Life outside work */}
            <h3 className="mt-12 font-label text-sm tracking-widest text-primary uppercase">{t(ui.about.hobbies)}</h3>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {profile.hobbies.map((h) => (
                <li key={h.icon} className="bg-surface p-4 shadow-[inset_0_0_0_2px_var(--color-line)]">
                  <PixelIcon name={h.icon} size={20} className="text-primary" />
                  <p className="mt-3 font-display font-semibold text-text">{t(h.title)}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{t(h.text)}</p>
                </li>
              ))}
            </ul>
          </div>

          <PixelCard className="p-6 sm:p-8">
            <p className="font-label text-sm tracking-widest text-primary uppercase">{t(ui.about.stats)}</p>
            <dl className="mt-6 space-y-5">
              {profile.facts.map((f) => (
                <div
                  key={t(f.label)}
                  className="flex flex-col gap-1 border-b-2 border-dashed border-line pb-4 last:border-0 last:pb-0"
                >
                  <dt className="font-label text-xs tracking-widest text-muted uppercase">{t(f.label)}</dt>
                  <dd className="text-text">{t(f.value)}</dd>
                </div>
              ))}
            </dl>
          </PixelCard>
        </div>
      </div>
    </section>
  )
}
