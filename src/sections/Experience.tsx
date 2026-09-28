import SectionTitle from '../components/SectionTitle'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="04" title="Experience" kicker="SAVE_FILES" />

        <ol className="relative ml-2 border-l-[3px] border-dashed border-line">
          {experience.map((job, i) => (
            <li key={job.role} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute top-1 -left-[10px] h-4 w-4 ${i === 0 ? 'bg-primary' : 'bg-line'} shadow-[0_0_0_3px_var(--color-bg)]`}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr] md:gap-10">
                <div>
                  <p className="font-display text-sm font-semibold text-primary">{job.period}</p>
                  <p className="mt-3 font-label text-xs tracking-wider text-muted uppercase">{job.company}</p>
                </div>
                <div>
                  <h3 className="text-xl text-text sm:text-2xl">{job.role}</h3>
                  <ul className="mt-5 space-y-3">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-text/85">
                        <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
