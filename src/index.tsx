import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import apiClientService from "./service/api-client.service";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/styles/bootstrap.scss";
import App from "./pages/App";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import Login from "./pages/Login";
import Registrieren from "./pages/Registrieren";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Account from "./pages/Account";
import Zones from "./pages/Zones";
import { AuthProvider } from "./service/auth";
import AuthRoute from "./components/routes/AuthRoute";
import GuestRoute from "./components/routes/GuestRoute";
import NotFound from "./pages/NotFound";
import RoleRoute from "./components/routes/RoleRoute";
import { ToastContainer } from 'react-toastify';
import Loading from "./components/Loading";
import Weather from "./pages/Weather";
import ForgotPassword from "./pages/ForgotPassword";
import Incidents from "./pages/Incidents";
import Alerts from "./pages/Alerts";

const Advanced = lazy(() => import("./pages/Advanced"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Maps = lazy(() => import("./pages/Maps"));
const Users = lazy(() => import("./pages/Users"));

const queryClient = new QueryClient(); // react-query config

apiClientService.configureClient();

render(
  <QueryClientProvider client={queryClient}>
    <ProSidebarProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Registrieren /></GuestRoute>} />
            <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
            <Route path="/" element={<AuthRoute><App /></AuthRoute>}>
              <Route path="*" element={<NotFound />}></Route>
              <Route index element={<Navigate to={"/dashboard"} replace />}></Route>
              <Route path="dashboard" element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
              <Route path="zones" element={<Zones />} />
              <Route path="map" element={<Suspense fallback={<Loading />}><Maps /></Suspense>} />
              <Route path="weather" element={<Weather />} />
              <Route path="help" element={"hilfeseite"} />
              <Route path="advanced" element={<RoleRoute><Suspense fallback={<Loading />}><Advanced /></Suspense></RoleRoute>} />
              <Route path="alerts" element={<Alerts/>} />
              <Route path="incidents" element={<RoleRoute><Incidents/></RoleRoute>} />
              <Route path="datenschutz" element={<Datenschutz />} />
              <Route path="impressum" element={<Impressum />} />
              <Route path="settings">
                <Route path="account" element={<Account />} />
                <Route path="users" element={<RoleRoute><Suspense fallback={<Loading />}><Users /></Suspense></RoleRoute>} />
                <Route path="system" element={<RoleRoute>"system einstellungen"</RoleRoute>} />
                <Route path="alerts" element={"benachrichtigungen"} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </BrowserRouter>
    </ProSidebarProvider>
  </QueryClientProvider>
);

function render(element: JSX.Element) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>{element}</React.StrictMode>
  );
}
