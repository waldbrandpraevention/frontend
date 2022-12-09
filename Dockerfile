FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM node:18-alpine AS final

WORKDIR /app

COPY --from=builder /app/build .