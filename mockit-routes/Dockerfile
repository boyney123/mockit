FROM node:8.15.0

RUN mkdir -p /usr/src/mockit-routes
WORKDIR /usr/src/mockit-routes

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]