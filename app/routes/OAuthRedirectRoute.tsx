import { OAuthRedirect } from "~/pages/OAuth/OAuthRedirect";

export function meta() {
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
