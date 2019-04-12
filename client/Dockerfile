# Stage 1 - the build process
FROM node:8.15.0 as build-deps
RUN mkdir -p /usr/src/mockit-client
WORKDIR /usr/src/mockit-client

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

# RUN yarn build

CMD ["npm", "start"]

# Stage 2 - the production environment
# FROM nginx:1.12-alpine
# COPY --from=build-deps /usr/src/quick-rest-ui/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]