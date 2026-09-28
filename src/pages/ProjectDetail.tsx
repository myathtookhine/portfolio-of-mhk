import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImageViewer from '../components/ImageViewer'
import PixelButton from '../components/PixelButton'
import PixelCard from '../components/PixelCard'
import PixelIcon from '../components/PixelIcon'
import Tag from '../components/Tag'
import ZoomableImage from '../components/ZoomableImage'
import { caseStudies } from '../data/projects'
import { profile } from '../data/profile'
import NotFound from './NotFound'

/** Numbered section of the case study story. */
function Chapter({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const id = `chapter-${n}`
  return (
    <section className="mt-16 md:mt-20" aria-labelledby={id}>
      <p className="font-label text-sm tracking-widest text-primary uppercase">&gt; {String(n).padStart(2, '0')}</p>
      <h2 id={id} className="mt-2 text-2xl text-text sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = caseStudies.findIndex((p) => p.slug === slug)
  // Open image in the viewer: 0 = cover, 1… = screens.
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  if (index === -1) return <NotFound />

  const project = caseStudies[index]
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
  const next = caseStudies[(index + 1) % caseStudies.length]
  const viewerImages = [project.cover, ...project.images]

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Team', value: project.team },
    { label: 'Duration', value: project.duration },
  ]

  return (
    <article className="pt-24 pb-20 md:pt-32">
      <title>{`${project.title} — ${profile.name}`}</title>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          to={{ pathname: '/', hash: 'projects' }}
          className="inline-flex items-center gap-2 font-label text-sm tracking-widest text-muted uppercase hover:text-primary"
        >
          <PixelIcon name="arrowLeft" size={12} /> All projects
        </Link>

        <header className="mt-8">
          <p className="font-label text-sm tracking-widest text-primary uppercase">
            &gt; Level {String(index + 1).padStart(2, '0')} · {project.category}
          </p>
          <h1 className="mt-4 text-[clamp(2.1rem,5.5vw,3.5rem)] leading-tight text-text">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-text/85 md:text-lg">{project.summary}</p>
          {project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-5">
              {project.links.map((l) => (
                <PixelButton key={l.href} href={l.href} external>
                  {l.label} <PixelIcon name="external" size={12} />
                </PixelButton>
              ))}
            </div>
          )}
        </header>

        {/* Key facts at a glance */}
        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface p-4 shadow-[inset_0_0_0_2px_var(--color-line)]">
              <dt className="font-label text-xs tracking-widest text-muted uppercase">{f.label}</dt>
              <dd className="mt-1.5 text-text">{f.value}</dd>
            </div>
          ))}
          <div className="bg-surface p-4 shadow-[inset_0_0_0_2px_var(--color-line)]">
            <dt className="font-label text-xs tracking-widest text-muted uppercase">Platforms</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.platforms.map((p) => (
                <Tag key={p} tone="primary">
                  {p}
                </Tag>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-10">
          <ZoomableImage
            src={project.cover.src}
            alt={project.cover.alt}
            natural
            loading="eager"
            onOpen={() => setViewerIndex(0)}
          />
        </div>

        {/* The story: challenge → role → process → outcome */}
        <div className="max-w-4xl">
          <Chapter n={1} title="The challenge">
            <div className="space-y-5 text-base leading-8 text-text/85 md:text-lg md:leading-9">
              {project.challenge.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Chapter>

          <Chapter n={2} title="My role">
            <ul className="space-y-4">
              {project.responsibilities.map((r) => (
                <li key={r} className="flex gap-4 text-text/85 md:text-lg">
                  <span aria-hidden="true" className="mt-[0.65em] h-2 w-2 shrink-0 bg-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter n={3} title="Process">
            <ol className="relative ml-2 border-l-[3px] border-dashed border-line">
              {project.process.map((step, i) => (
                <li key={step.title} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 -left-3.5 grid h-6 w-6 place-items-center bg-primary font-display text-xs font-bold text-bg shadow-[0_0_0_3px_var(--color-bg)]"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-lg text-text sm:text-xl">{step.title}</h3>
                  <p className="mt-2 leading-7 text-text/80">{step.text}</p>
                </li>
              ))}
            </ol>
          </Chapter>
        </div>

        <Chapter n={4} title="Outcome">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {project.outcome.map((o) => (
              <li key={o}>
                <PixelCard className="flex h-full items-start gap-4 p-5">
                  <PixelIcon name="star" size={18} className="mt-0.5 text-primary" />
                  <span className="font-display text-lg leading-snug font-semibold text-text">{o}</span>
                </PixelCard>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Chapter>

        <section className="mt-20" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="font-label text-lg tracking-widest text-text uppercase">
            <span className="text-primary">■</span> Screens
          </h2>
          <ul
            className={`mt-8 grid grid-cols-1 gap-8 ${project.galleryColumns === 1 ? '' : 'md:grid-cols-2'}`}
          >
            {project.images.map((img, i) => (
              <li key={img.src}>
                <figure>
                  <ZoomableImage src={img.src} alt={img.alt} natural onOpen={() => setViewerIndex(i + 1)} />
                  <figcaption className="mt-3 flex gap-3 text-sm text-muted">
                    <span className="font-label tracking-widest text-primary">0{i + 1}</span>
                    {img.alt}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <nav
          className="mt-24 grid grid-cols-1 gap-6 border-t-[3px] border-dashed border-line pt-10 sm:grid-cols-2"
          aria-label="More projects"
        >
          {prev.slug !== next.slug ? (
            <Link to={`/projects/${prev.slug}`} className="group block">
              <span className="flex items-center gap-2 font-label text-xs tracking-widest text-muted uppercase">
                <PixelIcon name="arrowLeft" size={10} /> Previous level
              </span>
              <span className="mt-3 block font-display text-xl leading-snug font-semibold text-text group-hover:text-primary sm:text-2xl">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          <Link to={`/projects/${next.slug}`} className="group block sm:text-right">
            <span className="flex items-center gap-2 font-label text-xs tracking-widest text-muted uppercase sm:justify-end">
              Next level <PixelIcon name="arrowRight" size={10} />
            </span>
            <span className="mt-3 block font-display text-xl leading-snug font-semibold text-text group-hover:text-primary sm:text-2xl">
              {next.title}
            </span>
          </Link>
        </nav>
      </div>

      <ImageViewer
        images={viewerImages}
        index={viewerIndex}
        onIndexChange={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </article>
  )
}
