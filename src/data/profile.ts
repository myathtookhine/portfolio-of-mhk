import portrait from '../assets/portrait.webp'
import type { Localized, Text } from '../i18n'

/** Location and availability: shown on the portfolio only, not in the CV. */
const location = {
  city: { en: 'Bangkok', my: 'ဘန်ကောက်' },
  timezone: 'GMT+7',
  badge: { en: 'Open to remote, contract & freelance', my: 'Remote · Contract · Freelance လက်ခံပါသည်' },
  contactLine: {
    en: 'Based in Bangkok (GMT+7). Open to remote, contract & freelance work, with flexible hours for international teams.',
    my: 'ဘန်ကောက် (GMT+7) တွင် နေထိုင်ပါသည်။ Remote၊ Contract နှင့် Freelance အလုပ်များကို လက်ခံပြီး နိုင်ငံတကာ အဖွဲ့များအတွက် အလုပ်ချိန်ကို လိုက်လျောညီထွေ ညှိပေးနိုင်ပါသည်။',
  },
}

export const profile = {
  location,
  name: 'Myat Htoo Khaing',
  firstName: 'Myat Htoo',
  lastName: 'Khaing',
  title: 'Product Designer',
  subtitle: 'UI/UX Designer & Frontend Developer',
  /** One-line value proposition under the hero title. */
  valueProp: {
    en: "A product designer who ships in code. For 9+ years I've turned complex business needs, like restaurant POS, logistics and ticketing, into clear, responsive products, from Figma to production-ready UI.",
    my: 'Code အထိ ကိုယ်တိုင် ဒီဇိုင်းလုပ်တဲ့ Product Designer တစ်ယောက်ပါ။ ၉ နှစ်ကျော်အတွင်း စားသောက်ဆိုင် POS၊ logistics၊ ticketing စတဲ့ ရှုပ်ထွေးတဲ့ လုပ်ငန်းလိုအပ်ချက်တွေကို Figma ကနေ production-ready UI အထိ ရှင်းလင်းပြီး responsive ဖြစ်တဲ့ product တွေအဖြစ် ဖန်တီးပေးခဲ့ပါတယ်။',
  } as Localized,
  portrait,
  about: {
    en: 'UI/UX and Product Designer with 9+ years of experience designing enterprise, logistics, POS, hotel management, and merchant solutions across web and mobile platforms. Specialized in transforming complex business requirements into intuitive user experiences through user-centered design, rapid prototyping, and scalable design systems.',
    my: 'UI/UX နဲ့ Product Designer တစ်ယောက်အနေနဲ့ ၉ နှစ်ကျော် အတွေ့အကြုံ ရှိပါတယ်။ Enterprise၊ logistics၊ POS၊ hotel management နဲ့ merchant solution တွေကို web နဲ့ mobile platform တွေအတွက် ဒီဇိုင်းလုပ်ခဲ့ပါတယ်။ ရှုပ်ထွေးတဲ့ လုပ်ငန်းလိုအပ်ချက်တွေကို user-centered design၊ rapid prototyping နဲ့ scalable design system တွေ အသုံးပြုပြီး သုံးရလွယ်ကူတဲ့ user experience တွေအဖြစ် ပြောင်းလဲပေးခြင်းမှာ ကျွမ်းကျင်ပါတယ်။',
  } as Localized,
  stats: [
    { value: '9+', label: { en: 'Years of experience', my: 'နှစ် အတွေ့အကြုံ' } },
    { value: '4', label: { en: 'Platforms: web, tablet, iOS, Android', my: 'Platform: Web, Tablet, iOS, Android' } },
    { value: '10+', label: { en: 'Restaurants using Axtra POS', my: 'Axtra POS သုံးနေသော စားသောက်ဆိုင်' } },
  ] as { value: string; label: Text }[],
  facts: [
    { label: { en: 'Based in', my: 'နေထိုင်ရာ' }, value: { en: 'Bangkok, Thailand', my: 'ဘန်ကောက်၊ ထိုင်းနိုင်ငံ' } },
    { label: { en: 'Availability', my: 'လက်ခံသော အလုပ်ပုံစံ' }, value: { en: 'Remote, contract & freelance', my: 'Remote၊ Contract နှင့် Freelance' } },
    {
      label: { en: 'Time zone', my: 'အချိန်ဇုန်' },
      value: { en: 'GMT+7 · Flexible hours for international teams', my: 'GMT+7 · နိုင်ငံတကာ အဖွဲ့များအတွက် အချိန် ညှိပေးနိုင်ပါသည်' },
    },
    { label: { en: 'Focus', my: 'အဓိက နယ်ပယ်' }, value: 'Enterprise, POS, logistics' },
    { label: { en: 'Platforms', my: 'Platform များ' }, value: 'Web, tablet, iOS & Android' },
    { label: 'Stack', value: 'Figma + React / Tailwind' },
    { label: { en: 'Languages', my: 'ဘာသာစကား' }, value: { en: 'English, Burmese', my: 'အင်္ဂလိပ်၊ မြန်မာ' } },
  ] as { label: Text; value: Text }[],
  /** Life outside work, shown in About. */
  hobbies: [
    {
      icon: 'music',
      title: { en: 'Music', my: 'ဂီတ' },
      text: { en: 'Current mood: lo-fi and jazz.', my: 'လက်ရှိ mood က Lo-fi နဲ့ Jazz ပါ။' },
    },
    {
      icon: 'film',
      title: { en: 'Movies', my: 'ရုပ်ရှင်' },
      text: {
        en: 'A Star Wars fan with a soft spot for indie films.',
        my: 'Star Wars ပရိသတ်တစ်ယောက်ဖြစ်ပြီး Indie ရုပ်ရှင်တွေကိုလည်း နှစ်သက်ပါတယ်။',
      },
    },
    {
      icon: 'palette',
      title: { en: 'Painting', my: 'ပန်းချီ' },
      text: { en: 'When the mood strikes, I pick up a brush and paint.', my: 'စိတ်ပါလာတဲ့အခါ ပန်းချီဆွဲတတ်ပါတယ်။' },
    },
  ] as { icon: 'music' | 'film' | 'palette'; title: Localized; text: Localized }[],
  strengths: [
    {
      title: { en: 'Complex flows, made simple', my: 'ရှုပ်ထွေးတဲ့ flow တွေကို ရိုးရှင်းအောင်' },
      text: {
        en: 'I turn complex business operations into clear, usable screens, from restaurant POS to delivery logistics, ticketing and museum management.',
        my: 'ရှုပ်ထွေးတဲ့ လုပ်ငန်းလုပ်ဆောင်ချက်တွေကို ရှင်းလင်းပြီး သုံးရလွယ်တဲ့ screen တွေအဖြစ် ပြောင်းပေးပါတယ်။ စားသောက်ဆိုင် POS ကနေ delivery logistics၊ ticketing နဲ့ museum management အထိ ဖြစ်ပါတယ်။',
      },
      proof: [{ label: 'Axtra POS', to: '/projects/axtra-pos' }, { label: 'Logistics' }, { label: 'E-ticket' }],
    },
    {
      title: { en: 'Responsive to the last pixel', my: 'Pixel တိုင်းအထိ Responsive' },
      text: {
        en: 'Web, desktop, tablet and phone. On Axtra POS I checked and fixed the responsive design of the entire product, directly in the code.',
        my: 'Web၊ desktop၊ tablet နဲ့ phone အားလုံးအတွက်ပါ။ Axtra POS မှာ product တစ်ခုလုံးရဲ့ responsive design ကို code ထဲမှာ ကိုယ်တိုင် စစ်ဆေးပြင်ဆင်ခဲ့ပါတယ်။',
      },
      proof: [{ label: 'Axtra POS', to: '/projects/axtra-pos' }],
    },
    {
      title: { en: 'Design that ships in code', my: 'Code အထိ ရောက်တဲ့ ဒီဇိုင်း' },
      text: {
        en: 'Expert CSS, plus React, TypeScript and Tailwind. I refine UI in the codebase and build working prototypes. At OMS I built the design system directly in code, inside a React + TypeScript + Tailwind admin project.',
        my: 'CSS ကို ကျွမ်းကျင်စွာ အသုံးပြုနိုင်ပြီး React၊ TypeScript နဲ့ Tailwind လည်း သုံးပါတယ်။ Codebase ထဲမှာ UI ကို တိုက်ရိုက်ပြင်ဆင်ပြီး အလုပ်လုပ်တဲ့ prototype တွေ တည်ဆောက်ပါတယ်။ OMS မှာ design system ကို React + TypeScript + Tailwind admin project ထဲမှာ code နဲ့ တိုက်ရိုက် တည်ဆောက်ခဲ့ပါတယ်။',
      },
      proof: [{ label: 'Design system at OMS (in code)' }, { label: 'React prototypes' }],
    },
    {
      title: { en: 'AI-accelerated prototyping', my: 'AI ဖြင့် အမြန် Prototyping' },
      text: {
        en: 'I use AI as a prototyping partner to go from brief to working screens fast: a full app redesign in 2 weeks, accepted by the client.',
        my: 'AI ကို prototyping လုပ်ဖော်ကိုင်ဖက်အဖြစ် အသုံးပြုပြီး brief ကနေ အလုပ်လုပ်တဲ့ screen တွေအထိ မြန်မြန်ဆန်ဆန် ရောက်စေပါတယ်။ App တစ်ခုလုံးကို ၂ ပတ်အတွင်း redesign လုပ်ပြီး client လက်ခံခဲ့ပါတယ်။',
      },
      proof: [{ label: 'Smart Energy', to: '/projects/smart-energy-management' }],
    },
  ] as { title: Localized; text: Localized; proof: { label: string; to?: string }[] }[],
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
