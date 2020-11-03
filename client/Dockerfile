FROM node:11.4.0-alpine
RUN mkdir -p /usr/src/mockit-client
WORKDIR /usr/src/mockit-client

COPY package.json .
COPY package-lock.json .
COPY .npmrc .

RUN npm ci

COPY . ./


CMD ["npm", "start"]
