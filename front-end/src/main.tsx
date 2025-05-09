import { createRoot } from "react-dom/client";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import { StrictMode } from "react";
import Products from "@pages/products/products";
import NavBar from "@lib/components/navbar/navbar";
import { AuthProvider } from "@lib/providers/authProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <AuthProvider>
          <Routes>
            <Route element={<NavBar />}>
              <Route path="/" element={<Products />} />
            </Route>
          </Routes>
        </AuthProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>
);
