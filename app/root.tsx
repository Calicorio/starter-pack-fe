import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";
import type { Route } from "./+types/root";
import { ErrorBoundaryComponent } from "./components/ErrorBoundary";
import type { ResultStatusType } from "antd/es/result"; // <-- Add this import

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status: ResultStatusType = "error";
  let title = "Oops!";
  let subTitle = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status === 404 ? "404" : "error";
    title = error.status === 404 ? "404" : "Error";
    subTitle =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || subTitle;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    subTitle = error.message;
    stack = error.stack;
  }

  return (
    <ErrorBoundaryComponent
      status={status}
      title={title}
      subTitle={subTitle}
      stack={stack}
    />
  );
}
