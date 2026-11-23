import { trackEvent } from '../analytics'
import AvailabilityBadge from '../components/AvailabilityBadge'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="border-b border-line px-5 pt-28 pb-14 sm:px-8 lg:px-14 lg:pt-32 lg:pb-16" aria-labelledby="hero-title">
      {/* A size container, so the name can scale to the column's width and stay on one line. */}
      <div className="@container mx-auto max-w-6xl">
        <AvailabilityBadge className="mb-10 lg:hidden" />

        <p data-reveal className="label flex flex-wrap justify-between gap-x-6 gap-y-2 text-muted">
          <span>{profile.title}</span>
          <span>
            {t(profile.location.city)} · {profile.location.timezone}
          </span>
        </p>
        <h1 id="hero-title" data-reveal className="hero-name mt-6 whitespace-nowrap text-text">
          {profile.firstName} <span className="text-primary italic">{profile.lastName}</span>
        </h1>

        <p data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          {t(profile.valueProp)}
        </p>

        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          <Button
            href="#projects"
            onClick={() => trackEvent('nav_click', { section: 'projects', placement: 'hero_cta' })}
          >
            {t(ui.hero.explore)} <Icon name="arrowDown" size={14} />
          </Button>
          <Button
            href={profile.cvUrl}
            variant="outline"
            download
            onClick={() => trackEvent('cv_download', { placement: 'hero' })}
          >
            {t(ui.hero.downloadCv)} <Icon name="download" size={14} />
          </Button>
        </div>

        {/* Key numbers, set out like a data table */}
        <dl data-reveal className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {profile.stats.map((s, i) => (
            <div
              key={s.value}
              className={`flex items-baseline gap-5 border-b border-line py-5 sm:block sm:border-b-0 sm:py-6 ${
                i > 0 ? 'sm:border-l sm:pl-6' : ''
              }`}
            >
              <dt className="sr-only">{t(s.label)}</dt>
              <dd className="w-20 shrink-0 font-display text-5xl leading-none text-text sm:w-auto sm:text-6xl">
                {s.value}
              </dd>
              <dd className="label mt-3 text-muted">{t(s.label)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
