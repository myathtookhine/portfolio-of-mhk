import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '../analytics'
import type { OtherProject } from '../data/projects'
import ImageViewer from './ImageViewer'
import Button from './Button'
import Icon from './Icon'
import Tag from './Tag'
import ZoomableImage from './ZoomableImage'

type Props = {
  project: OtherProject | null
  onClose: () => void
}

// Native <dialog> gives us the focus trap, Esc to close, an inert background
// and focus returning to the triggering card, without extra code.
export default function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [bannerZoomed, setBannerZoomed] = useState(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      // Browsers differ in what showModal() focuses; start keyboard users on Close.
      dialog.querySelector<HTMLButtonElement>('[data-close]')?.focus()
      dialog.scrollTop = 0
    }
    if (!project && dialog.open) dialog.close()
  }, [project])

  // Lock page scroll while open, so only the modal scrolls.
  useEffect(() => {
    if (!project) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [project])

  const titleId = project ? `${project.slug}-title` : undefined
  const bannerAlt = project ? (project.coverAlt ?? `${project.title} preview`) : ''

  return (
    <>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClose={onClose}
        // Clicks on the dialog element itself (not the panel) are backdrop clicks.
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="m-0 h-full max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-4 text-text backdrop:bg-black/80 open:flex sm:p-8"
      >
        {project && (
          <div className="relative m-auto w-full max-w-6xl animate-pop">
            <div className="relative border border-line bg-bg">
              {/* Banner: always full width on top, so screenshots stay large */}
              <div className="border-b border-line bg-surface p-4 sm:p-6">
                <ZoomableImage
                  src={project.cover}
                  alt={bannerAlt}
                  natural
                  loading="eager"
                  onOpen={() => {
                    setBannerZoomed(true)
                    trackEvent('image_zoom', { project: project.title, image: bannerAlt })
                  }}
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <p className="label text-muted">{project.category}</p>
                <h2 id={titleId} className="mt-4 text-4xl leading-tight text-text lg:text-5xl">
                  {project.title}
                </h2>
                <p className="mt-5 max-w-3xl text-lg text-muted">{project.summary}</p>

                {/* Desktop: story on the left, facts on the right. Mobile/tablet: facts first, then the story. */}
                <div className="mt-8 grid grid-cols-1 gap-10 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
                  <aside className="lg:order-last">
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
                      <div>
                        <dt className="label text-muted">Role</dt>
                        <dd className="mt-1 text-text">{project.role}</dd>
                      </div>
                      <div>
                        <dt className="label text-muted">Platforms</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {project.platforms.map((p) => (
                            <Tag key={p} tone="primary">
                              {p}
                            </Tag>
                          ))}
                        </dd>
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <dt className="label text-muted">Tags</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {project.tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </dd>
                      </div>
                    </dl>
                    {project.links.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {project.links.map((l) => (
                          <Button
                            key={l.href}
                            href={l.href}
                            external
                            onClick={() =>
                              trackEvent('project_link_click', {
                                project: project.title,
                                link: l.label,
                                placement: 'modal',
                              })
                            }
                          >
                            {l.label} <Icon name="external" size={14} />
                          </Button>
                        ))}
                      </div>
                    )}
                  </aside>

                  <div>
                    <h3 className="label text-text">
                      Overview
                    </h3>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-muted md:text-[15px] md:leading-8">
                      {project.description.map((d) => (
                        <p key={d}>{d}</p>
                      ))}
                    </div>

                    <h3 className="mt-10 label text-text">
                      Key features
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-7 text-muted md:text-[15px]">
                          <span aria-hidden="true" className="mt-[0.9em] h-px w-3 shrink-0 bg-muted" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                data-close
                aria-label="Close project details"
                className="absolute top-3 right-3 z-10 grid h-10 w-10 cursor-pointer place-items-center border border-line bg-bg text-text hover:border-text hover:bg-text hover:text-bg sm:top-4 sm:right-4"
              >
                <Icon name="close" size={14} />
              </button>
            </div>
          </div>
        )}
      </dialog>

      {/* Sibling of the modal, not inside it, so its close event can't reach the modal's handlers */}
      <ImageViewer
        images={project?.cover ? [{ src: project.cover, alt: bannerAlt }] : []}
        index={bannerZoomed && project?.cover ? 0 : null}
        onIndexChange={() => {}}
        onClose={() => setBannerZoomed(false)}
      />
    </>
  )
}
