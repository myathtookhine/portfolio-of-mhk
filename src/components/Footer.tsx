import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center font-label text-xs tracking-widest text-muted uppercase sm:flex-row sm:px-6 sm:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Designed &amp; built with <span className="text-primary">■</span> React + Tailwind
        </p>
        <a href="#top" className="hover:text-primary">
          ▲ Back to top
        </a>
      </div>
    </footer>
  )
}
