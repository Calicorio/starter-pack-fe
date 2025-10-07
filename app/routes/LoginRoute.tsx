import { Login } from "~/pages/Login/Login";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to StarterPack!" }
  ];
}

export default function LoginRoute() {
  return <Login />;
}
