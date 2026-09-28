import PixelCard from '../components/PixelCard'
import PixelIcon from '../components/PixelIcon'
import SectionTitle from '../components/SectionTitle'
import Tag from '../components/Tag'
import { education, skillGroups } from '../data/skills'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Skills() {
  const { t } = useLang()
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="05" title={t(ui.sections.skills)} kicker="SKILL_TREE" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h3 className="mb-4 font-label text-sm tracking-widest text-primary uppercase">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <PixelCard className="p-6 sm:p-8">
            <h3 className="font-label text-sm tracking-widest text-primary uppercase">Education &amp; Learning</h3>
            <ul className="mt-6 space-y-6">
              {education.map((e) => (
                <li key={e.title} className="flex gap-4">
                  <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 bg-primary" />
                  <div>
                    {e.url ? (
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-medium text-text underline decoration-primary/60 decoration-2 underline-offset-4 hover:text-primary"
                      >
                        {e.title}
                        <PixelIcon name="external" size={12} className="text-primary" />
                        <span className="sr-only">(view certificate, opens in a new tab)</span>
                      </a>
                    ) : (
                      <p className="font-medium text-text">{e.title}</p>
                    )}
                    <p className="mt-1 font-label text-xs tracking-wider text-muted uppercase">
                      {e.place}
                      {e.note && <span className="text-primary"> · {e.note}</span>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </PixelCard>
        </div>
      </div>
    </section>
  )
}
