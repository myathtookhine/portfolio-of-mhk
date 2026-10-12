/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID, e.g. G-ABC1234XYZ. Missing or empty turns analytics off. */
  readonly VITE_GA_MEASUREMENT_ID?: string
}
