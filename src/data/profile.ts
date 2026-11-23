import type { Localized, Text } from '../i18n'

/** Location and availability: shown on the portfolio only, not in the CV. */
const location = {
  city: { en: 'Bangkok', my: 'ဘန်ကောက်' },
  timezone: 'GMT+7',
  badge: { en: 'Open to remote, contract & freelance', my: 'Remote · Contract · Freelance အလုပ်တွေ လက်ခံပါတယ်' },
  contactLine: {
    en: 'Based in Bangkok (GMT+7). Open to remote, contract & freelance work, with flexible hours for international teams.',
    my: 'ဘန်ကောက် (GMT+7) မှာ အခြေစိုက်ပြီး Remote၊ Contract နဲ့ Freelance အလုပ်တွေ လက်ခံပါတယ်။ နိုင်ငံတကာ Team တွေနဲ့ အဆင်ပြေအောင် အလုပ်ချိန်လည်း ညှိနိုင်ပါတယ်။',
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
    my: 'Code နဲ့ အကောင်အထည်ဖော်တတ်တဲ့ Product Designer တစ်ယောက်ပါ။ ၉ နှစ်ကျော်အတွင်း စားသောက်ဆိုင် POS၊ Logistics နဲ့ Ticketing လို ရှုပ်ထွေးတဲ့ လုပ်ငန်းလိုအပ်ချက်တွေကို Figma ကနေ Production-ready UI အထိ ရှင်းလင်းပြီး Responsive ဖြစ်တဲ့ Product တွေအဖြစ် ဖန်တီးပေးခဲ့ပါတယ်။',
  } as Localized,
  about: {
    en: 'UI/UX and Product Designer with 9+ years of experience designing enterprise, logistics, POS, hotel management, and merchant solutions across web and mobile platforms. Specialized in transforming complex business requirements into intuitive user experiences through user-centered design, rapid prototyping, and scalable design systems.',
    my: 'UI/UX နဲ့ Product Designer အဖြစ် ၉ နှစ်ကျော် အတွေ့အကြုံရှိပါတယ်။ Enterprise၊ Logistics၊ POS၊ Hotel Management နဲ့ Merchant Solution တွေအတွက် Web နဲ့ Mobile Platform တွေပေါ်မှာ ဒီဇိုင်းလုပ်ခဲ့ပါတယ်။ ရှုပ်ထွေးတဲ့ လုပ်ငန်းလိုအပ်ချက်တွေကို User-centered Design၊ Rapid Prototyping နဲ့ Scalable Design System တွေကို သုံးပြီး သုံးရလွယ်ကူတဲ့ User Experience တွေအဖြစ် ပြောင်းပေးတာကို အထူးကျွမ်းကျင်ပါတယ်။',
  } as Localized,
  stats: [
    { value: '9+', label: { en: 'Years of experience', my: 'နှစ် အတွေ့အကြုံ' } },
    { value: '4', label: { en: 'Platforms: web, tablet, iOS, Android', my: 'Platform တွေ: Web, Tablet, iOS, Android' } },
    { value: '10+', label: { en: 'Restaurants using Axtra POS', my: 'Axtra POS သုံးနေတဲ့ စားသောက်ဆိုင်တွေ' } },
  ] as { value: string; label: Text }[],
  facts: [
    { label: { en: 'Based in', my: 'နေထိုင်ရာ' }, value: { en: 'Bangkok, Thailand', my: 'ဘန်ကောက်၊ ထိုင်းနိုင်ငံ' } },
    { label: { en: 'Availability', my: 'လက်ခံတဲ့ အလုပ်ပုံစံ' }, value: { en: 'Remote, contract & freelance', my: 'Remote၊ Contract နဲ့ Freelance' } },
    {
      label: { en: 'Time zone', my: 'အချိန်ဇုန်' },
      value: { en: 'GMT+7 · Flexible hours for international teams', my: 'GMT+7 · နိုင်ငံတကာ Team တွေအတွက် အချိန်ညှိနိုင်ပါတယ်' },
    },
    { label: { en: 'Focus', my: 'အဓိက နယ်ပယ်' }, value: 'Enterprise, POS, logistics' },
    { label: { en: 'Platforms', my: 'Platform တွေ' }, value: 'Web, tablet, iOS & Android' },
    { label: 'Stack', value: 'Figma + React / Tailwind' },
    { label: { en: 'Languages', my: 'ဘာသာစကား' }, value: { en: 'English, Burmese', my: 'အင်္ဂလိပ်၊ မြန်မာ' } },
  ] as { label: Text; value: Text }[],
  /** Life outside work, shown in About. */
  hobbies: [
    {
      icon: 'music',
      title: { en: 'Music', my: 'ဂီတ' },
      text: { en: 'Current mood: lo-fi and jazz.', my: 'အခုတလော Mood က Lo-fi နဲ့ Jazz ပါပဲ။' },
    },
    {
      icon: 'film',
      title: { en: 'Movies', my: 'ရုပ်ရှင်' },
      text: {
        en: 'A Star Wars fan with a soft spot for indie films.',
        my: 'Star Wars ကိုကြိုက်တဲ့ ပရိသတ်တစ်ယောက်ဖြစ်ပြီး Indie ရုပ်ရှင်တွေကိုလည်း နှစ်သက်ပါတယ်။',
      },
    },
    {
      icon: 'palette',
      title: { en: 'Painting', my: 'ပန်းချီ' },
      text: { en: 'When the mood strikes, I pick up a brush and paint.', my: 'စိတ်ပါလာတဲ့အခါ ပန်းချီဆွဲပါတယ်။' },
    },
  ] as { icon: 'music' | 'film' | 'palette'; title: Localized; text: Localized }[],
  strengths: [
    {
      title: { en: 'Complex flows, made simple', my: 'ရှုပ်ထွေးတဲ့ Flow တွေကို ရိုးရှင်းအောင်' },
      text: {
        en: 'I turn complex business operations into clear, usable screens, from restaurant POS to delivery logistics, ticketing and museum management.',
        my: 'ရှုပ်ထွေးတဲ့ လုပ်ငန်းစဉ်တွေကို ရှင်းလင်းပြီး သုံးရလွယ်တဲ့ Screen တွေအဖြစ် ပြောင်းပေးပါတယ်။ စားသောက်ဆိုင် POS ကနေ Delivery Logistics၊ Ticketing နဲ့ Museum Management အထိ အတွေ့အကြုံရှိပါတယ်။',
      },
      proof: [{ label: 'Axtra POS', to: '/projects/axtra-pos' }, { label: 'Logistics' }, { label: 'E-ticket' }],
    },
    {
      title: { en: 'Responsive to the last pixel', my: 'Pixel တိုင်းအထိ Responsive' },
      text: {
        en: 'Web, desktop, tablet and phone. On Axtra POS I checked and fixed the responsive design of the entire product, directly in the code.',
        my: 'Web၊ Desktop၊ Tablet နဲ့ Phone အားလုံးအတွက် ဒီဇိုင်းလုပ်ပါတယ်။ Axtra POS မှာ Product တစ်ခုလုံးရဲ့ Responsive Design ကို Code ထဲကနေ ကိုယ်တိုင် စစ်ဆေးပြီး ပြင်ဆင်ခဲ့ပါတယ်။',
      },
      proof: [{ label: 'Axtra POS', to: '/projects/axtra-pos' }],
    },
    {
      title: { en: 'Design that ships in code', my: 'Code အထိ ရောက်တဲ့ ဒီဇိုင်း' },
      text: {
        en: 'Expert CSS, plus React, TypeScript and Tailwind. I refine UI in the codebase and build working prototypes. At OMS I built the design system directly in code, inside a React + TypeScript + Tailwind admin project.',
        my: 'CSS ကို ကျွမ်းကျင်စွာ အသုံးပြုနိုင်ပြီး React၊ TypeScript နဲ့ Tailwind လည်း သုံးပါတယ်။ Codebase ထဲမှာ UI ကို တိုက်ရိုက်ညှိပြီး အလုပ်လုပ်တဲ့ Prototype တွေ တည်ဆောက်ပါတယ်။ OMS မှာတော့ React + TypeScript + Tailwind Admin Project ထဲမှာ Design System ကို Code နဲ့ တိုက်ရိုက်တည်ဆောက်ခဲ့ပါတယ်။',
      },
      proof: [{ label: 'Design system at OMS (in code)' }, { label: 'React prototypes' }],
    },
    {
      title: { en: 'AI-accelerated prototyping', my: 'AI နဲ့ မြန်မြန် Prototyping' },
      text: {
        en: 'I use AI as a prototyping partner to go from brief to working screens fast: a full app redesign in 2 weeks, accepted by the client.',
        my: 'AI ကို Prototyping လုပ်ဖော်ကိုင်ဖက်အဖြစ် သုံးပြီး Brief ကနေ အလုပ်လုပ်တဲ့ Screen တွေအထိ မြန်မြန်ရောက်အောင် လုပ်ပါတယ်။ App တစ်ခုလုံးကို ၂ ပတ်အတွင်း Redesign လုပ်ပြီး Client က လက်ခံခဲ့ပါတယ်။',
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
