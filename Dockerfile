# Stage 1: Compile and Build angular codebase
FROM node:12.22.10-slim as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./src /app/src
COPY ./angular.json /app/
COPY ./protractor.conf.js /app/
COPY ./typings.json /app/
RUN npm run build -- --output-path=./dist/out

# Stage 2: Serve app with nginx server
FROM nginx:1.23.0
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/out/ /usr/share/nginx/html
