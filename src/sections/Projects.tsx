import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../components/ImagePlaceholder'
import PixelCard from '../components/PixelCard'
import PixelIcon from '../components/PixelIcon'
import ProjectModal from '../components/ProjectModal'
import SectionTitle from '../components/SectionTitle'
import Tag from '../components/Tag'
import { caseStudies, otherProjects, type CaseStudy, type OtherProject } from '../data/projects'

function FeaturedCard({ project, index }: { project: CaseStudy; index: number }) {
  return (
    <Link to={`/projects/${project.slug}`} className="block h-full" aria-label={`${project.title} case study`}>
      <PixelCard interactive className="flex flex-col p-4 sm:p-5">
        <ImagePlaceholder src={project.cover.src} alt={project.cover.alt} ratio="16 / 10" />
        <div className="flex flex-1 flex-col px-1 pt-6 pb-2">
          <div className="flex items-center justify-between gap-3">
            <Tag tone="primary">{`★ Featured 0${index + 1}`}</Tag>
            <span className="font-label text-xs tracking-wider text-muted uppercase">{project.category}</span>
          </div>
          <h3 className="mt-5 text-base text-text group-hover/card:text-primary sm:text-lg">{project.title}</h3>
          <p className="mt-4 flex-1 text-text/80">{project.summary}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.platforms.map((p) => (
                <Tag key={p}>{p}</Tag>
              ))}
            </div>
            <span className="flex items-center gap-2 font-pixel text-[10px] text-primary">
              View <PixelIcon name="arrowRight" size={12} />
            </span>
          </div>
        </div>
      </PixelCard>
    </Link>
  )
}

function ProjectCard({ project, onOpen }: { project: OtherProject; onOpen: () => void }) {
  return (
    <PixelCard
      interactive
      shadow={false}
      className="flex flex-col p-4 group-hover/card:shadow-[inset_0_0_0_3px_var(--color-primary)]"
    >
      {/* Wide dashboard screenshots: crop from the top-left to keep the logo and navigation in view. */}
      <ImagePlaceholder
        src={project.cover}
        alt={`${project.title} preview`}
        ratio="16 / 9"
        className="object-top-left"
      />
      <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
        <span className="font-label text-xs tracking-wider text-primary uppercase">{project.category}</span>
        <h3 className="mt-3 text-xs leading-relaxed text-text group-hover/card:text-primary sm:text-sm">
          {/* The ::after stretches this button over the whole card, so any click on the card opens the modal. */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:shadow-[inset_0_0_0_3px_var(--color-primary)]"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <span aria-hidden="true" className="flex items-center gap-2 font-pixel text-[10px] text-text group-hover/card:text-primary">
            Details <PixelIcon name="arrowRight" size={10} />
          </span>
          {project.links.map((l) => (
            // Sits above the stretched button so it stays independently clickable.
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 flex items-center gap-2 font-pixel text-[10px] text-muted hover:text-primary"
            >
              {l.label} <PixelIcon name="external" size={10} />
            </a>
          ))}
        </div>
      </div>
    </PixelCard>
  )
}

export default function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const openProject = otherProjects.find((p) => p.slug === openSlug) ?? null

  return (
    <section id="projects" className="bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="04" title="Selected Work" kicker="INVENTORY" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {caseStudies.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <h3 className="mt-20 mb-8 font-label text-lg tracking-widest text-text uppercase">
          <span className="text-primary">■</span> Other projects
        </h3>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} onOpen={() => setOpenSlug(p.slug)} />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenSlug(null)} />
    </section>
  )
}
