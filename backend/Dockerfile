FROM node:16.16.0 as base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base as unit_test
RUN npm ci
COPY . .
RUN npm run test:forceExit

FROM base as e2e_test
RUN npm ci
COPY . .
RUN npm run test:e2e

FROM base as prod
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:prod" ]
