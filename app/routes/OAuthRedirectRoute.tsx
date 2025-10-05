import { OAuthRedirect } from "~/pages/OAuth/OAuthRedirect";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OAuth Redirect" },
    {
      name: "description",
      content: "Redirecting after successful Google login"
    }
  ];
}

export default function OAuthRedirectRoute() {
  return <OAuthRedirect />;
}
