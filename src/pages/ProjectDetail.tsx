import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { trackEvent, usePageView } from '../analytics'
import Button from '../components/Button'
import Icon from '../components/Icon'
import ImageViewer from '../components/ImageViewer'
import Tag from '../components/Tag'
import ZoomableImage from '../components/ZoomableImage'
import { caseStudies } from '../data/projects'
import { profile } from '../data/profile'
import NotFound from './NotFound'

/** Numbered section of the case study story: number on the left, content on the right. */
function Chapter({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const id = `chapter-${n}`
  return (
    <section
      data-reveal
      className="grid grid-cols-1 gap-4 border-t border-line pt-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
      aria-labelledby={id}
    >
      <p className="label pt-2 text-muted">{String(n).padStart(2, '0')}</p>
      <div>
        <h2 id={id} className="text-4xl text-text sm:text-5xl">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = caseStudies.findIndex((p) => p.slug === slug)
  // Open image in the viewer: 0 = cover, 1… = screens.
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  // null for an unknown slug: NotFound reports that view itself.
  usePageView(index === -1 ? null : `${caseStudies[index].title} — ${profile.name}`)

  if (index === -1) return <NotFound />

  const project = caseStudies[index]
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
  const next = caseStudies[(index + 1) % caseStudies.length]
  const viewerImages = [project.cover, ...project.images]

  const openViewer = (i: number) => {
    setViewerIndex(i)
    trackEvent('image_zoom', { project: project.title, image: viewerImages[i].alt })
  }

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Team', value: project.team },
    { label: 'Duration', value: project.duration },
  ]

  return (
    <article className="px-5 pt-28 pb-20 sm:px-8 lg:px-14 lg:pt-32">
      <title>{`${project.title} — ${profile.name}`}</title>

      <div className="mx-auto max-w-6xl">
        <Link
          to={{ pathname: '/', hash: 'projects' }}
          className="label inline-flex items-center gap-2 text-muted hover:text-text"
        >
          <Icon name="arrowLeft" size={14} /> All projects
        </Link>

        <header data-reveal className="mt-10">
          <p className="label text-muted">
            <span className="text-accent">Case study {String(index + 1).padStart(2, '0')}</span> · {project.category}
          </p>
          <h1 className="mt-6 text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-text">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted md:text-xl md:leading-9">{project.summary}</p>
          {project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <Button
                  key={l.href}
                  href={l.href}
                  external
                  onClick={() =>
                    trackEvent('project_link_click', { project: project.title, link: l.label, placement: 'detail' })
                  }
                >
                  {l.label} <Icon name="external" size={14} />
                </Button>
              ))}
            </div>
          )}
        </header>

        {/* Key facts at a glance, as one table row */}
        <dl data-reveal className="mt-12 grid grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {[...facts, { label: 'Platforms', value: null }].map((f) => (
            <div key={f.label} className="border-b border-line py-4">
              <dt className="label text-muted">{f.label}</dt>
              {f.value !== null ? (
                <dd className="mt-2 text-text">{f.value}</dd>
              ) : (
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.platforms.map((p) => (
                    <Tag key={p}>{p}</Tag>
                  ))}
                </dd>
              )}
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-10 border border-line bg-surface p-3 sm:p-4">
          <ZoomableImage
            src={project.cover.src}
            alt={project.cover.alt}
            natural
            loading="eager"
            onOpen={() => openViewer(0)}
          />
        </div>

        {/* The story: challenge → role → process → outcome */}
        <div className="mt-20 space-y-16 md:space-y-20">
          <Chapter n={1} title="The challenge">
            <div className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
              {project.challenge.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Chapter>

          <Chapter n={2} title="My role">
            <ul className="max-w-3xl space-y-3">
              {project.responsibilities.map((r) => (
                <li key={r} className="flex gap-4 text-lg text-muted">
                  <span aria-hidden="true" className="mt-[0.85em] h-px w-3 shrink-0 bg-muted" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter n={3} title="Process">
            <ol className="max-w-3xl border-t border-line">
              {project.process.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-line py-5">
                  <span aria-hidden="true" className="font-display text-2xl leading-none text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl text-text">{step.title}</h3>
                    <p className="mt-2 leading-7 text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Chapter>

          <Chapter n={4} title="Outcome">
            <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {project.outcome.map((o, i) => (
                <li
                  key={o}
                  className={`border-b border-line py-5 sm:border-b-0 sm:pr-6 ${i > 0 ? 'sm:border-l sm:pl-6' : ''}`}
                >
                  <span className="font-display text-2xl leading-snug text-text">{o}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Chapter>
        </div>

        <section className="mt-24" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="label flex items-center gap-4 font-label text-text">
            Screens
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </h2>
          <ul className={`mt-8 grid grid-cols-1 gap-8 ${project.galleryColumns === 1 ? '' : 'md:grid-cols-2'}`}>
            {project.images.map((img, i) => (
              <li key={img.src} data-reveal>
                <figure>
                  <div className="border border-line">
                    <ZoomableImage src={img.src} alt={img.alt} natural onOpen={() => openViewer(i + 1)} />
                  </div>
                  <figcaption className="mt-3 flex gap-4 text-sm text-muted">
                    <span className="label pt-0.5 text-text">0{i + 1}</span>
                    {img.alt}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <nav data-reveal className="mt-24 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2" aria-label="More projects">
          {prev.slug !== next.slug ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group block"
              onClick={() => trackEvent('case_study_click', { slug: prev.slug, placement: 'detail_nav' })}
            >
              <span className="label flex items-center gap-2 text-muted">
                <Icon name="arrowLeft" size={12} /> Previous
              </span>
              <span className="mt-3 block font-display text-3xl leading-tight text-text group-hover:text-accent sm:text-4xl">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          <Link
            to={`/projects/${next.slug}`}
            className="group block sm:text-right"
            onClick={() => trackEvent('case_study_click', { slug: next.slug, placement: 'detail_nav' })}
          >
            <span className="label flex items-center gap-2 text-muted sm:justify-end">
              Next <Icon name="arrowRight" size={12} />
            </span>
            <span className="mt-3 block font-display text-3xl leading-tight text-text group-hover:text-accent sm:text-4xl">
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
