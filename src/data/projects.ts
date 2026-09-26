import axtraBanner from '../assets/projects/axtra-banner.png'
import axtraInventory from '../assets/projects/axtra-inventory.png'
import axtraMenu from '../assets/projects/axtra-menu.png'
import axtraPos from '../assets/projects/axtra-pos.png'
import axtraReports from '../assets/projects/axtra-reports.png'
import energyBanner from '../assets/projects/energy-banner.png'
import energyBattery from '../assets/projects/energy-battery.png'
import energyEv from '../assets/projects/energy-ev.png'
import energyInsights from '../assets/projects/energy-insights.png'
import energyWeather from '../assets/projects/energy-weather.png'
import eticketCover from '../assets/projects/eticket-cover.webp'
import goldShopCover from '../assets/projects/gold-shop-cover.webp'
import hotelCover from '../assets/projects/hotel-cover.webp'
import logisticsCover from '../assets/projects/logistics-cover.webp'
import museumCover from '../assets/projects/museum-cover.webp'
import ponsaryayCover from '../assets/projects/ponsaryay-cover.webp'

export type ProjectLink = { label: string; href: string }
export type ProjectImage = { src: string; alt: string }

/** Featured projects with their own case study page. */
export type CaseStudy = {
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
  cover: ProjectImage
  images: ProjectImage[]
  /** 1 = full-width screens (wide dashboards), 2 = two-up grid (default). */
  galleryColumns?: 1 | 2
}

/** Smaller projects shown as cards; their details open in a modal instead of a page. */
export type OtherProject = {
  slug: string
  title: string
  category: string
  role: string
  summary: string
  description: string[]
  highlights: string[]
  platforms: string[]
  tags: string[]
  /** Leave undefined to show a placeholder. */
  cover?: string
  coverAlt?: string
  links: ProjectLink[]
}

export const caseStudies: CaseStudy[] = [
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
    cover: {
      src: axtraBanner,
      alt: 'Axtra, the ultimate platform app for merchants, shown on desktop, laptop, tablet and phone',
    },
    images: [
      { src: axtraPos, alt: 'POS screen with takeaway, dine-in and delivery modes, a menu grid and the order items panel' },
      { src: axtraMenu, alt: 'Menu management with a product list grouped by category and bulk upload actions' },
      { src: axtraInventory, alt: 'Inventory hub with suppliers, purchase orders, goods received and stock adjustment' },
      { src: axtraReports, alt: 'Reports hub with sales, wallet, tax, EOD and hourly reports' },
    ],
    galleryColumns: 1,
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
      'Live usage monitor showing solar, grid, EV and battery flows around the home load',
      'Used AI to generate illustrations for solar, inverter, reports, alerts and help desk screens',
      'Rebuilt the frontend in HTML, CSS and vanilla JS, and moved it from Bootstrap to Tailwind CSS',
    ],
    platforms: ['Mobile'],
    tags: ['AI-assisted design', 'Nano Banana', 'IoT', 'Tailwind CSS'],
    links: [{ label: 'View live demo', href: 'https://myathtookhine.github.io/smart-electricity-clean/' }],
    cover: {
      src: energyBanner,
      alt: 'Clean Electricity home screen with weather and a live usage monitor for solar, grid, EV and battery',
    },
    images: [
      { src: energyInsights, alt: 'Insights screen with the energy overview and a summary report by day, week, month and year' },
      { src: energyBattery, alt: 'Battery configuration with system status and battery controls' },
      { src: energyEv, alt: 'EV control screen showing the current charging mode' },
      { src: energyWeather, alt: 'Weather screen with StormReady monitoring and the current conditions' },
    ],
  },
]

