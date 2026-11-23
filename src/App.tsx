import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import RevealManager from './components/RevealManager'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'
import { initSmoothScroll } from './smoothScroll'

function App() {
  useEffect(() => initSmoothScroll(), [])

  return (
    // Desktop: a fixed-width index column on the left, the work on the right.
    <div id="top" className="min-h-svh lg:grid lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
      <ScrollManager />
      <RevealManager />
      <a
        href="#main"
        data-native-anchor
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-70 focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <Navbar />
      <div className="flex min-h-svh min-w-0 flex-col">
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/projects/:slug" Component={ProjectDetail} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CustomCursor />
    </div>
  )
}

export default App
