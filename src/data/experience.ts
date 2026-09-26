export type Experience = {
  role: string
  company: string
  period: string
  points: string[]
}

export const experience: Experience[] = [
  {
    role: 'Lead Designer & Frontend Dev',
    company: 'Online Merchant Solutions Co. Ltd.',
    period: '2023 – 2025',
    points: [
      'Developed functional React prototypes for complex Delivery & Warehouse Logistics web and mobile applications.',
      'Spearheaded cross-platform UI/UX (Web, Tablet, iOS/Android) for merchant POS and consumer-facing apps for AxtraPOS.',
      'Established and maintained a centralized Design System and UI Kit, streamlining collaboration between the product team and developers to ensure design consistency.',
    ],
  },
  {
    role: 'Senior UI/UX Designer',
    company: 'Online Merchant Solutions Co. Ltd.',
    period: '2019 – 2023',
    points: [
      'Designed interactive Figma prototypes for an on-demand rider app, mapping intuitive edge-case journeys to prioritize driver focus and safety.',
      'Redesigned legacy Figma screen layouts to resolve fragmented user flows, optimizing task progression across daily booking and guest management systems.',
      'Redesigned a Smart Electricity Usage management application using HTML, CSS, and Vanilla JS. Transitioned frontend tech stacks from Bootstrap to Tailwind CSS.',
    ],
  },
  {
    role: 'Web & Graphic Designer',
    company: 'Narigo Travel and Tour Co. Ltd.',
    period: '2016 – 2019',
    points: [
      'Built responsive, cross-platform webpages from scratch using HTML, CSS, JavaScript, and jQuery.',
      'Designed high-quality logos, custom iconography, banners, and vector illustrations utilizing Adobe Illustrator.',
    ],
  },
]