export const otherProjects: OtherProject[] = [
  {
    slug: 'delivery-warehouse-logistics',
    title: 'Delivery & Warehouse Logistics',
    category: 'Logistics · Enterprise',
    role: 'Lead Designer & Frontend Dev',
    summary: 'Web and mobile tools for delivery and warehouse operations, prototyped as working React apps.',
    description: [
      'A logistics platform that connects warehouses, delivery partners, in-house drivers and riders in one admin panel. Operations teams can see the whole day at a glance, from pickups to successful deliveries, and step in wherever work is piling up.',
      'The workflows were complex, so I built functional React prototypes for the web and mobile apps instead of static mockups. Stakeholders could click through real flows early, which surfaced edge cases long before development started.',
    ],
    highlights: [
      "Analytics overview with today's pickups, pending transfers, in-progress and successful deliveries, each with a trend indicator",
      'Warehouse activity board showing transfers, deliveries and a status for each hub',
      'Assigned-task view that splits active deliveries between riders and in-house drivers',
      'Modules for delivery reports, package monitoring, delivery partners, shops, finances and order tracking',
    ],
    platforms: ['Web', 'Mobile'],
    tags: ['Logistics', 'React', 'Prototyping', 'Dashboard'],
    cover: logisticsCover,
    coverAlt: 'Logistics admin panel with the analytics overview, warehouse activity and assigned tasks',
    links: [],
  },
  {
    slug: 'ponsaryay',
    title: 'PonSarYay',
    category: 'Open-source · Web App',
    role: 'Creator & Developer',
    summary: 'An open-source text-on-image web editor with regional font support, improved using GA4 insights.',
    description: [
      'PonSarYay (ပုံစာရေး) is a free, open-source web editor for adding Burmese and English text to images. Myanmar fonts are often hard to find and install, so the editor bundles a curated font library that works right in the browser.',
      'I designed and built it end to end. After launch, I integrated GA4 to follow user journeys and find where people dropped off, then used those insights to simplify the editing flow.',
    ],
    highlights: [
      'Font library of 42 fonts with search and Myanmar / English filters',
      'Text controls for font size, line height and color, with preset swatches',
      'Undo, redo, duplicate and crop tools on the canvas',
      'Export as PNG or JPEG at 1x, 2x or 3x resolution, then download, copy or share',
      'Burmese-first interface with an English toggle and dark mode',
    ],
    platforms: ['Web'],
    tags: ['Open source', 'Myanmar typography', 'GA4', 'React'],
    cover: ponsaryayCover,
    coverAlt: 'PonSarYay editor with the font library, image upload canvas and text settings panel',
    links: [{ label: 'Live site', href: 'https://ponsaryay.infiniteframe.online' }],
  },
  {
    slug: 'hotel-booking-system',
    title: 'Hotel Booking System',
    category: 'Customer & Owner Platform',
    role: 'Senior UI/UX Designer',
    summary:
      'A booking platform for travelers, with management tools for hotel owners covering rooms, pricing and availability.',
    description: [
      'Hotel Booking System is a comprehensive platform designed to streamline the booking experience for travelers while providing hotel owners with an efficient management solution. It covers the full journey, from discovering accommodation and booking rooms to managing reservations and property operations.',
      'The design emphasizes simplicity, trust and usability. I redesigned legacy screen layouts to fix fragmented user flows, so both daily booking and guest management move forward in clear, predictable steps.',
    ],
    highlights: [
      'Branded splash screen, then skeleton loading states that keep the layout stable while content loads',
      'Hotel detail page with a photo carousel, likes and a save-for-later bookmark',
      'Room categories with thumbnails and prices in Kyats, plus a "See all" list',
      'A persistent "Book a Room" call to action on every hotel screen',
    ],
    platforms: ['iOS', 'Android'],
    tags: ['Hospitality', 'Booking', 'Figma', 'Mobile'],
    cover: hotelCover,
    coverAlt: 'Three hotel app screens: splash, skeleton loading and a hotel detail page with room categories',
    links: [],
  },
  {
    slug: 'e-ticket-management',
    title: 'E-ticket Management',
    category: 'Ticketing · Admin Console',
    role: 'Product Designer & Frontend',
    summary:
      'One admin console for bus, train, flight and event ticketing: issue tickets, watch seat availability, and check in travellers in real time.',
    description: [
      'An e-ticket management console that runs Bus, Train, Flight and Event operations from a single place. Operators issue tickets, watch availability and check in travellers in real time, while a companion visitor app handles public bookings.',
      'Each service has its own management area, but they share one design language. The operations dashboard compares revenue and volume across services at a glance, so teams can spot which one needs attention.',
    ],
    highlights: [
      'Operations dashboard with total revenue, tickets sold, 7-day sales and published events',
      'Per-service cards for Bus, Train, Flight and Events showing revenue, seats sold and share of volume',
      'Intercity bus seat plans, rail coach seat maps and flight cabin class selection',
      'Management for vehicles, cities and gates, stations, routes, bookings and ticket ledgers',
      'Issued-tickets-per-day chart, booking status overview, dark mode and a language switcher',
    ],
    platforms: ['Web'],
    tags: ['Ticketing', 'Admin console', 'Data visualization', 'Dark mode'],
    cover: eticketCover,
    coverAlt: 'Operations dashboard with revenue and ticket sales for bus, train, flight and events',
    links: [],
  },
  {
    slug: 'gold-shop-management',
    title: 'Gold Shop Management',
    category: 'Retail · Dashboard',
    role: 'UI/UX Designer',
    summary: 'A management dashboard for gold shops with live gold prices, sales overviews and inventory.',
    description: [
      "A back-office and POS system for a gold shop (Venus Gold Palace). Gold prices change every day, so today's price per gram for each purity sits front and center, where staff check it before every sale.",
      "Around the price board, the system covers the shop's daily work: categories, products, display trays, goldsmiths, sales, buying back gold and general usage.",
    ],
    highlights: [
      'Gold price board per gram for 18K, 20K, 22K, 23K and 24K, with edit and price-history actions',
      'Sales overview chart with week, month and year views',
      'Modules for categories, products, trays, goldsmiths, sales, buyings and general usage',
      'A built-in POS for the counter, reachable from the top navigation',
    ],
    platforms: ['Web'],
    tags: ['Retail', 'POS', 'Dashboard'],
    cover: goldShopCover,
    coverAlt: 'Gold shop dashboard with gold prices per gram by purity and a monthly sales chart',
    links: [],
  },
  {
    slug: 'museum-admin',
    title: 'Museum Admin Management System',
    category: 'Culture · Admin & Visitor App',
    role: 'Product Designer',
    summary:
      "An admin platform for managing a museum's collection and exhibitions, with a visitor app that reads artifact stories aloud in multiple languages.",
    description: [
      "Museum Admin brings a museum's collection, exhibitions and visitor experience into one management system. Staff organize artifacts by category, build exhibitions from them, and keep every artifact's story up to date in one place.",
      "The same content powers a visitor app. Each artifact's description is available in multiple languages, and visitors can choose a voice to have it read aloud as they walk through the galleries, which makes the museum more accessible to international guests and people who prefer listening to reading.",
    ],
    highlights: [
      'Dashboard with an overview of the collection, exhibitions and visitor activity',
      'Categories for organizing the collection',
      'Artifact records with full details and descriptions in multiple languages',
      'Voice narration: multiple voices read each artifact description aloud for visitors',
      'Exhibition management for curating artifacts into shows',
      'A companion visitor app for exploring artifacts and listening to their stories',
    ],
    platforms: ['Web', 'Mobile'],
    tags: ['Museum', 'Multilingual', 'Voice / audio', 'Admin console'],
    cover: museumCover,
    coverAlt: 'Museum Admin sign-in screen with a gallery photo and the Management System title',
    links: [{ label: 'Live site', href: 'https://finch-timer-35080468.figma.site/' }],
  },
]
