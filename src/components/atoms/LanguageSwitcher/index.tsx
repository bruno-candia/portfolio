import { useTranslation } from "react-i18next";
import "./style.css";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt-BR" ? "en-US" : "pt-BR";
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language === "pt-BR" ? "PT" : "EN";

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label={`Change language to ${
        i18n.language === "pt-BR" ? "English" : "Portuguese"
      }`}
      type="button"
    >
      <span className="language-switcher__text">{currentLang}</span>
    </button>
  );
}
