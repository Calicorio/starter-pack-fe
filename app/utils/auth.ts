import type { User } from "~/models/user";
import { AUTH_VALIDATE_ENDPOINT } from "~/services/AuthenticationService";

export async function getUserFromSession(): Promise<User | null> {
  // SPA: Read token from document.cookie
  const cookieHeader = typeof document !== "undefined" ? document.cookie : "";
  const token = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const res = await fetch(AUTH_VALIDATE_ENDPOINT, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
