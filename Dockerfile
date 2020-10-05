# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
#ARG VUE_APP_BACKEND_URL                       
#ENV VUE_APP_GA=$VUE_APP_GA
COPY .env.local ./
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]