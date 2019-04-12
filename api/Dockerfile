FROM node:8.15.0

RUN mkdir -p /usr/src/mockit-api
WORKDIR /usr/src/mockit-api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]