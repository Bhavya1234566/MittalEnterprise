import { useEffect, useState } from "react";
import "./SitePreferences.css";

const LANGUAGE_KEY = "mittal-language";
const VALID_LANGUAGES = ["en", "hi", "pa"];

const clearGoogleTranslateCookie = () => {
  // Google Translate can leave a /googtrans cookie that forces Hindi on the
  // next visit even when our selector says English. Remove stale translation
  // state when the saved preference is English.
  const host = window.location.hostname;
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${host}`;
  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + host;
};

const SitePreferences = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("mittal-theme") === "dark");
  // English is the default on a fresh visit. Keep a language only when the
  // visitor explicitly selected a supported language in this browser.
  const [language, setLanguage] = useState(() => {
    // One-time migration: reset older builds that persisted an accidental
    // Hindi auto-translation. After this, an explicit user choice is kept.
    if (localStorage.getItem("mittal-language-default-v2") !== "1") {
      localStorage.setItem(LANGUAGE_KEY, "en");
      localStorage.setItem("mittal-language-default-v2", "1");
      return "en";
    }
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return VALID_LANGUAGES.includes(saved) ? saved : "en";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("mittal-dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("mittal-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const savedLanguage = VALID_LANGUAGES.includes(localStorage.getItem(LANGUAGE_KEY))
      ? localStorage.getItem(LANGUAGE_KEY)
      : "en";
    if (savedLanguage === "en") clearGoogleTranslateCookie();

    const applyLanguage = () => {
      const combo = document.querySelector(".goog-te-combo");
      if (!combo) return false;
      combo.value = savedLanguage;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    };

    const initTranslator = () => {
      if (!window.google?.translate?.TranslateElement) return;
      const mount = document.getElementById("mittal-google-translate");
      if (mount && !mount.dataset.initialized) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,hi,pa", autoDisplay: false },
          "mittal-google-translate"
        );
        mount.dataset.initialized = "true";
      }
      // The Google selector is rendered asynchronously. Re-apply our own
      // language after it exists so its browser cookie cannot override it.
      let attempts = 0;
      const timer = window.setInterval(() => {
        attempts += 1;
        if (applyLanguage() || attempts >= 20) window.clearInterval(timer);
      }, 250);
    };

    window.googleTranslateElementInit = initTranslator;
    if (!document.getElementById("mittal-google-translate-script")) {
      const script = document.createElement("script");
      script.id = "mittal-google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      initTranslator();
    }
  }, []);

  const changeLanguage = (value) => {
    if (!VALID_LANGUAGES.includes(value)) return;
    setLanguage(value);
    localStorage.setItem(LANGUAGE_KEY, value);
    if (value === "en") clearGoogleTranslateCookie();

    const apply = () => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = value;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      }
    };
    apply();
    window.setTimeout(apply, 350);
    window.setTimeout(apply, 1000);
  };

  return (
    <div className="site-preferences" aria-label="Display and language settings">
      <button type="button" onClick={() => setDark((value) => !value)} aria-label="Toggle dark mode" title="Toggle dark mode">
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
      <select aria-label="Choose language" value={language} onChange={(event) => changeLanguage(event.target.value)}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
      </select>
      <div id="mittal-google-translate" className="google-translate-hidden" />
    </div>
  );
};

export default SitePreferences;
