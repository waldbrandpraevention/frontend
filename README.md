<h1 align="center">Waldbrandprävention Frontend</h1>
<p align="center">   
    <img width="460" height="300" src="src/assets/img/logo-v1.svg">
</p>

<div align="center">

[![Node.js CI](https://img.shields.io/github/workflow/status/waldbrandpraevention/frontend/Node.js%20CI?style=for-the-badge)](https://github.com/waldbrandpraevention/frontend/actions/workflows/node.js.yml)
![](https://img.shields.io/github/commit-activity/m/waldbrandpraevention/frontend?style=for-the-badge)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)


</div>


## Installation
<!-- > Für die Installation vom Frontend alleine: [Option 3](#option-3-frontend-mit-docker) (nicht empfohlen) -->

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Am Einfachsten ist die Installation mit Docker (compose). Nachfolgend mehrere Möglichkeiten.

---
### Option 1: All-in-One 👑

![](https://img.shields.io/badge/-frontend-red?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![](https://img.shields.io/badge/-backend-blue?style=for-the-badge)
![](https://img.shields.io/badge/-+-black?style=for-the-badge)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

Die Images für Front- und Backend können lokal erstellt werden mit der jeweils aktuellen Version des Front- bzw. Backend Repos oder auch aus Docker Hub. Die komplette Anwendung wird mit [docker compose](https://docs.docker.com/compose/) und [nginx](https://www.nginx.org/) als Reverse Proxy ausgeführt.

#### Quickstart 🚀 

Zunächst muss [docker compose](https://docs.docker.com/compose/install/) installiert sein. Ist standardmäßig bei *Docker Desktop* der Fall.

1. In einem leeren Ordner eine `docker-compose.yaml` Datei erstellen mit folgendem Inhalt:

```yaml
version: '3'
name: Waldbrandpraevention

services:
  # React
  frontend:
    build:
      context: https://github.com/waldbrandpraevention/frontend.git#main
    volumes:
      - frontend-build:/app/build
      - frontend-server-conf:/app/server/conf

  # API
  backend:
    build:      
      context: https://github.com/waldbrandpraevention/backend.git#main
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
##### Docker Hub 
Für fertige Images aus [Docker Hub](https://hub.docker.com/orgs/waldbrandpraevention/repositories) stattdessen `waldbrandpraevention/frontend` bzw. `waldbrandpraevention/backend` verwenden. Die Images sind möglicherweise nicht immer aktuell.

```diff
...
services:  
  frontend:
+    image: waldbrandpraevention/frontend
-    build:
-      context: https://github.com/waldbrandpraevention/frontend.git#main
...
  backend:
+    image: waldbrandpraevention/backend
-    build:      
-      context: https://github.com/waldbrandpraevention/backend.git#main
...
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
Standardmäßig wird [Mailhog]() mitinstalliert um den E-Mail Versand lokal testen zu können. Um stattdessen einen externen Mail Server zu verwenden, die `docker-compose.yaml` folgendermaßen anpassen:
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
> <ins>***nicht***</ins> empfohlen, weil Updates möglicherweise das Datenbankschema oder Serverkonfiguration ändern müssen und so unerwünschte Probleme auftreten können.
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
### Option 2: Reverse Proxy 🛡️

---
// Work In Progress: folgendes ignorieren //

---

Diese Version eignet sich, falls die Anwendung in einen vorhandenen Web Server oder eine Reverse Proxy wie z.B. [nginx](https://www.nginx.org/), [Apache](https://httpd.apache.org/) oder [traefik](https://traefik.io/traefik/) eingebunden werden soll. 


1. Zunächst dem [Quickstart](#quickstart-) folgen und folgendermaßen anpassen
<!-- ```diff
...
services:
...
  # API
  backend:
    build:      
      context: https://github.com/waldbrandpraevention/backend.git#main
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --root-path /api
-   expose: 
-     - 8000
+   ports:
+     - 8090:8000
...
   # Reverse Proxy
-  nginx:
-    image: nginx:alpine
-    ports:
-      - 8080:80 
-    depends_on:
-      - frontend
-      - backend
-    volumes:
-      - frontend-server-conf:/etc/nginx/conf.d
-      - frontend-build:/usr/share/nginx/html
... -->
```
2. Container starten
```
docker compose up -d
```
3. Reverse Proxy konfigurieren

Die Konfiguration ist abhängig von der verwendeten Software. Nachfolgend Beispiel Konfigurationen für **Apache** (Debian) und nginx mit bereits vorhandenem [Let's Encrypt](https://letsencrypt.org/de/) SSL Zertifikat.

#### ![Apache](https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white)

<!--  - 5.1. vHost erstellen `touch /var/www/sites-available/wb.conf` mit folgender Config 
 -->
```apache 
<VirtualHost *:80>
    ServerName domain.tld

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/wb

    ProxyPass / http://127.0.0.1:6667/
    ProxyPassReverse / http://127.0.0.1:6667/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

<VirtualHost *:443>
    ServerName domain.tld

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/wb

    ProxyPass / http://127.0.0.1:6667/
    ProxyPassReverse / http://127.0.0.1:6667/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    SSLEngine on

    SSLCertificateFile /etc/letsencrypt/live/domain.tld/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/domain.tld/privkey.pem
    Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
```

![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)


```nginx
upstream backend {
    server localhost:8000;
}

server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }

    location /api/ {
        proxy_pass http://backend/;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

```

6.
Im Browser https://domain.tld (mit SSL) oder http://domain.tld öffnen.

### Option 3: Frontend mit Docker
> Nur Frontend + nginx


1. GitHub Repo clonen
```
git clone https://github.com/waldbrandpraevention/frontend.git
```
2. Docker Image erstellen
```
cd frontend && docker build -f Dockerfile.withNginx -t wb-frontend .
```
3. Docker Container starten
```
docker run --rm -it -p 8080:80 wb-frontend
```
4. Frontend läuft auf http://localhost:8080


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


