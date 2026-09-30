FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html ./
COPY tsconfig*.json vite.config.ts ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:stable-alpine AS production-stage
# Which dataset this deployment shows, see public/data/<dataset>
ENV DATASET=epfl
COPY --from=build-stage /app/dist /usr/share/nginx/html
# nginx runs envsubst on the templates at start, so DATASET lands in config.json
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
