import { Login } from "~/pages/Login/Login";
import type { Route } from "./+types/LoginRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to StarterPack!" }
  ];
}

export default function LoginRoute() {
  return <Login />;
}
