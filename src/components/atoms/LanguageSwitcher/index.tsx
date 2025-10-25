import { useTranslation } from "react-i18next";
import brazilFlag from "@/assets/brazil-flag.svg";
import unitedStatesFlag from "@/assets/eua-flag.svg";
import "./style.css";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt-BR" ? "en-US" : "pt-BR";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label={`Change language to ${
        i18n.language === "pt-BR" ? "English" : "Portuguese"
      }`}
      type="button"
    >
      <img
        className="language-switcher__icon"
        src={i18n.language === "pt-BR" ? brazilFlag : unitedStatesFlag}
        alt={i18n.language === "pt-BR" ? "Brazil" : "United States"}
      />
    </button>
  );
}
