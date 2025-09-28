import { AuthGuard } from "~/components/AuthGuard";
import { Dashboard } from "~/pages/Dashboard/Dashboard";

export function meta() {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Your dashboard" }
  ];
}

export default function DashboardRoute() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
