import "../../i18n";

import { Form, Input, Button, Checkbox, Typography } from "antd";
import type React from "react";
import { useTranslation } from "react-i18next";

export const Login: React.FC = () => {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    // Handle login logic here
    console.log("Success:", values);
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
          {t("login.title")}
        </Typography.Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={t("login.username")}
            name="username"
            rules={[{ required: true, message: t("login.usernameRequired") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("login.password")}
            name="password"
            rules={[{ required: true, message: t("login.passwordRequired") }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{t("login.rememberMe")}</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("login.submit")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
