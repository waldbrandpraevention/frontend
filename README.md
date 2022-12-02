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

## Deployment mit Docker

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)


1. GitHub Repo clonen
```
git clone https://github.com/waldbrandpraevention/frontend.git
```
2. Docker Image erstellen
```
cd frontend && docker build -t wb-frontend .
```
3. Docker Container starten
```
docker run --rm -it -p 8080:80 wb-frontend
```
4. Frontend läuft auf http://localhost:8080

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


