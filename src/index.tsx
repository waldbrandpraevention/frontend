import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import apiClientService from "./service/api-client.service";

import "./assets/styles/bootstrap.scss";
import App from "./pages/App";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import Dashboard from "./pages/Dashboard";
import Maps from "./pages/Maps";
import Login from "./pages/Login";
import Registrieren from "./pages/Registrieren";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Account from "./pages/Account";
import Zones from "./pages/Zones";
import { AuthProvider } from "./service/auth";
import AuthRoute from "./components/routes/AuthRoute";
import GuestRoute from "./components/routes/GuestRoute";
import Advanced from "./pages/Advanced";
import NotFound from "./pages/NotFound";
import RoleRoute from "./components/routes/RoleRoute";

const queryClient = new QueryClient(); // react-query config

(async function index() {
  await apiClientService.configureClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ProSidebarProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<NotFound />}></Route>
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/register" element={<GuestRoute><Registrieren /></GuestRoute>} />
              <Route path="/" element={<AuthRoute><App /></AuthRoute>}>
                <Route index element={<Navigate to={"/dashboard"} replace />}></Route>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="zones" element={<Zones />} />
                <Route path="map" element={<Maps />} />
                <Route path="help" element={"hilfeseite"} />
                <Route path="advanced" element={<RoleRoute><Advanced /></RoleRoute>} />
                <Route path="datenschutz" element={<Datenschutz />} />
                <Route path="impressum" element={<Impressum />} />
                <Route path="settings">
                  <Route path="account" element={<Account />} />
                  <Route path="system" element={<RoleRoute>"system einstellungen"</RoleRoute>} />
                  <Route path="alerts" element={"benachrichtigungen"} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ProSidebarProvider>
    </QueryClientProvider>
  );
})();

function render(element: JSX.Element) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>{element}</React.StrictMode>
  );
}
