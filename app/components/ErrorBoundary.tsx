import { Result, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import type { ResultStatusType } from "antd/es/result";
import { useNavigate } from "react-router";

interface ErrorBoundaryComponentProps {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  stack?: string;
  onReload?: () => void;
}

export const ErrorBoundaryComponent: React.FC<ErrorBoundaryComponentProps> = ({
  status = "error",
  title = "Oops!",
  subTitle = "An unexpected error occurred.",
  stack
}) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate(MAIN);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={handleLoginRedirect}
            key="login"
          >
            Go to Login
          </Button>
        ]}
      >
        {stack && (
          <pre
            style={{
              background: "#f6f6f6",
              color: "#c41d7f",
              padding: 16,
              borderRadius: 8,
              marginTop: 24,
              maxWidth: 600,
              overflowX: "auto"
            }}
          >
            <code>{stack}</code>
          </pre>
        )}
      </Result>
    </div>
  );
};
