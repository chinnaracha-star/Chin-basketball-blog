import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.jsx";
import { AdminArticlesProvider } from "./context/AdminArticlesProvider.jsx";
import { AdminCategoriesProvider } from "./context/AdminCategoriesProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminArticlesProvider>
          <AdminCategoriesProvider>
            <App />
          </AdminCategoriesProvider>
        </AdminArticlesProvider>
      </AuthProvider>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  </StrictMode>,
);
