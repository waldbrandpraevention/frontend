import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/index.css';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from 'react-pro-sidebar';

import './assets/styles/bootstrap.scss'
import App from './pages/App';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import TileDemo from './pages/TileDemo';
import Login from './pages/Login';
import Registrieren from './pages/Registrieren';
import Zones from './pages/Zonen';
import AdminAnalyse from './pages/AdminAnalyse';
import Analyse from './pages/Analyse';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrieren" element={<Registrieren />} />
          <Route path="/" element={<App />}>
            <Route path="tiledemo" element={<TileDemo />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="zones" element={<Zones />} />
            <Route path="map" element={<Map />} />
            <Route path="help" element={"hilfeseite"} />
            <Route path="user" element={<Analyse />} />
            <Route path="advanced" element={<AdminAnalyse />} />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
