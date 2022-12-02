# for production only
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]