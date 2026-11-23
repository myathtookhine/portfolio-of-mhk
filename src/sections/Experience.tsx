import SectionTitle from '../components/SectionTitle'
import { experience } from '../data/experience'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Experience() {
  const { t } = useLang()
  return (
    <section id="experience" className="border-b border-line px-5 py-20 sm:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="04" title={t(ui.sections.experience)} kicker="Career" />

        <ol className="border-t border-line">
          {experience.map((job, i) => (
            <li
              key={job.role}
              data-reveal
              className="grid grid-cols-1 gap-4 border-b border-line py-9 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
            >
              <div>
                <p className={`label ${i === 0 ? 'text-accent' : 'text-text'}`}>{job.period}</p>
                <p className="label mt-2 text-muted">{job.company}</p>
              </div>
              <div>
                <h3 className="text-3xl text-text sm:text-4xl">{job.role}</h3>
                <ul className="mt-5 space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-4 text-muted">
                      <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-muted" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
