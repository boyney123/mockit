FROM node:11.4.0-alpine

RUN mkdir -p /usr/src/mockit-routes
WORKDIR /usr/src/mockit-routes

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]