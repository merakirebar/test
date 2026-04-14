# --- Stage 1: Build React app ---
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN chmod -R 755 node_modules/.bin
COPY . .
RUN npm run build

# --- Stage 2: Serve with nginx ---
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
