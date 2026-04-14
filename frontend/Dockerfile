# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy only dependency files
COPY package*.json ./

# Clean install
RUN npm install

# Copy remaining files
COPY . .

# Build using npm script (correct for your package.json)
RUN npm run build


# ---------- Stage 2: Nginx ----------
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
