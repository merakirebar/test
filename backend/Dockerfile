# --- Stage 1: Build dependencies ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: Run app ---
FROM node:18-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
