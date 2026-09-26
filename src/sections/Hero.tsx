import { useEffect, useState } from 'react'
import ImagePlaceholder from '../components/ImagePlaceholder'
import PixelButton from '../components/PixelButton'
import PixelIcon from '../components/PixelIcon'
import { profile } from '../data/profile'

function useTyped(text: string, speed = 70) {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [count, setCount] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed, reduced])

  return text.slice(0, count)
}

export default function Hero() {
  const typed = useTyped(profile.title)

  return (
    <section className="pixel-grid-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 md:grid-cols-[1.25fr_1fr] md:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 bg-surface px-3 py-1.5 font-label text-xs tracking-widest text-primary uppercase shadow-[inset_0_0_0_2px_var(--color-line)]">
            <span className="h-2 w-2 animate-blink bg-primary" aria-hidden="true" />
            Available for new projects
          </p>

          <h1 id="hero-title" className="text-display mt-7 text-text">
            {profile.firstName}
            <br />
            <span className="text-primary">{profile.lastName}</span>
          </h1>

          <p className="mt-6 min-h-[1.5em] font-display text-xl leading-snug font-semibold text-text sm:text-2xl">
            <span className="sr-only">{profile.title}</span>
            <span aria-hidden="true">
              &gt; {typed}
              <span className="animate-blink text-primary">▮</span>
            </span>
          </p>

          <p className="mt-6 max-w-xl text-muted">
            {profile.subtitle} with 9+ years of turning complex business requirements into intuitive web and
            mobile products.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <PixelButton href="#projects">
              Explore now <PixelIcon name="arrowDown" size={12} />
            </PixelButton>
            <PixelButton href={profile.cvUrl} variant="outline" download>
              Download CV <PixelIcon name="download" size={12} />
            </PixelButton>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-3">
            {profile.stats.map((s) => (
              <div key={s.label} className="bg-surface p-3 shadow-[inset_0_0_0_2px_var(--color-line)] sm:p-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.value}</dd>
                <dd className="mt-2 font-label text-xs leading-snug tracking-wide text-muted uppercase sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div aria-hidden="true" className="pixel-corners absolute inset-0 translate-x-3 translate-y-3 bg-primary" />
          <div className="pixel-corners relative bg-surface p-3 shadow-[inset_0_0_0_3px_var(--color-line)]">
            <div className="mb-3 flex items-center justify-between px-1 font-label text-xs tracking-widest text-muted uppercase">
              <span>player_01.png</span>
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 bg-primary" />
                <span className="h-2.5 w-2.5 bg-line" />
                <span className="h-2.5 w-2.5 bg-line" />
              </span>
            </div>
            <ImagePlaceholder
              src={profile.portrait}
              alt={`Pixel-art portrait of ${profile.name}`}
              ratio="4 / 5"
              loading="eager"
              className="pixel-grid-bg bg-surface-2"
            />
            <div className="mt-3 flex items-center justify-between px-1 font-label text-xs tracking-widest uppercase">
              <span className="text-text">LVL 9+ Designer</span>
              <span className="text-primary">HP ■■■■■</span>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="absolute -top-5 -left-5 hidden animate-float font-display text-2xl text-primary md:block"
          >
            ✦
          </span>
        </div>
      </div>
    </section>
  )
}
