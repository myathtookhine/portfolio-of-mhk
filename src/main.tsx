import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LanguageProvider from './components/LanguageProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Routes live under the Vite base path, e.g. /portfolio-of-mhk/projects/axtra-pos */}
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
