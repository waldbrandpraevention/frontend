import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/index.css';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from 'react-pro-sidebar';
import apiClientService from './service/api-client.service'


import './assets/styles/bootstrap.scss'
import App from './pages/App';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import TileDemo from './pages/TileDemo';
import Login from './pages/Login';
import Registrieren from './pages/Registrieren';


async function index() {
  render(<Registrieren />)

  await apiClientService.configureClient()

  render(<App />)
}

function render(element: JSX.Element) {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrieren" element={<Registrieren />} />
            <Route path="/" element={<App />}>
              <Route path="tiledemo" element={<TileDemo />} />

              <Route path="dashboard" element={<TileDemo />} />
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
    </React.StrictMode>
  );
}

index()

