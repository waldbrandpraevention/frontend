FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM nginx:alpine AS final

WORKDIR /

COPY --from=builder /app/build /usr/share/nginx/html

COPY --from=builder /app/server /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]