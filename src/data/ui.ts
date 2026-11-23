import type { Localized } from '../i18n'

/**
 * Interface text in English and Myanmar. Only the places that matter most are
 * translated; project details, case studies and tech names stay in English.
 */
export const ui = {
  nav: {
    projects: { en: 'Projects', my: 'လက်ရာတွေ' },
    about: { en: 'About', my: 'ကျွန်တော့်အကြောင်း' },
    strengths: { en: 'Strengths', my: 'အားသာချက်တွေ' },
    experience: { en: 'Experience', my: 'အတွေ့အကြုံ' },
    skills: { en: 'Skills', my: 'ကျွမ်းကျင်မှုတွေ' },
    contact: { en: 'Contact', my: 'ဆက်သွယ်ရန်' },
  },
  hero: {
    explore: { en: 'Explore my work', my: 'လက်ရာတွေ ကြည့်ပါ' },
    downloadCv: { en: 'Download CV', my: 'CV ဒေါင်းလုဒ်လုပ်ပါ' },
  },
  sections: {
    work: { en: 'Selected Work', my: 'ရွေးချယ်ထားတဲ့ လက်ရာတွေ' },
    otherProjects: { en: 'Other projects', my: 'အခြား Project တွေ' },
    about: { en: 'About Me', my: 'ကျွန်တော့်အကြောင်း' },
    strengths: { en: 'What I Bring', my: 'ကျွန်တော် ပေးနိုင်တဲ့ အရာတွေ' },
    experience: { en: 'Experience', my: 'လုပ်ငန်း အတွေ့အကြုံ' },
    skills: { en: 'Skills & Learning', my: 'ကျွမ်းကျင်မှုနဲ့ လေ့လာမှုတွေ' },
    contact: { en: "Let's Work Together", my: 'အတူ လက်တွဲကြရအောင်' },
  },
  about: {
    codeNote: {
      en: 'I work at the intersection of design and code. I design in Figma, then prototype in React and Tailwind, so ideas can be tested early and handed off to developers without surprises.',
      my: 'ဒီဇိုင်းနဲ့ Code ကြားက ချိတ်ဆက်နေရာမှာ အလုပ်လုပ်ပါတယ်။ Figma နဲ့ ဒီဇိုင်းလုပ်ပြီး React နဲ့ Tailwind နဲ့ Prototype တည်ဆောက်ပါတယ်။ ဒါကြောင့် Idea တွေကို စောစောစမ်းသပ်နိုင်သလို Developer တွေဆီလည်း အဆင်ပြေပြေ လွှဲပေးနိုင်ပါတယ်။',
    },
    hobbies: { en: 'Outside work', my: 'အလုပ်ပြင်ပ ဝါသနာတွေ' },
    stats: { en: 'At a glance', my: 'အကျဉ်းချုပ်' },
  },
  strengths: {
    proof: { en: 'Proof:', my: 'ဥပမာ:' },
  },
  projects: {
    view: { en: 'View', my: 'ကြည့်ပါ' },
    details: { en: 'Details', my: 'အသေးစိတ် ကြည့်ပါ' },
  },
  contact: {
    intro: {
      en: "Have a product that needs untangling, or a team that needs a hands-on design lead? I'd love to hear about it.",
      my: 'ပိုကောင်းအောင် ရှင်းလင်းဖို့လိုတဲ့ Product တစ်ခု၊ ဒါမှမဟုတ် လက်တွေ့ကျကျ ဦးဆောင်ပေးမယ့် Design Lead လိုတဲ့ Team တစ်ခု ရှိနေရင် အကြောင်းလေး ပြောပြပေးပါနော်။',
    },
    sayHello: { en: 'Say hello', my: 'နှုတ်ဆက်ပါ' },
  },
  backToTop: { en: 'Back to top', my: 'အပေါ်ကို ပြန်သွားပါ' },
} satisfies Record<string, Localized | Record<string, Localized>>
