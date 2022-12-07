# for production only
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build