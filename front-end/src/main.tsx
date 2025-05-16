import { createRoot } from "react-dom/client";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { StrictMode } from "react";
import Products from "@pages/products/products";
import NavBar from "@lib/components/navbar/navbar";
import { AuthProvider } from "@lib/providers/authProvider";
import Categories from "@pages/categories/categories";
import { SnackbarProvider } from "notistack";
import Comparison from "@pages/comparison/comparison";
import { RequireLogin } from "@lib/guards/requireLogin";
import Comparisons from "@pages/comparisons/comparisons";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <AuthProvider>
            <Routes>
              <Route element={<NavBar />}>
                <Route path="/" element={<Categories />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/comparativas" element={<Comparisons />} />
                <Route path="/comparativas/new" element={<Comparison />} />
                <Route
                  path="/comparativas/:id"
                  element={
                    <RequireLogin>
                      <Comparison />
                    </RequireLogin>
                  }
                />
              </Route>
              <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
          </AuthProvider>
        </SnackbarProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>
);
