import { notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AUTH_VALIDATE_ENDPOINT } from "~/services/AuthenticationService";
import { MAIN } from "~/utils/redirections";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(AUTH_VALIDATE_ENDPOINT, { method: "GET", credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Session expired");
        return res.json();
      })
      .then(() => setLoading(false))
      .catch(() => {
        notification.warning({
          message: "Session Expired",
          description: "Your session has expired. Please log in again.",
          placement: "topRight"
        });
        navigate(MAIN);
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
