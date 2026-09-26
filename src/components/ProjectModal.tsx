import { useEffect, useRef, useState } from 'react'
import type { OtherProject } from '../data/projects'
import ImageViewer from './ImageViewer'
import PixelButton from './PixelButton'
import PixelIcon from './PixelIcon'
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
            <div aria-hidden="true" className="pixel-corners absolute inset-0 translate-x-2 translate-y-2 bg-primary" />
            <div className="pixel-corners pixel-border relative bg-surface">
              {/* Banner: always full width on top, so screenshots stay large */}
              <div className="bg-bg/60 p-4 sm:p-6">
                <ZoomableImage
                  src={project.cover}
                  alt={bannerAlt}
                  natural
                  loading="eager"
                  onOpen={() => setBannerZoomed(true)}
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <p className="font-label text-xs tracking-widest text-primary uppercase">&gt; {project.category}</p>
                <h2 id={titleId} className="mt-4 text-3xl leading-tight text-text lg:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-5 max-w-3xl text-text/90 md:text-base">{project.summary}</p>

                {/* Desktop: story on the left, facts on the right. Mobile/tablet: facts first, then the story. */}
                <div className="mt-8 grid grid-cols-1 gap-10 border-t-2 border-dashed border-line pt-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
                  <aside className="lg:order-last">
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
                      <div>
                        <dt className="font-label text-xs tracking-widest text-muted uppercase">Role</dt>
                        <dd className="mt-1 text-text">{project.role}</dd>
                      </div>
                      <div>
                        <dt className="font-label text-xs tracking-widest text-muted uppercase">Platforms</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {project.platforms.map((p) => (
                            <Tag key={p} tone="primary">
                              {p}
                            </Tag>
                          ))}
                        </dd>
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <dt className="font-label text-xs tracking-widest text-muted uppercase">Tags</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {project.tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </dd>
                      </div>
                    </dl>
                    {project.links.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-5">
                        {project.links.map((l) => (
                          <PixelButton key={l.href} href={l.href} external>
                            {l.label} <PixelIcon name="external" size={12} />
                          </PixelButton>
                        ))}
                      </div>
                    )}
                  </aside>

                  <div>
                    <h3 className="font-label text-sm tracking-widest text-text uppercase">
                      <span className="text-primary">■</span> Overview
                    </h3>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-text/85 md:text-[15px] md:leading-8">
                      {project.description.map((d) => (
                        <p key={d}>{d}</p>
                      ))}
                    </div>

                    <h3 className="mt-10 font-label text-sm tracking-widest text-text uppercase">
                      <span className="text-primary">■</span> Key features
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-7 text-text/85 md:text-[15px]">
                          <PixelIcon name="star" size={12} className="mt-2 text-primary" />
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
                className="pixel-corners absolute top-3 right-3 z-10 grid h-11 w-11 place-items-center bg-bg text-text shadow-[inset_0_0_0_3px_var(--color-line)] hover:bg-primary hover:text-bg sm:top-4 sm:right-4"
              >
                <PixelIcon name="close" size={16} />
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
