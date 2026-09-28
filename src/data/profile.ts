import portrait from '../assets/portrait.webp'

export const profile = {
  name: 'Myat Htoo Khaing',
  firstName: 'Myat Htoo',
  lastName: 'Khaing',
  title: 'Product Designer',
  subtitle: 'UI/UX Designer & Frontend Developer',
  /** One-line value proposition under the hero title. */
  valueProp:
    "A product designer who ships in code. For 9+ years I've turned complex business needs, like restaurant POS, logistics and ticketing, into clear, responsive products, from Figma to production-ready UI.",
  portrait,
  about:
    'UI/UX and Product Designer with 9+ years of experience designing enterprise, logistics, POS, hotel management, and merchant solutions across web and mobile platforms. Specialized in transforming complex business requirements into intuitive user experiences through user-centered design, rapid prototyping, and scalable design systems.',
  stats: [
    { value: '9+', label: 'Years of experience' },
    { value: '4', label: 'Platforms: web, tablet, iOS, Android' },
    { value: '10+', label: 'Restaurants using Axtra POS' },
  ],
  facts: [
    { label: 'Focus', value: 'Enterprise, POS, logistics' },
    { label: 'Platforms', value: 'Web, tablet, iOS & Android' },
    { label: 'Stack', value: 'Figma + React / Tailwind' },
    { label: 'Languages', value: 'English, Burmese' },
  ],
  strengths: [
    {
      title: 'Complex flows, made simple',
      text: 'I turn complex business operations into clear, usable screens, from restaurant POS to delivery logistics, ticketing and museum management.',
      proof: [{ label: 'Axtra POS', to: '/projects/axtra-pos' }, { label: 'Logistics' }, { label: 'E-ticket' }],
    },
    {
      title: 'Responsive to the last pixel',
      text: 'Web, desktop, tablet and phone. On Axtra POS I checked and fixed the responsive design of the entire product, directly in the code.',
      proof: [{ label: 'Axtra POS', to: '/projects/axtra-pos' }],
    },
    {
      title: 'Design that ships in code',
      text: 'Expert CSS, plus React, TypeScript and Tailwind. I refine UI in the codebase and build working prototypes. At OMS I built the design system directly in code, inside a React + TypeScript + Tailwind admin project.',
      proof: [{ label: 'Design system at OMS (in code)' }, { label: 'React prototypes' }],
    },
    {
      title: 'AI-accelerated prototyping',
      text: 'I use AI as a prototyping partner to go from brief to working screens fast: a full app redesign in 2 weeks, accepted by the client.',
      proof: [{ label: 'Smart Energy', to: '/projects/smart-energy-management' }],
    },
  ] as { title: string; text: string; proof: { label: string; to?: string }[] }[],
  contact: {
    email: 'myathtookhine@gmail.com',
    phone: '+66 80 414 8062',
    phoneHref: 'tel:+66804148062',
    linkedin: 'linkedin.com/in/myat-htoo-khaing-084242b3',
    linkedinHref: 'https://www.linkedin.com/in/myat-htoo-khaing-084242b3',
    github: 'github.com/myathtookhine',
    githubHref: 'https://github.com/myathtookhine',
  },
  // BASE_URL keeps this working under the GitHub Pages subpath.
  cvUrl: `${import.meta.env.BASE_URL}cv/Myat-Htoo-Khaing-Resume.pdf`,
}
