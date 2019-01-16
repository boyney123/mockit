FROM node:8.15.0

RUN mkdir -p /usr/src/mockit-mock-server
WORKDIR /usr/src/mockit-mock-server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]