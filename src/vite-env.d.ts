/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID, e.g. G-ABC1234XYZ. Missing or empty turns analytics off. */
  readonly VITE_GA_MEASUREMENT_ID?: string
  /** Microsoft Clarity project ID. Missing or empty turns session recording off. */
  readonly VITE_CLARITY_PROJECT_ID?: string
}
