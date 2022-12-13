import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import apiClientService from './service/api-client.service'

import './assets/styles/bootstrap.scss'
import App from './pages/App';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registrieren from './pages/Registrieren';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // react-query config

(async function index() {

  await apiClientService.configureClient()

  render(
    <QueryClientProvider client={queryClient}>
      <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrieren" element={<Registrieren />} />
            <Route path="/" element={<App />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="zones" element={"zones"} />
              <Route path="map" element={"test"} />
              <Route path="help" element={"hilfeseite"} />
              <Route path="advanced" element={<Impressum />} />
              <Route path="datenschutz" element={<Datenschutz />} />
              <Route path="impressum" element={<Impressum />} />
              <Route path="settings">
                <Route path="account" element={"account einstellungen"} />
                <Route path="system" element={"system einstellungen"} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>
    </QueryClientProvider>
  )
})()

function render(element: JSX.Element) {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      {element}
    </React.StrictMode>
  );
}
