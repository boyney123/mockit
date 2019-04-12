const fs = require("fs-extra");
const path = require("path");
const data = fs.readJsonSync(path.resolve(__dirname, "../../../configuration/routes.json"));
const { routes } = data;

const findRoute = path => {
  return routes.find(({ route } = {}) => {
    return route === path;
  });
};

module.exports = (req, res, next) => {
  const { delay = 0 } = findRoute(req.url) || {};

  if (delay > 0) {
    return setTimeout(next, delay);
  }

  next();
};
