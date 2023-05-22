FROM node:16.16.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --omit=dev
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:prod" ]
