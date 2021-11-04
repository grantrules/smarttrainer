FROM node:lts as build-stage



WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx
COPY --from=build-stage /app/build /usr/share/nginx/html
