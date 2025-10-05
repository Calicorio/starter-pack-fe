import { LOGOUT_ENDPOINT } from "~/services/LogoutService";
import { Button, notification } from "antd";
import { useNavigate } from "react-router";
import { MAIN } from "~/utils/redirections";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(LOGOUT_ENDPOINT, {
        method: "POST",
        credentials: "include" // ✅ clear cookie via backend
      });

      if (res.ok) {
        notification.success({
          message: "Logged out",
          description: "You have been successfully logged out.",
          placement: "topRight"
        });
      } else {
        notification.warning({
          message: "Logout failed",
          description: "Unable to log you out. Please try again.",
          placement: "topRight"
        });
      }
    } catch {
      notification.error({
        message: "Error",
        description: "An unexpected error occurred during logout.",
        placement: "topRight"
      });
    } finally {
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
