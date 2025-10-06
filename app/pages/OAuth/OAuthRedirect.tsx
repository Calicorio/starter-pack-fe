import { useEffect } from "react";
import { useNavigate } from "react-router";
import { DASHBOARD, MAIN } from "~/utils/redirections";
import { Row, Col, Card, Spin, Typography, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Header } from "~/components/Header";
import { AUTH_VALIDATE_ENDPOINT } from "~/services/AuthenticationService";
import { useAuthStore } from "~/store/useAuthStore";

const { Text } = Typography;

export const OAuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // ✅ Function declared outside of useEffect
  const checkAuth = async () => {
    try {
      const res = await fetch(AUTH_VALIDATE_ENDPOINT, {
        method: "GET",
        credentials: "include"
      });

      if (res.ok) {
        notification.success({
          message: "Logged in",
          description: "You have successfully logged in via Google.",
          placement: "topRight"
        });
        navigate(DASHBOARD);
      } else {
        notification.warning({
          message: "Login failed",
          description: "Unable to log in. Please try again.",
          placement: "topRight"
        });
        navigate(MAIN);
      }
    } catch {
      notification.error({
        message: "Error",
        description: "An unexpected error occurred. Please try again.",
        placement: "topRight"
      });
      navigate(MAIN);
    }
  };

  // ✅ useEffect only triggers the method once
  useEffect(() => {
    checkAuth();
  }, [navigate]);

  return (
    <Header>
      <Row
        style={{ width: "100%", minHeight: "100vh" }}
        align="middle"
        justify="center"
      >
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: 12,
              boxShadow: "0 2px 8px #f0f1f2",
              padding: 24
            }}
          >
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
              size="large"
              style={{ marginBottom: 16 }}
            />
            <Text style={{ fontSize: 18, display: "block" }}>
              Redirecting... Please wait while we log you in.
            </Text>
          </Card>
        </Col>
      </Row>
    </Header>
  );
};
