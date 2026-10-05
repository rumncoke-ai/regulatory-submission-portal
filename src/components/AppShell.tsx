import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LanguageContext, type Language } from "../LanguageContext";

export default function AppShell() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <>
        <a className="skip-link" href="#main-content">
          {language === "fr"
            ? "Passer au contenu principal"
            : "Skip to main content"}
        </a>
        <header className="site-header">
          <div className="container header-inner">
            <div>
              <span className="wordmark">
                {language === "fr"
                  ? "Services réglementaires nationaux"
                  : "National Regulatory Services"}
              </span>
              <span className="site-title">
                {language === "fr" ? "Portail des soumissions" : "Submission Portal"}
              </span>
            </div>
            <div className="header-controls">
              <nav
                aria-label={
                  language === "fr" ? "Navigation principale" : "Primary navigation"
                }
              >
                <NavLink to="/" end>
                  {language === "fr" ? "Soumissions" : "Submissions"}
                </NavLink>
                <NavLink to="/submissions/new">
                  {language === "fr" ? "Nouvelle soumission" : "New submission"}
                </NavLink>
              </nav>
              <div className="language-switch" role="group" aria-label="Language / Langue">
                <button
                  type="button"
                  aria-pressed={language === "en"}
                  onClick={() => setLanguage("en")}
                >
                  English
                </button>
                <button
                  type="button"
                  aria-pressed={language === "fr"}
                  onClick={() => setLanguage("fr")}
                >
                  Français
                </button>
              </div>
            </div>
          </div>
        </header>
        <main id="main-content" className="container main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="site-footer">
          <div className="container">
            {language === "fr"
              ? "Application de démonstration. Les organisations, personnes, soumissions et décisions présentées sont fictives et ne représentent aucun organisme gouvernemental."
              : "Demonstration application. All organizations, people, submissions, and decisions shown are invented and do not represent any government organization."}
          </div>
        </footer>
      </>
    </LanguageContext.Provider>
  );
}
