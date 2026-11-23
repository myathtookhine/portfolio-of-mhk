import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../analytics'
import Card from '../components/Card'
import Icon from '../components/Icon'
import ImagePlaceholder from '../components/ImagePlaceholder'
import ProjectModal from '../components/ProjectModal'
import SectionTitle from '../components/SectionTitle'
import Tag from '../components/Tag'
import { caseStudies, otherProjects, type CaseStudy, type OtherProject } from '../data/projects'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

function FeaturedCard({ project, index }: { project: CaseStudy; index: number }) {
  const { t } = useLang()
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-reveal className="block h-full"
      aria-label={`${project.title} case study`}
      onClick={() => trackEvent('case_study_click', { slug: project.slug, placement: 'home_featured' })}
    >
      <Card interactive className="flex flex-col">
        <div className="mono-image overflow-hidden border-b border-line">
          <ImagePlaceholder
            src={project.cover.src}
            alt={project.cover.alt}
            ratio="16 / 10"
            className="transition-transform duration-500 group-hover/card:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {/* One line at every width: on phones the number drops "Featured", and a long category trims with an ellipsis. */}
          <div className="label flex items-center justify-between gap-4 text-muted max-sm:tracking-[0.05em]">
            <span className="shrink-0 whitespace-nowrap text-primary">
              <span className="max-sm:sr-only">Featured · </span>0{index + 1}
            </span>
            <span className="min-w-0 truncate" title={project.category}>
              {project.category}
            </span>
          </div>
          <h3 className="mt-5 text-3xl text-text sm:text-4xl">{project.title}</h3>
          <p className="mt-4 flex-1 text-muted">{project.summary}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <div className="flex flex-wrap gap-2">
              {project.platforms.map((p) => (
                <Tag key={p}>{p}</Tag>
              ))}
            </div>
            <span className="label flex items-center gap-2 text-text">
              {t(ui.projects.view)}
              <Icon name="arrowRight" size={14} className="transition-transform group-hover/card:translate-x-1" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

function ProjectCard({ project, onOpen }: { project: OtherProject; onOpen: () => void }) {
  const { t } = useLang()
  return (
    <Card interactive className="flex flex-col">
      {/* Wide dashboard screenshots: crop from the top-left to keep the logo and navigation in view. */}
      <div className="mono-image overflow-hidden border-b border-line">
        <ImagePlaceholder
          src={project.cover}
          alt={`${project.title} preview`}
          ratio="16 / 9"
          className="object-top-left transition-transform duration-500 group-hover/card:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="label block truncate text-muted max-sm:tracking-[0.05em]" title={project.category}>
          {project.category}
        </span>
        <h3 className="mt-3 text-2xl leading-tight text-text">
          {/* The ::after stretches this button over the whole card, so any click on the card opens the modal. */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-primary"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-line pt-4">
          <span aria-hidden="true" className="label flex items-center gap-2 text-text">
            {t(ui.projects.details)} <Icon name="arrowRight" size={12} />
          </span>
          {project.links.map((l) => (
            // Sits above the stretched button so it stays independently clickable.
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent('project_link_click', { project: project.title, link: l.label, placement: 'card' })
              }
              className="label relative z-10 flex items-center gap-2 text-muted hover:text-text"
            >
              {l.label} <Icon name="external" size={12} />
            </a>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default function Projects() {
  const { t } = useLang()
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const openProject = otherProjects.find((p) => p.slug === openSlug) ?? null

  return (
    <section id="projects" className="border-b border-line px-5 py-20 sm:px-8 md:py-28 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="01" title={t(ui.sections.work)} kicker="Work" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <h3 data-reveal className="label mt-20 mb-6 flex items-center gap-4 text-text">
          {t(ui.sections.otherProjects)}
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </h3>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {otherProjects.map((p) => (
            <li key={p.slug} data-reveal>
              <ProjectCard
                project={p}
                onOpen={() => {
                  setOpenSlug(p.slug)
                  trackEvent('project_modal_open', { slug: p.slug, title: p.title })
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenSlug(null)} />
    </section>
  )
}
