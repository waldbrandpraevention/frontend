<h1 align="center">Waldbrandprävention Frontend</h1>
<p align="center">   
    <img width="460" height="300" src="src/assets/img/logo-v1.svg">
</p>

<div align="center">

[![Node.js CI](https://img.shields.io/github/workflow/status/waldbrandpraevention/frontend/Node.js%20CI?style=for-the-badge&label=ci)](https://github.com/waldbrandpraevention/frontend/actions/workflows/node.js.yml)
![](https://img.shields.io/github/workflow/status/waldbrandpraevention/frontend/Docker?style=for-the-badge&label=docker)
![](https://img.shields.io/github/commit-activity/m/waldbrandpraevention/frontend?style=for-the-badge&label=commits)
![](https://img.shields.io/docker/image-size/waldbrandpraevention/frontend?style=for-the-badge&label=image&color=orange)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)


</div>


## Installation
<!-- > Für die Installation vom Frontend alleine: [Option 3](#option-3-frontend-mit-docker) (nicht empfohlen) -->

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Am Einfachsten ist die Installation mit Docker (compose). 

---
### All-in-One 👑

![](https://img.shields.io/badge/-frontend-red?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![](https://img.shields.io/badge/-backend-blue?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![](https://img.shields.io/badge/-Mail*-yellow?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)


Die Images für Front- und Backend werden automatisch mit der jeweils aktuellen Version des Front- bzw. Backend Repos gebaut und auf Docker Hub hochgeladen. Die Anwendung wird mit [docker compose](https://docs.docker.com/compose/) und [nginx](https://www.nginx.org/) als Reverse Proxy ausgeführt.

#### Quickstart 🚀 

Zunächst muss [docker compose](https://docs.docker.com/compose/install/) installiert sein. Ist standardmäßig bei *Docker Desktop* der Fall.

1. In einem leeren Ordner eine `docker-compose.yaml` Datei erstellen mit folgendem Inhalt:

```yaml
version: '3'
name: Waldbrandpraevention

services:
  # React
  frontend:
    image: waldbrandpraevention/frontend
    volumes:
      - frontend-build:/app/build
      - frontend-server-conf:/app/server/conf

  # API
  backend:
    image: waldbrandpraevention/backend
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --root-path /api
    expose:
      - 8000

  # Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - 8080:80 
    depends_on:
      - frontend
      - backend
    volumes:
      - frontend-server-conf:/etc/nginx/conf.d
      - frontend-build:/usr/share/nginx/html

  # Mail
  mailhog:
    image: mailhog/mailhog
    logging:
      driver: 'none' # disable saving logs
    ports:
      - 1025:1025 # smtp server
      - 8025:8025 # web ui

volumes:
  frontend-build:
  frontend-server-conf:

```

2. Im gleichen Ordner folgenden Befehl ausführen
```
docker compose up 
```
Falls die Anwendung im Hintergrund ausgeführt werden soll, kann `-d` an den Befehl angehängt werden.
| Komponente | URL |
|---|---|
| Frontend | http://localhost:8080 |
| API | http://localhost:8080/api/ |
| API Dokumentation | http://localhost:8080/api/docs |
| [Mail](#e-mail-) | http://localhost:8025 |

#### Config 🛠️
 Einstellungen können als Environmentvariablen in der `docker-compose.yaml` angepasst werden.
| Name | Beschreibung | Werte | Standard
|---|---|---|---|
| REACT_APP_API_URL | API URL | `string` | `/api/` |
| MAIL_SMTP_HOST |  |  | |
| MAIL_SMTP_ | todo |  | |

Um die Anwendung ohne explizite Angabe des Ports (http://127.0.0.1) zu verwenden oder generell den Port ändern, kann die Datei so geändert werden
```diff
...
nginx:
  image: nginx:alpine
  ports:
-   - 8080:80 
+   - 80:80 
  depends_on:
    - frontend
    - backend
  volumes:
    - frontend-server-conf:/etc/nginx/conf.d
    - frontend-build:/usr/share/nginx/html
...
```
#### E-Mail 📨
Standardmäßig wird [Mailhog](https://github.com/mailhog/MailHog) mitinstalliert um den E-Mail Versand lokal testen zu können. Um stattdessen einen externen Mail Server zu verwenden, die `docker-compose.yaml` folgendermaßen anpassen:
```diff
...
 backend:
   build:      
     context: https://github.com/waldbrandpraevention/backend.git
   command: uvicorn main:app --host 0.0.0.0 --port 8000 --root-path /api
   ports:
     - 8000:8000
+  environment:
+    - MAIL_SMTP_HOST=
+    todo 
...
services:
...
-mailhog:
-  image: mailhog/mailhog
-  logging:
-    driver: 'none' # disable saving logs
-  ports:
-    - 1025:1025 # smtp server
-    - 8025:8025 # web ui
...
```


#### Updates 🪄

So wird die Anwendung aktualisiert:

1. Container stoppen und entfernen. 

> **Achtung!** Alle Daten in der Datenbank werden dabei gelöscht.
```
docker compose down -v
```
*oder* falls die Datenbank erhalten bleiben soll:
> aktuell <ins>***nicht***</ins> empfohlen, weil Updates möglicherweise das Datenbankschema oder Serverkonfiguration ändern müssen und so unerwünschte Probleme auftreten können.
```
docker compose down
```

2. Container aktualisieren & starten
```
docker compose pull && docker compose up -d
```
#### FAQ ❓
- > `waldbrandpraevention-frontend-1 exited with code 0`?
  - Das ist so gewollt. Die einzige Aufgabe dieses Containers ist es die React-App zu builden und zusammen mit weiteren Dateien an den `nginx` Container zu übergeben.

---


## Development

1. GitHub Repo clonen
```
git clone https://github.com/waldbrandpraevention/frontend.git
```

2. Dependencies installieren
```
npm install
```

3. `npm start` zum Starten.<br>
`npm test` zum Testen.<br>
`npm run build` zum Erstellen.


