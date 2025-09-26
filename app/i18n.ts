import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    login: {
      title: "Login",
      username: "Username",
      password: "Password",
      rememberMe: "Remember me",
      submit: "Log in",
      usernameRequired: "Please input your username!",
      passwordRequired: "Please input your password!",
      failed: "Login failed. Please check your credentials.",
      success: "Login successful! Redirecting..."
    }
    // You can add more namespaces here, e.g.:
    // dashboard: { ... }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  ns: ["login"], // List all your namespaces here
  defaultNS: "login", // Set the default namespace
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
