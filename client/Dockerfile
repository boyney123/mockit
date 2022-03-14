FROM node:16-alpine
RUN apk add --no-cache python3 py3-pip make g++
RUN mkdir -p /usr/src/mockit-client
WORKDIR /usr/src/mockit-client

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . ./


CMD ["npm", "start"]
