FROM node:11.4.0-alpine

RUN mkdir -p /usr/src/mockit-server
WORKDIR /usr/src/mockit-server

COPY package.json .
COPY package-lock.json .
COPY .npmrc .

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "start"]