FROM node:16.16.0-alpine as base
# WORKDIR /usr/src/app
WORKDIR /workspace
COPY package*.json ./

FROM base as prod
RUN npm ci --omit=dev
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:prod" ]
