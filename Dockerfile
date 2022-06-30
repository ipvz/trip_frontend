# Stage 1: Compile and Build angular codebase
FROM node:18-slim as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 2: Serve app with nginx server
FROM nginx:1.23.0
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
EXPOSE 80
