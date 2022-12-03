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

## Deployment

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
### Option 1: All-in-One

![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

Anleitung zum lokalem builden der Images und deployen der kompletten Anwendung mit [docker compose](https://docs.docker.com/compose/) und [nginx](https://www.nginx.org/) als Reverse Proxy.

1. Frontend Repo clonen
```
git clone https://github.com/waldbrandpraevention/frontend.git
```
2. Backend Repo clonen
```
git clone https://github.com/waldbrandpraevention/backend.git
```
3. Im Ordner `docker-compose.yaml` erstellen mit folgendem Inhalt
```yaml
version: '3'

services:
  # React
  frontend:
    build:
      context: ./frontend
    volumes:
      - frontend-build:/app/build

  # API
  backend:
    build:
      context: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --root-path /api

  # Reverse Proxy
  nginx:
    image: nginx:latest
    ports:
      - 8080:8000
    depends_on:
      - frontend
      - backend
    volumes:
      - frontend-build:/usr/share/nginx/html

volumes:
  frontend-build:

```
Der Ordner sollte jetzt so aussehen
```
.
├── frontend/
├── backend/
└── docker-compose.yaml
```

4. 
```
docker compose up -d
```
5. Auf http://localhost:

### Option 2: Reverse Proxy




Anleitung zum lokalem builden der Images und deployen der kompletten Anwendung mit [docker compose](https://docs.docker.com/compose/). Diese Version eignet sich falls die Anwendung in einen vorhandenen Web Server oder eine Reverse Proxy wie z.B. [nginx](https://www.nginx.org/), [Apache](https://httpd.apache.org/) oder [traefik](https://traefik.io/traefik/) eingebunden werden soll. 

1. Frontend Repo clonen
```
git clone https://github.com/waldbrandpraevention/frontend.git
```
2. Backend Repo clonen
```
git clone https://github.com/waldbrandpraevention/backend.git
```
3. Im Ordner eine `docker-compose.yaml` Datei erstellen mit folgendem Inhalt
```yaml
version: '3'

services:
  # React
  frontend:
    build:
      context: ./frontend
    volumes:
      - frontend-build:/app/build

  # API
  backend:
    build:
      context: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --root-path /api

volumes:
  frontend-build:

```
4. 
```
docker compose up -d
```
5. Reverse Proxy konfigurieren

Die Konfiguration ist abhängig von der verwendeten Software. Hier ein Beispiel für Apache  mit bereits vorhandenem [Let's Encrypt](https://letsencrypt.org/de/) SSL Zertifikat.
```apache 
<VirtualHost *:80>
    ServerName domain.tld

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/test

    ProxyPass / http://127.0.0.1:6667/
    ProxyPassReverse / http://127.0.0.1:6667/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

<VirtualHost *:443>
    ServerName domain.tld

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/test

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
6.
Im Browser https://domain.tld (mit SSL) oder http://domain.tld öffnen.

<!-- ### Reverse proxy


```apache
<VirtualHost *:80>
        ServerName <domain>

        DocumentRoot /var/www/test

        ProxyPass / http://127.0.0.1:6667/
        ProxyPassReverse / http://127.0.0.1:6667/

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

<VirtualHost *:443>
    ServerName <domain>

    DocumentRoot /var/www/test

    ProxyPass / http://127.0.0.1:6667/
    ProxyPassReverse / http://127.0.0.1:6667/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    SSLEngine on

    SSLCertificateFile /etc/letsencrypt/live/bp.adriansoftware.de/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/bp.adriansoftware.de/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost><VirtualHost *:80>
        ServerName app.bp.adriansoftware.de

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/test

        ProxyPass / http://127.0.0.1:6667/
        ProxyPassReverse / http://127.0.0.1:6667/

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

#RewriteEngine on
#RewriteCond %{SERVER_NAME} =app.bp.adriansoftware.de
#RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<VirtualHost *:443>
    ServerName app.bp.adriansoftware.de

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/test

    ProxyPass / http://127.0.0.1:6667/
    ProxyPassReverse / http://127.0.0.1:6667/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    SSLEngine on

    SSLCertificateFile /etc/letsencrypt/live/bp.adriansoftware.de/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/bp.adriansoftware.de/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
``` -->

## Development

`npm start` zum Starten.

`npm test` zum Testen.

`npm run build` zum Erstellen.


