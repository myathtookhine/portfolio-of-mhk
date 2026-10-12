# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Analytics (GA4)

Paste the measurement ID from **GA4 › Admin › Data streams › web stream** into
`.env.production`:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Then `npm run deploy`. Rules of the setup, all in [`src/analytics.ts`](src/analytics.ts):

- gtag.js loads only in production builds that have a valid ID, so `npm run dev`
  never touches the real property — it logs every hit to the console instead.
  Use `.env.local` for a separate test property.
- Page views are sent by hand (`usePageView`), because gtag's own `page_view`
  fires once per load and this is a single-page app. Route changes and the
  correct per-case-study title are handled by the hook.
- Event names live in one `EventName` union, so they stay consistent:

| Event | Sent when | Params |
| --- | --- | --- |
| `cv_download` | résumé PDF download | `placement`: hero, contact |
| `contact_click` | email, phone, LinkedIn, GitHub | `channel`, `placement` |
| `case_study_click` | featured card or prev/next | `slug`, `placement` |
| `project_modal_open` | "other project" card | `slug`, `title` |
| `project_link_click` | live/external project link | `project`, `link`, `placement` |
| `certificate_click` | certificate link in Skills | `title`, `place` |
| `image_zoom` | screenshot opened in the viewer | `project`, `image` |
| `nav_click` | navbar or hero CTA | `section`, `placement` |
| `section_view` | a section is read (once per visit) | `section` |
| `language_change` | EN ⇄ မြန်မာ switch | `language` |
| `music_toggle`, `sound_prompt` | music button, "Sound on?" bubble | `action`, `choice` |

In GA4, mark `cv_download` and `contact_click` as key events
(**Admin › Events**) to see them as conversions, and register the params above
as custom dimensions (**Admin › Custom definitions**) if you want to break
reports down by them.
