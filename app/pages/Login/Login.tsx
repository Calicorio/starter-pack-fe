import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Alert,
  Select,
  Layout,
  Row,
  Col,
  Space
} from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "~/i18n";

export const Login: React.FC = () => {
  const { t } = useTranslation("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: { username: string; password: string }) => {
    setLoading(true);
    setMessage(null);

    fetch("/api/auth/login", {
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
        // login(data.token); // Save token in context & localStorage
        setMessage(t("success"));
        // Optionally redirect here
      })
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px #f0f1f2",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 24px"
        }}
      >
        <Space>
          <Select
            value={i18n.language}
            onChange={(lng) => i18n.changeLanguage(lng)}
            style={{ width: 120, background: "#f0f0f0" }}
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Español" }
            ]}
            variant="borderless"
          />
        </Space>
      </Layout.Header>
      <Layout.Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          minHeight: 0,
          flex: 1
        }}
      >
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
              </Form>
            </div>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};
