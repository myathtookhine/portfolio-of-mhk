import PixelCard from '../components/PixelCard'
import SectionTitle from '../components/SectionTitle'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="02" title="About Me" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div className="space-y-6 text-base leading-8 text-text/90 md:text-lg md:leading-9">
            <p>{profile.about}</p>
            <p className="text-muted">
              I work at the intersection of design and code. I design in Figma, then prototype in React and
              Tailwind, so ideas can be tested early and handed off to developers without surprises.
            </p>
          </div>

          <PixelCard className="p-6 sm:p-8">
            <p className="font-label text-sm tracking-widest text-primary uppercase">Character stats</p>
            <dl className="mt-6 space-y-5">
              {profile.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1 border-b-2 border-dashed border-line pb-4 last:border-0 last:pb-0">
                  <dt className="font-label text-xs tracking-widest text-muted uppercase">{f.label}</dt>
                  <dd className="text-text">{f.value}</dd>
                </div>
              ))}
            </dl>
          </PixelCard>
        </div>
      </div>
    </section>
  )
}
