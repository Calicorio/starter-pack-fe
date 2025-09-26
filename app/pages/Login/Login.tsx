import "../../i18n";

import { Form, Input, Button, Checkbox, Typography, Alert } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: 320,
          padding: 24,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px #f0f1f2"
        }}
      >
        <Typography.Title level={2} style={{ textAlign: "center" }}>
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
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t("submit")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
