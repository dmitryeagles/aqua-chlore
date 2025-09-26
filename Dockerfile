FROM docker.io/node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./conf ./conf
COPY ./index.html ./index.html
COPY *.js ./
COPY *.ts ./
COPY *.json ./

ARG API_URI
ENV VITE_APP_API_URL=$API_URI

RUN npm run build

FROM docker.io/nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]