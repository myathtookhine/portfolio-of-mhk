import { Link, useParams } from 'react-router-dom'
import ImagePlaceholder from '../components/ImagePlaceholder'
import PixelButton from '../components/PixelButton'
import PixelCard from '../components/PixelCard'
import PixelIcon from '../components/PixelIcon'
import Tag from '../components/Tag'
import { caseStudies } from '../data/projects'
import { profile } from '../data/profile'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = caseStudies.findIndex((p) => p.slug === slug)

  if (index === -1) return <NotFound />

  const project = caseStudies[index]
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
  const next = caseStudies[(index + 1) % caseStudies.length]

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
          <h1 className="mt-4 text-[clamp(1.25rem,4vw,2.5rem)] leading-snug text-text">{project.title}</h1>
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

        <div className="mt-12">
          <ImagePlaceholder src={project.cover.src} alt={project.cover.alt} natural loading="eager" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <h2 className="font-label text-lg tracking-widest text-text uppercase">
              <span className="text-primary">■</span> Overview
            </h2>
            <div className="mt-6 space-y-5 leading-8 text-text/85 md:text-base">
              {project.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>

            <h2 className="mt-14 font-label text-lg tracking-widest text-text uppercase">
              <span className="text-primary">■</span> Highlights
            </h2>
            <ul className="mt-6 space-y-4">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-4 text-text/85">
                  <PixelIcon name="star" size={14} className="mt-1 text-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <PixelCard className="space-y-6 p-6">
              <div>
                <p className="font-label text-xs tracking-widest text-muted uppercase">Role</p>
                <p className="mt-1 text-text">{project.role}</p>
              </div>
              {project.year && (
                <div>
                  <p className="font-label text-xs tracking-widest text-muted uppercase">Timeline</p>
                  <p className="mt-1 text-text">{project.year}</p>
                </div>
              )}
              <div>
                <p className="font-label text-xs tracking-widest text-muted uppercase">Platforms</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.platforms.map((p) => (
                    <Tag key={p} tone="primary">
                      {p}
                    </Tag>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-label text-xs tracking-widest text-muted uppercase">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </PixelCard>
          </aside>
        </div>

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
                  <ImagePlaceholder src={img.src} alt={img.alt} natural />
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
              <span className="mt-3 block font-pixel text-xs leading-relaxed text-text group-hover:text-primary sm:text-sm">
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
            <span className="mt-3 block font-pixel text-xs leading-relaxed text-text group-hover:text-primary sm:text-sm">
              {next.title}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  )
}
