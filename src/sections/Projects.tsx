import { Link } from 'react-router-dom'
import ImagePlaceholder from '../components/ImagePlaceholder'
import PixelCard from '../components/PixelCard'
import PixelIcon from '../components/PixelIcon'
import SectionTitle from '../components/SectionTitle'
import Tag from '../components/Tag'
import { projects, type Project } from '../data/projects'

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link to={`/projects/${project.slug}`} className="block h-full" aria-label={`${project.title} case study`}>
      <PixelCard interactive className="flex flex-col p-4 sm:p-5">
        <ImagePlaceholder src={project.cover} alt={`${project.title} preview`} ratio="16 / 10" />
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="block h-full" aria-label={`${project.title} case study`}>
      <PixelCard interactive shadow={false} className="flex flex-col p-4 group-hover/card:shadow-[inset_0_0_0_3px_var(--color-primary)]">
        <ImagePlaceholder src={project.cover} alt={`${project.title} preview`} ratio="16 / 10" />
        <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
          <span className="font-label text-xs tracking-wider text-primary uppercase">{project.category}</span>
          <h3 className="mt-3 text-xs leading-relaxed text-text group-hover/card:text-primary sm:text-sm">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.summary}</p>
          <span className="mt-5 flex items-center gap-2 font-pixel text-[10px] text-text group-hover/card:text-primary">
            Case study <PixelIcon name="arrowRight" size={10} />
          </span>
        </div>
      </PixelCard>
    </Link>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle index="04" title="Selected Work" kicker="INVENTORY" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <h3 className="mt-20 mb-8 font-label text-lg tracking-widest text-text uppercase">
          <span className="text-primary">■</span> Other projects
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
