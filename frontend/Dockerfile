FROM node:16.16.0-slim

WORKDIR /usr/src/app

RUN npm install -g serve

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "serve", "-s", "build" ]
