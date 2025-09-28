import { LOGOUT_ENDPOINT } from "~/services/LogoutService";
import { Button } from "antd";
import { useNavigate } from "react-router";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_ENDPOINT, { method: "POST", credentials: "include" });
      // Remove token cookie
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      navigate("/");
    } catch (err) {
      // Optionally handle error
      navigate("/");
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
