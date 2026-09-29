import type { Localized } from '../i18n'

/**
 * Interface text in English and Myanmar. Only the places that matter most are
 * translated; project details, case studies and tech names stay in English.
 */
export const ui = {
  nav: {
    projects: { en: 'Projects', my: 'လက်ရာများ' },
    about: { en: 'About', my: 'ကျွန်တော့်အကြောင်း' },
    strengths: { en: 'Strengths', my: 'အားသာချက်များ' },
    experience: { en: 'Experience', my: 'အတွေ့အကြုံ' },
    skills: { en: 'Skills', my: 'ကျွမ်းကျင်မှု' },
    contact: { en: 'Contact', my: 'ဆက်သွယ်ရန်' },
  },
  hero: {
    explore: { en: 'Explore my works', my: 'လက်ရာများ ကြည့်ရန်' },
    downloadCv: { en: 'Download CV', my: 'CV ဒေါင်းလုဒ်' },
  },
  sections: {
    work: { en: 'Selected Work', my: 'ရွေးချယ်ထားသော လက်ရာများ' },
    otherProjects: { en: 'Other projects', my: 'အခြား ပရောဂျက်များ' },
    about: { en: 'About Me', my: 'ကျွန်တော့်အကြောင်း' },
    strengths: { en: 'What I Bring', my: 'ကျွန်တော် ပေးစွမ်းနိုင်သည်များ' },
    experience: { en: 'Experience', my: 'လုပ်ငန်း အတွေ့အကြုံ' },
    skills: { en: 'Skills & Learning', my: 'ကျွမ်းကျင်မှုနှင့် သင်ယူမှု' },
    contact: { en: "Let's Work Together", my: 'အတူတကွ လက်တွဲကြရအောင်' },
  },
  about: {
    codeNote: {
      en: 'I work at the intersection of design and code. I design in Figma, then prototype in React and Tailwind, so ideas can be tested early and handed off to developers without surprises.',
      my: 'ဒီဇိုင်းနဲ့ code နှစ်ခုလုံးကို ပေါင်းကူးပြီး အလုပ်လုပ်ပါတယ်။ Figma မှာ ဒီဇိုင်းလုပ်ပြီး React နဲ့ Tailwind နဲ့ prototype တည်ဆောက်တာကြောင့် idea တွေကို စောစောစမ်းသပ်နိုင်ပြီး developer တွေဆီ အခက်အခဲမရှိ လွှဲပြောင်းပေးနိုင်ပါတယ်။',
    },
    hobbies: { en: 'Side quests', my: 'ဝါသနာများ' },
    stats: { en: 'Character stats', my: 'ကိုယ်ရေး အချက်အလက်' },
  },
  strengths: {
    proof: { en: 'Proof:', my: 'သက်သေ:' },
  },
  projects: {
    view: { en: 'View', my: 'ကြည့်ရန်' },
    details: { en: 'Details', my: 'အသေးစိတ်' },
  },
  contact: {
    intro: {
      en: "Have a product that needs untangling, or a team that needs a hands-on design lead? I'd love to hear about it.",
      my: 'ရှင်းလင်းဖို့ လိုနေတဲ့ product တစ်ခု၊ ဒါမှမဟုတ် လက်တွေ့ကျကျ ဦးဆောင်ပေးမယ့် design lead လိုနေတဲ့ team တစ်ခု ရှိပါသလား။ ဆက်သွယ်ပြောပြပေးပါ။',
    },
    sayHello: { en: 'Say hello', my: 'ဆက်သွယ်ရန်' },
  },
  loading: { en: 'Loading', my: 'ဖွင့်နေသည်' },
  soundOn: { en: 'Sound on?', my: 'အသံ ဖွင့်မလား?' },
  nowPlaying: { en: 'Now playing · lofi', my: 'သီချင်း ဖွင့်နေပါတယ်' },
  backToTop: { en: 'Back to top', my: 'အပေါ်သို့' },
} satisfies Record<string, Localized | Record<string, Localized>>
