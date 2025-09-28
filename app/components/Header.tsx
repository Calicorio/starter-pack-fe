import { Layout, Select, Space } from "antd";
import type { ReactNode } from "react";
import i18n from "~/i18n";

interface HeaderProps {
  children: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px #f0f1f2",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px"
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 20, color: "#222" }}>
          StarterPack
        </div>
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
        {children}
      </Layout.Content>
    </Layout>
  );
};
