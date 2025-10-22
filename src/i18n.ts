import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptBR from "./locales/pt-BR/translation.json";
import enUS from "./locales/en-US/translation.json";

const resources = {
  "pt-BR": {
    translation: ptBR,
  },
  "en-US": {
    translation: enUS,
  },
};

const getInitialLanguage = (): string => {
  const stored = localStorage.getItem("i18nextLng");
  if (stored && (stored === "pt-BR" || stored === "en-US")) {
    return stored;
  }

  const browserLang = navigator.language;
  if (browserLang.startsWith("pt")) {
    return "pt-BR";
  }
  return "en-US";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "pt-BR",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
  document.documentElement.lang = lng;
});

export default i18n;
