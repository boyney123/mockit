FROM node:11.4.0-alpine
RUN mkdir -p /usr/src/mockit-client
WORKDIR /usr/src/mockit-client

COPY package.json .
COPY package-lock.json .

RUN apk add --no-cache python2 g++ make
RUN npm ci

COPY . ./


CMD ["npm", "start"]
