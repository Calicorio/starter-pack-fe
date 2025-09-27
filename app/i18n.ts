import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "es",
    fallbackLng: "en",
    ns: ["login"], // declare all your namespaces
    defaultNS: "login", // optional: default namespace
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json" // 👈 language + namespace
    },
    interpolation: {
      escapeValue: false
    },
    debug: true
  });

export default i18n;
