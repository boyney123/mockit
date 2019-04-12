FROM node:8.15.0

RUN mkdir -p /usr/src/mockit-server
WORKDIR /usr/src/mockit-server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]