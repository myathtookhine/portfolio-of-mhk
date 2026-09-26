import About from '../sections/About'
import Contact from '../sections/Contact'
import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Vision from '../sections/Vision'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="pixel-divider" aria-hidden="true" />
      <About />
      <Vision />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
