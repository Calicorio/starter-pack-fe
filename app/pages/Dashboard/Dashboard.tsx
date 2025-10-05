import { LOGOUT_ENDPOINT } from "~/services/LogoutService";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { MAIN } from "~/utils/redirections";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_ENDPOINT, {
        method: "POST",
        credentials: "include" // ✅ clear cookie via backend
      });
      navigate(MAIN);
    } catch {
      navigate(MAIN);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24
      }}
    >
      <div>Welcome to your dashboard!</div>
      <Button
        type="primary"
        danger
        onClick={handleLogout}
        style={{ width: 120 }}
      >
        Logout
      </Button>
    </div>
  );
};
