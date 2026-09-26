export type ProjectLink = { label: string; href: string }

export type Project = {
  slug: string
  title: string
  category: string
  year?: string
  role: string
  summary: string
  description: string[]
  highlights: string[]
  platforms: string[]
  tags: string[]
  links: ProjectLink[]
  /** Cover image. Leave undefined to show a placeholder. */
  cover?: string
  /** Gallery images. Empty strings render as placeholders. */
  images: string[]
  featured?: boolean
}

// Four empty slots, so every project shows a gallery until real screenshots arrive.
const placeholderGallery = ['', '', '', '']

export const projects: Project[] = [
  {
    slug: 'axtra-pos',
    title: 'Axtra POS',
    category: 'Point of Sale · Merchant',
    year: '2023 – 2025',
    role: 'Lead Product Designer',
    summary:
      'A cross-platform Point of Sale solution that simplifies retail and restaurant operations across web, tablet, and mobile.',
    description: [
      'Axtra POS is a comprehensive cross-platform Point of Sale (POS) solution designed to simplify retail and restaurant operations. The system delivers a seamless experience across web, tablet, and mobile devices, allowing business owners and staff to efficiently manage sales, inventory, customers, and daily operations from anywhere.',
      'The design focuses on creating an intuitive, clean, and responsive user experience that minimizes the learning curve while improving productivity. Consistent design patterns, clear information hierarchy, and optimized workflows ensure smooth navigation across different screen sizes and devices.',
    ],
    highlights: [
      'Led cross-platform UI/UX for the merchant POS and the consumer-facing apps',
      'Built a centralized design system and UI kit shared by design and development',
      'Kept patterns consistent across web, tablet, iOS and Android',
    ],
    platforms: ['Web', 'Tablet', 'iOS', 'Android'],
    tags: ['POS', 'Design System', 'Figma', 'Cross-platform'],
    links: [],
    images: placeholderGallery,
    featured: true,
  },
  {
    slug: 'smart-energy-management',
    title: 'Smart Energy Management',
    category: 'AI-Powered Prototype',
    role: 'Product Designer & Frontend',
    summary:
      'A concept app that helps homeowners monitor and optimize electricity use, with visuals generated using conversational AI.',
    description: [
      'Smart Energy Management is a concept prototype that helps homeowners monitor and optimize electricity consumption through an intuitive mobile experience. The application provides real-time energy insights, device monitoring, and intelligent notifications to encourage more efficient energy usage.',
      "The project explores the integration of conversational AI into the design workflow by utilizing Google's Nano Banana AI to rapidly generate visual concepts, illustrations, and interface assets. AI-assisted ideation significantly accelerated the design process while maintaining a consistent visual language across the product.",
    ],
    highlights: [
      'Live usage monitor with isometric home illustrations in light and dark modes',
      'Used AI to generate illustrations for solar, inverter, reports, alerts and help desk screens',
      'Rebuilt the frontend in HTML, CSS and vanilla JS, and moved it from Bootstrap to Tailwind CSS',
    ],
    platforms: ['Mobile'],
    tags: ['AI-assisted design', 'Nano Banana', 'IoT', 'Tailwind CSS'],
    links: [],
    images: placeholderGallery,
    featured: true,
  },
  {
    slug: 'hotel-booking-system',
    title: 'Hotel Booking System',
    category: 'Customer & Owner Platform',
    role: 'Senior UI/UX Designer',
    summary:
      'A booking platform for travelers, with management tools for hotel owners covering rooms, pricing and availability.',
    description: [
      'Hotel Booking System is a comprehensive platform designed to streamline the booking experience for travelers while providing hotel owners with an efficient management solution. The project focuses on delivering a seamless user journey, from discovering accommodations and booking rooms to managing reservations and property operations.',
      'The design emphasizes simplicity, trust, and usability, enabling customers to find the right accommodation quickly while giving hotel owners the tools to manage rooms, pricing, availability, and bookings with ease.',
    ],
    highlights: [
      'Two connected experiences: customer booking and owner management',
      'Skeleton loading states for a calm, predictable browsing experience',
      'Redesigned legacy layouts to fix fragmented booking and guest-management flows',
    ],
    platforms: ['iOS', 'Android'],
    tags: ['Hospitality', 'Booking', 'Figma'],
    links: [
      {
        label: 'View in Figma',
        href: 'https://www.figma.com/design/EzpPH70W7nacXD7grV74yy/Hotel?node-id=8-7315&p=f&t=7Io2NpWTPaKMlFMr-0',
      },
    ],
    images: placeholderGallery,
  },
  {
    slug: 'delivery-warehouse-logistics',
    title: 'Delivery & Warehouse Logistics',
    category: 'Logistics · Enterprise',
    role: 'Lead Designer & Frontend Dev',
    summary:
      'Web and mobile tools for delivery and warehouse operations, prototyped as working React apps.',
    description: [
      'A suite of web and mobile applications for delivery and warehouse logistics. To validate complex operational flows early, I built functional React prototypes instead of static mockups. This let the product team and stakeholders test real interactions before development started.',
    ],
    highlights: [
      'Functional React prototypes for complex operational workflows',
      'Web dashboards for operations teams, and mobile screens for field staff',
      'Shared components from the central design system',
    ],
    platforms: ['Web', 'Mobile'],
    tags: ['Logistics', 'React', 'Prototyping'],
    links: [],
    images: placeholderGallery,
  },
  {
    slug: 'on-demand-rider-app',
    title: 'On-demand Rider App',
    category: 'Mobility · Mobile',
    role: 'Senior UI/UX Designer',
    summary:
      'Interactive Figma prototypes for a rider app, designed around driver focus and safety.',
    description: [
      'An on-demand rider application where the main design goal was to keep drivers focused and safe on the road. I designed interactive Figma prototypes and mapped intuitive journeys for the edge cases, so drivers always know what to do next with minimal distraction.',
    ],
    highlights: [
      'Mapped edge-case journeys such as cancellations, failed deliveries and connectivity loss',
      'Large touch targets and glanceable information for use on the road',
      'Interactive Figma prototypes for usability testing',
    ],
    platforms: ['iOS', 'Android'],
    tags: ['Mobility', 'Figma', 'Safety-first UX'],
    links: [],
    images: placeholderGallery,
  },
  {
    slug: 'ponsaryay',
    title: 'PonSarYay',
    category: 'Open-source · Web App',
    role: 'Creator & Developer',
    summary:
      'An open-source text-on-image web editor with regional font support, improved using GA4 insights.',
    description: [
      'PonSarYay is an open-source text-on-image web editor featuring regional font integrations, so people can easily create images with Burmese typography.',
      'I integrated GA4 to track user journeys and drop-offs, and used those insights to keep improving the UI/UX.',
    ],
    highlights: [
      'Designed and built end to end',
      'Regional (Burmese) font integrations',
      'GA4 funnels to find and fix drop-off points',
    ],
    platforms: ['Web'],
    tags: ['Open source', 'React', 'GA4'],
    links: [{ label: 'Visit live site', href: 'https://ponsaryay.infiniteframe.online' }],
    images: placeholderGallery,
  },
  {
    slug: 'gold-shop-management',
    title: 'Gold Shop Management',
    category: 'Retail · Dashboard',
    role: 'UI/UX Designer',
    summary:
      'A management dashboard for gold shops with live gold prices, sales overviews and inventory.',
    description: [
      'A web dashboard for gold shop owners to track daily gold prices by grade, monitor sales trends and manage products, sales and savings in one place.',
    ],
    highlights: ['Gold price board by grade', 'Sales overview charts', 'Product, sales and savings modules'],
    platforms: ['Web'],
    tags: ['Retail', 'Dashboard'],
    links: [],
    images: placeholderGallery,
  },
  {
    slug: 'server-hardware-service',
    title: 'Server Hardware Service',
    category: 'Admin · Dashboard',
    role: 'UI/UX Designer',
    summary:
      'An admin panel for a server hardware service provider, with customer, product and trend tracking.',
    description: [
      'An admin dashboard for managing server hardware services. It gives an at-a-glance overview of standard and premium orders, customers and invoices, with trend charts for each service tier.',
    ],
    highlights: ['KPI overview cards', 'Standard vs premium trend charts', 'Customer and product management'],
    platforms: ['Web'],
    tags: ['Admin', 'Dashboard', 'Dark UI'],
    links: [],
    images: placeholderGallery,
  },
  {
    slug: 'capital-company-portfolio',
    title: 'Capital SDN. BHD.',
    category: 'Corporate Website',
    role: 'Web Designer',
    summary: 'A company portfolio website for an investment firm: "Beyond Investments. Creating Possibilities."',
    description: [
      'A corporate portfolio website for a Malaysian investment company. The design uses a confident dark hero, a clear service navigation and a background section that builds trust with prospective partners.',
    ],
    highlights: ['Bold hero and call to action', 'Service overview navigation', 'Company background story'],
    platforms: ['Web'],
    tags: ['Corporate', 'Website'],
    links: [],
    images: placeholderGallery,
  },
]

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
