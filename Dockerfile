FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# TODO: merge nginx here and remove busybox workaround
FROM busybox AS final

WORKDIR /app

COPY --from=builder /app/build ./build

COPY --from=builder /app/server ./server