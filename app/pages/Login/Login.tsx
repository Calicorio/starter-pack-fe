import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Alert,
  Row,
  Col
} from "antd";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { LOGIN_ENDPOINT } from "~/services/AuthenticationService";
import { useNavigate, useLocation } from "react-router";
import { Header } from "~/components/Header";
import { DASHBOARD } from "~/utils/redirections";

export const Login: React.FC = () => {
  const { t } = useTranslation("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Google redirect with token in query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Save token in cookie
      document.cookie = `token=${token}; path=/; SameSite=Strict`;

      // Redirect to dashboard
      navigate(DASHBOARD, { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = (values: { username: string; password: string }) => {
    setLoading(true);
    setMessage(null);

    fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.username,
        password: values.password
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error(t("failed"));
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          // Store token in cookie
          document.cookie = `token=${data.token}; path=/; SameSite=Strict`;
          setMessage(t("success"));
          setTimeout(() => {
            navigate(DASHBOARD);
          }, 500);
        }
      })
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Header>
      <Row
        style={{ width: "100%", minHeight: "100vh" }}
        align="middle"
        justify="center"
      >
        <Col
          xs={22}
          sm={16}
          md={12}
          lg={8}
          xl={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              padding: 32,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #f0f1f2"
            }}
          >
            <Typography.Title
              level={2}
              style={{ textAlign: "center", marginBottom: 32 }}
            >
              {t("title")}
            </Typography.Title>
            {message && (
              <Alert
                style={{ marginBottom: 16 }}
                message={message}
                type={message === t("success") ? "success" : "error"}
                showIcon
              />
            )}
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              layout="vertical"
            >
              <Form.Item
                label={t("username")}
                name="username"
                rules={[{ required: true, message: t("usernameRequired") }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={t("password")}
                name="password"
                rules={[{ required: true, message: t("passwordRequired") }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>{t("rememberMe")}</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  {t("submit")}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  block
                  icon={
                    <img
                      src="/google-icon.svg"
                      alt="Google"
                      style={{ width: 20, marginRight: 8 }}
                    />
                  }
                  onClick={() =>
                    (window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`)
                  }
                >
                  Sign in with Google
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Header>
  );
};
