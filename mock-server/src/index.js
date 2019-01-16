const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const app = express();
const chokidar = require("chokidar");

const data = fs.readJsonSync(path.resolve(__dirname, "../configuration/routes.json"));
const { routes } = data;

const port = process.env.PORT || 3000;

const findRoute = path => {
  return routes.find(({ route } = {}) => {
    return route === path;
  });
};

app.use((req, res, next) => {
  const { delay = 0 } = findRoute(req.url) || {};

  if (delay > 0) {
    return setTimeout(next, delay);
  }

  next();
});

routes.forEach(route => {
  app.get(route.route, (req, res) => {
    res.send(route.payload);
  });
});

server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
