import { usePageView } from '../analytics'
import Button from '../components/Button'
import Icon from '../components/Icon'

export default function NotFound() {
  usePageView('Page not found — 404')

  return (
    <section className="flex min-h-[80svh] flex-col justify-center px-5 pt-28 pb-16 sm:px-8 lg:px-14">
      <title>Page not found — 404</title>
      <div className="mx-auto w-full max-w-6xl">
        <p className="label text-muted">Error 404</p>
        <h1 className="text-display mt-6 text-text">
          Page not <span className="text-accent italic">found</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-muted">
          This page doesn't exist. Maybe it was never built, or it moved.
        </p>
        <div className="mt-10">
          <Button to="/">
            <Icon name="arrowLeft" size={14} /> Back home
          </Button>
        </div>
      </div>
    </section>
  )
}
