import type { UserRole } from "./enums";

export interface User {
  id: string;
  name: string;
  email: string | null;
  role: UserRole;
  created_at: string;
}
