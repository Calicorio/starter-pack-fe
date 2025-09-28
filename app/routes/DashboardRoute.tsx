import { AuthGuard } from "~/components/AuthGuard";

export function meta() {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Your dashboard" }
  ];
}

export default function DashboardRoute() {
  return (
    <AuthGuard>
      <div>Welcome to your dashboard!</div>
    </AuthGuard>
  );
}
