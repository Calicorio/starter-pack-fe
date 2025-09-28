import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AUTH_VALIDATE_ENDPOINT } from "~/services/AuthenticationService";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      navigate("/"); // redirect to login if no token
      return;
    }

    fetch(AUTH_VALIDATE_ENDPOINT, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => setLoading(false))
      .catch(() => {
        navigate("/"); // invalid token → login
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
