import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  sr: {
    translation: {
      hero: {
        title: "Ad astra.",
        subtitle: "Ka zvezdama.",
        dynamic: [
          "Gradim sa jasnoćom.",
          "Pišem kod koji govori.",
          "Dizajniram sa svrhom.",
          "Nikada slučajno. Uvek precizno."
        ]
      },
      about: {
        title: "O meni",
        text:
`{
  "ime": "Boris Janković",
  "status": "Student softverskog i informacionog inženjerstva (4. godina)",
  "interesovanja": [
    "Veštačka inteligencija",
    "Automatizacija procesa"
  ],
  "tehnologije": [
    "React", "Tailwind", "PHP", "Java", "Kotlin", "Python", "MySQL"
  ],
  "karakteristike": [
    "Logičko razmišljanje",
    "Brzina",
    "Samostalnost"
  ],
  "vizija": "Razvijam softver koji ima praktičnu vrednost i olakšava svakodnevicu ljudima."
}`
      },
      projects: "Projekti",
      contact: "Kontakt",
      footer: "© Sva prava zadržana.",
      button: "Pošalji poruku"
    }
  },
  en: {
    translation: {
      hero: {
        title: "Ad astra.",
        subtitle: "To the stars.",
        dynamic: [
          "Building with clarity.",
          "Writing code that speaks.",
          "Designing for purpose.",
          "Never random. Always precise."
        ]
      },
      about: {
        title: "About Me",
        text:
`{
  "name": "Boris Janković",
  "status": "Software and Information Engineering student (4th year)",
  "interests": [
    "Artificial Intelligence",
    "Process Automation"
  ],
  "technologies": [
    "React", "Tailwind", "PHP", "Java", "Kotlin", "Python", "MySQL"
  ],
  "traits": [
    "Logical thinking",
    "Speed",
    "Independence"
  ],
  "vision": "I develop software that has practical value and simplifies everyday life for people."
}`
      },
      projects: "Projects",
      contact: "Contact",
      footer: "© All rights reserved.",
      button: "Send Message"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'sr',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
