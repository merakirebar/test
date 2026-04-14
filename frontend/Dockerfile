# --- Stage 1: Build React app ---
# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Fix permission issue
RUN chmod -R 755 node_modules

# Use npx explicitly
RUN npx vite build


# ---------- Stage 2: Nginx ----------
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
