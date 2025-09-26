import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: {
        title: "Login",
        username: "Username",
        password: "Password",
        rememberMe: "Remember me",
        submit: "Log in",
        usernameRequired: "Please input your username!",
        passwordRequired: "Please input your password!"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
