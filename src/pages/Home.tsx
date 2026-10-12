import { usePageView } from '../analytics'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Strengths from '../sections/Strengths'

export default function Home() {
  // No title of its own: the one in index.html is the home page's.
  usePageView()

  return (
    <>
      <Hero />
      <div className="pixel-divider" aria-hidden="true" />
      {/* Work first: recruiters see projects right after the intro. */}
      <Projects />
      <About />
      <Strengths />
      <Experience />
      <Skills />
      <Contact />
    </>
  )
}
