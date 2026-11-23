import { profile } from '../data/profile'
import { useLang } from '../i18n'
import Icon from './Icon'

/** "Open to work" note: a bag icon sending out slow rings, with the availability line under it. */
export default function AvailabilityBadge({ className = '' }: { className?: string }) {
  const { t } = useLang()
  return (
    <div className={className}>
      <span className="relative grid h-8 w-8 place-items-center text-primary" aria-hidden="true">
        <span className="absolute inset-0 animate-radiate rounded-full border border-primary" />
        <span className="absolute inset-0 animate-radiate rounded-full border border-primary [animation-delay:1.6s]" />
        <span className="relative grid h-8 w-8 place-items-center rounded-full border border-primary bg-bg">
          <Icon name="briefcase" size={14} />
        </span>
      </span>
      <p className="label badge-text mt-3 text-text">{t(profile.location.badge)}</p>
    </div>
  )
}
