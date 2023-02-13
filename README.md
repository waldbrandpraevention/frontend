<h1 align="center">Waldbrandprävention</h1>
<p align="center">
    <img width="320" height="160" src="src/assets/img/logo-v1.svg">
</p>

<div align="center">

[![Node.js CI](https://img.shields.io/github/actions/workflow/status/waldbrandpraevention/frontend/node.js.yml?branch=main&style=for-the-badge&label=ci)](https://github.com/waldbrandpraevention/frontend/actions/workflows/node.js.yml)
![](https://img.shields.io/github/actions/workflow/status/waldbrandpraevention/frontend/cypress.yml?branch=main&style=for-the-badge&label=e2e)
[![](https://img.shields.io/github/actions/workflow/status/waldbrandpraevention/frontend/docker-image.yml?branch=main&style=for-the-badge&label=docker)](https://hub.docker.com/r/waldbrandpraevention/frontend/tags)
[![](https://img.shields.io/codecov/c/gh/waldbrandpraevention/frontend?style=for-the-badge)](https://app.codecov.io/gh/waldbrandpraevention/frontend)
![](https://img.shields.io/github/commit-activity/m/waldbrandpraevention/frontend?style=for-the-badge&label=commits)
[![](https://img.shields.io/docker/image-size/waldbrandpraevention/frontend?style=for-the-badge&label=image&color=orange)](https://hub.docker.com/r/waldbrandpraevention/frontend/tags)
[![](https://img.shields.io/codefactor/grade/github/waldbrandpraevention/frontend?style=for-the-badge)](https://www.codefactor.io/repository/github/waldbrandpraevention/frontend/issues/main)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

</div>

![](https://bp.adriansoftware.de/media/x3.png)

<div align="center">

![wind-demo1](https://user-images.githubusercontent.com/19362349/216485268-1cc98986-22ca-4bd1-a645-49c7fc1214df.gif)

</div>

![](https://bp.adriansoftware.de/media/x4a.png) ![](https://bp.adriansoftware.de/media/architektur.png)

## Inhalt

- [Features ✨](#features)
- [Demo](#demo)
- [Installation](#installation)
  - [1-Line 🚀](#one-line)
  - [Quickstart 🚀](#quickstart)
  - [Konfiguration ⚙️](#konfiguration)
    - [Port ⚓](#port)
    - [E-Mail 📨](#e-mail)
    - [Windkarte ☁️](#windkarte)
  - [Updates 🔁](#updates)
  - [Reverse Proxy 🛡️](#reverse-proxy)
  - [FAQ ❓](#faq)
- [Development](#development)
  - [Projekt Setup](#projekt-setup)
  * [E2E Testing](#e2e-testing)
    - [Code Coverage](#code-coverage)
  - [Themes](#themes)
  - [Kacheln](#kacheln)

## Features

- Sehr gute
  **[Performance](https://bp.adriansoftware.de/media/performance1.gif)** auch
  bei riesigen Datensätzen.
- Gemeindegrenzen als **Zonen** einfach hinzufügen und entfernen
- **[Drohnen](https://bp.adriansoftware.de/media/performance2.gif)** mit
  **animierten** Routen
- Alle Komponenten
  **[containerisiert](https://hub.docker.com/u/waldbrandpraevention)**
- **Advanced** Analyse Seite mit Drohnenbildern und KI-Einschätzungen
- **Benachrichtigungen** bei Brandereignissen
- **Viele** Karten: **OpenStreetMap**, **Topografie**, **Satelliten** und mehr
- **Feuerwehrkarte** mit Position von **Feuerwehrwachen** und **Hydranten**
- aktuelle **Wetterdaten** und **Vorhersagen** vom deutschen Wetterdienst
- animierte **Windkarte** mit dazugehörigem
  [Windserver](https://github.com/waldbrandpraevention/wind-js-server)
- **Authentifizierung** mit Rollenverteilung (Benutzer und Administrator)
- Administration mit **Organisations-** und **Usermanagement**
- **[E-Mail](#e-mail)** Verifizierung
- **Simulation** der Drohnen und Events.
- Frei **anpassbares** Design mit vielen **[Themes](#themes)**
- Komplett **modulares [Kachellayout](#kacheln)**
- **[E2E](#e2e-testing)**-Testing

## Demo

[kiwa.tech](https://kiwa.tech)

E-Mail: `admin@kiwa.tech` Passwort: `adminkiwa`

## Dokumentation

[kiwadocs.adriansoftware.de](https://kiwadocs.adriansoftware.de)

## Installation

<!-- > Für die Installation vom Frontend alleine: [Option 3](#option-3-frontend-mit-docker) (nicht empfohlen) -->

<!-- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) -->

Am Einfachsten ist die Installation mit Docker (compose).

<!-- ### All-in-One 👑 -->

<!--

![](https://img.shields.io/badge/-frontend-red?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![](https://img.shields.io/badge/-backend-blue?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![](https://img.shields.io/badge/-Mail*-yellow?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
-->

Die Images für Front- und Backend werden automatisch mit der jeweils aktuellen
Version des Front- bzw. Backend Repos gebaut und auf Docker Hub hochgeladen.
Alternativ können auch die jeweiligen `Dockerfile`s genutzt werden um die Images
manuell zu erstellen. Die Anwendung wird mit
[docker compose](https://docs.docker.com/compose/) und
[nginx](https://www.nginx.org/) als Reverse Proxy ausgeführt.

---

### One-Line

Für eine schnelle Demo kann einfach folgender Befehl genutzt werden. Alle
erstellten Container & Volumes werden automatisch bereinigt.

```bash
curl -fsSL https://raw.githubusercontent.com/waldbrandpraevention/frontend/main/install.sh | bash -
```

Auf [localhost:8080](http://localhost:8080) mit `admin@kiwa.tech` und
`adminkiwa` anmelden.

[Installationsskript](/install.sh)

---

#### Quickstart

Zunächst muss [docker compose](https://docs.docker.com/compose/install/)
installiert sein. Ist standardmäßig bei _Docker Desktop_ der Fall.

1. In einem leeren Ordner eine `docker-compose.yml` Datei erstellen mit
   folgendem Inhalt:

```yml
version: '3'
name: Waldbrandpraevention

services:
  # React
  frontend:
    image: waldbrandpraevention/frontend
    ports:
      - 8080:80

  # API
  backend:
    image: waldbrandpraevention/backend
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --root-path /api
    environment:
      - ADMIN_MAIL=admin@kiwa.tech 
      - ADMIN_PASSWORD=adminkiwa
      - ADMIN_ORGANIZATION=KIWA
      - DB_PATH=testing.db
      - DB_BACKUP_PATH=backuptest.db
      - DEMO_LONG=12.68895149
      - DEMO_LAT=52.07454738
      - GEOJSON_PATH=/database/zone_data.geojson
      - DEMO_DISTRICT=Landkreis Potsdam-Mittelmark
      # - SMTP_HOST=mail.domain.tld
      # - SMTP_USER=
      # - SMTP_PASSWORD=
      # - SMTP_PORT=25
      # - SMTP_SENDER=no-reply@domain.tld

  # Mail Testserver (optional, nur für lokale Demo ohne vorhandenem Mailserver)
  mailhog:
    image: mailhog/mailhog
    ports:
      - 1025:1025 # smtp server
      - 8025:8025 # web ui
```

2. Im gleichen Ordner folgenden Befehl ausführen

```
docker compose up
```

Falls die Anwendung im Hintergrund ausgeführt werden soll, kann `-d` an den
Befehl angehängt werden.

| Komponente                  | URL                            |
| --------------------------- | ------------------------------ |
| Frontend                    | http://localhost:8080          |
| API                         | http://localhost:8080/api/     |
| API Dokumentation           | http://localhost:8080/api/docs |
| [Mail](#e-mail-) (optional) | http://localhost:8025          |

Sie können sich nun mit den in `ADMIN_MAIL` und `ADMIN_PASSWORD` gesetzten
Zugangsdaten anmelden. Diese sollten nach erfolgreichem Login auf jeden Fall
geändert werden.

### Konfiguration

#### Port

Einstellungen können als Environmentvariablen in der `docker-compose.yml`
angepasst werden.

Um den Port der Anwendung zu ändern, kann die obige Datei so geändert werden

```diff
...
frontend:
  image: waldbrandpraevention/frontend
  ports:
-   - 8080:80 
+   - 1234:80
...
```

#### E-Mail

Um den E-Mail Versand lokal testen zu können, wird
[Mailhog](https://github.com/mailhog/MailHog) mitinstalliert. Dieser dient nur
für Demozwecke und muss später durch einen vorhandenen Mailserver ausgetauscht
werden. Daher die `docker-compose.yml` folgendermaßen anpassen:

```diff
services:
 backend:
    image: waldbrandpraevention/backend
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --root-path /api
    environment:
      - ADMIN_MAIL=admin@kiwa.tech 
      - ADMIN_PASSWORD=adminkiwa
      - ADMIN_ORGANIZATION=KIWA
    expose:
      - 8000
   environment:
      - ...
+     - SMTP_HOST=domain.tld
+     - SMTP_USER=
+     - SMTP_PASSWORD=
+     - SMTP_PORT=25
+     - SMTP_SENDER=no-reply@domain.tld

-mailhog:
-  image: mailhog/mailhog
-  logging:
-    driver: 'none' # disable saving logs
-  ports:
-    - 1025:1025 # smtp server
-    - 8025:8025 # web ui
```

#### Windkarte

Die Windkarte basiert auf
[leaflet-velocity](https://github.com/onaci/leaflet-velocity) und benötigt
Winddaten im [GRIB2](https://en.wikipedia.org/wiki/GRIB)-JSON Format.

Um die Daten der Windkarte zu laden lässt sich einfach ein [Wind Server](https://github.com/waldbrandpraevention/wind-js-server) aufsetzen, welcher stets aktuelle Winddaten vom Wetterdienst abruft. 

Deployment und weitere Informationen dazu im Repo
[waldbrandpraevention/wind-js-server](https://github.com/waldbrandpraevention/wind-js-server)

Im Projekt wird eine Instanz (https://wind.bp.adriansoftware.de) von
diesem Server verwendet.

Die Server URL kann in der `.env.production` bzw. `.env.development` unter
`REACT_APP_WIND_DATA` geändert werden.

<!-- ```
docker run --rm -p 6712:7000 -it waldbrandpraevention/wind
``` -->

#### Updates

So wird die Anwendung aktualisiert:

1. Container stoppen und entfernen.

> **Achtung!** Alle Daten in der Datenbank werden dabei gelöscht.

```
docker compose down -v
```

_oder_ falls die Datenbank erhalten bleiben soll:

> aktuell <ins> _**nicht**_</ins> empfohlen, weil Updates möglicherweise das
> Datenbankschema oder Serverkonfiguration ändern müssen und so unerwünschte
> Probleme auftreten können.

```
docker compose down
```

2. Container aktualisieren & starten

```
docker compose pull && docker compose up -d
```

#### Reverse Proxy

Um die Anwendung hinter einer Reverse Proxy zu verwenden kann für Apache
folgende vHost Konfiguration verwendet werden:

```apache
<VirtualHost *:80>
    ServerName domain.tld

    # Alle HTTP Anfragen zu HTTPS weiterleiten
    RewriteEngine on
    RewriteCond %{SERVER_NAME} =domain.tld
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<VirtualHost *:443>
    ServerName domain.tld
    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    ProxyPreserveHost on

    ErrorLog ${APACHE_LOG_DIR}/wb-error.log
    CustomLog ${APACHE_LOG_DIR}/wb-access.log combined

    # Für Let's Encrypt Zertifikate
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/domain.tld/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/domain.tld/privkey.pem
    Include /etc/letsencrypt/options-ssl-apache.conf

    Header always set Strict-Transport-Security "max-age=31536000"
    Header always set X-Frame-Options "deny"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</VirtualHost>
```

## Development

#### Projekt Setup

1. GitHub Repo clonen

```
git clone https://github.com/waldbrandpraevention/frontend.git
```

2. Dependencies installieren

```
npm install
```

3. `npm start` zum Starten.<br> `npm run cypress` zum Testen.<br>
   `npm run build` zum Erstellen.

### E2E Testing

1. `npm start` (Wichtig!)

2. `npm run cypress`

3. `E2E Testing` auswählen

4. Browser auswählen. Empfohlen: Chrome.

5. Ein Spec auswählen zum Testen.

Mehr Infos: https://cypress.io

#### Code Coverage

1. `npm run cypress:run`

2. Report in `coverage/lcov-report/index.html`

### Themes

Um ein Theme zu erstellen folgendermaßen vorgehen:

1. `src/service/stores.ts`

```ts
export const themes: { black: Theme, /* ... */, custom: Theme } = {
  black: {
    background: "#FAFAFA",
    headerBackground: "#FAFAFA",
    sidebarBackground: "#000000",
    sidebarActive: "#383838",
    sidebarHover: "#5c5c5c",
    sidebarText: "#FFFFFF",
  }
  /* ... */
  custom: {
    background: "#ecf8f0",
    headerBackground: "#ecf8f0",
    sidebarBackground: "#009688",
    sidebarActive: "#4DB6AC",
    sidebarHover: "#80CBC4",
    sidebarText: "#FFFFFF",
  }
}
```

2. `src/components/tiles/account/ColorCustomizer.tsx`

```tsx
// fast am Ende der Datei:
<InputGroup>
  <Button
    style={{ border: "none", color: "white", background: "#000000" }}
    onClick={() => colors.setColor({ ...themes.black })}
  >
    <TbColorSwatch /> Schwarz
  </Button>
  /* ... */
  <Button
    style={{ border: "none", color: "white", background: "#ecf8f0" }}
    onClick={() => colors.setColor({ ...themes.custom })}
  >
    <TbColorSwatch /> Mein Custom Theme
  </Button>
</InputGroup>;
```

### Kacheln

Das Kachellayout ist komplett modular aufgebaut.

So kann eine Kachel erstellt werden:

1. Im `src/components/tiles` eine Komponente erstellen, welche als direktem
   Child ein `<Tile>...</Tile>` returned.
2. Auf der gewünschten Seite `src/pages/MyPage.tsx`

```ts
import MyTile from "../components/tiles/MyTile";
const TilesLayout = lazy(() => import("../components/TilesLayout"));

const MyPage = () => {
  const { defaultTiles, defaultLayout } = tiles([
    {
      el: <MyTile />,
      id: "mytile",
      name: "My Tile",
      main: { x: 0, y: 0, w: 8, h: 3 },
      mobile: { x: 0, y: 0, w: 24, h: 3 },
    },
    // more tiles...
  ]);

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <TilesLayout
          layoutId="dashboard"
          defaultLayout={defaultLayout}
          defaultTiles={defaultTiles}
        />
      </Suspense>
    </div>
  );
};

export default MyPage;
```

Referenz:

```ts
export type TileElement = {
  /**
   * tile component in `components/tiles`. must return a `<Tile>...</Tile>`
   */
  el: ReactElement;
  /**
   * unique id per `<TilesLayout />`
   */
  id: string;
  /**
   * display name
   */
  name: string;
  /**
   * whether tile is enabled by default
   */
  enabled?: boolean;
  /**
   * don't show tile while in edit mode. show placeholder instead
   */
  noEditmode?: boolean;
};
```

```ts
export type TileLayouts = {
  /**
   * layout for desktop and tablet breakpoint
   */
  main: ReactGridLayout.Layout[];
  /**
   * layout for mobile breakpoint
   */
  mobile: ReactGridLayout.Layout[];
};
```
