import PixelCard from '../components/PixelCard'
import SectionTitle from '../components/SectionTitle'
import { profile } from '../data/profile'

export default function Vision() {
  return (
    <section id="vision" className="bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="02" title="Vision & Mission" kicker="QUEST_LOG" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {profile.vision.map((v, i) => (
            <div key={i} className="flex gap-5">
              <span className="font-pixel text-2xl text-primary sm:text-3xl">0{i + 1}.</span>
              <p className="text-text/90 md:text-base">{v}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-20 mb-8 font-label text-lg tracking-widest text-text uppercase">
          <span className="text-primary">■</span> My mission
        </h3>
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {profile.mission.map((m, i) => (
            <li key={m.title}>
              <PixelCard className="flex flex-col p-6">
                <span className="font-pixel text-xs text-primary">Mission 0{i + 1}</span>
                <h4 className="mt-4 font-label text-base tracking-wide text-text uppercase">{m.title}</h4>
                <p className="mt-3 text-sm leading-7 text-muted">{m.text}</p>
              </PixelCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
