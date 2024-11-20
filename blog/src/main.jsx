import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./UserContext.jsx";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#969aff",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <UserContext>
          <App />
        </UserContext>
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
