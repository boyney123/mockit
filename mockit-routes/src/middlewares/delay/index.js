const fs = require('fs-extra');
const path = require('path');
const data = fs.readJsonSync(
  path.resolve(__dirname, '../../../configuration/routes.json')
);
const { routes } = data;

const checkRouteParamsPath = (path, relativePath) => {
  const pathArray = path.split('/');
  const relPathArray = relativePath.split('/');
  if (pathArray.length === relPathArray.length) {
    pathArray.forEach((param, i) => {
      if (param.startsWith(':')) {
        delete pathArray[i];
        delete relPathArray[i];
      }
    });

    return pathArray.join('') === relPathArray.join('');
  }

  return false;
};

const findRoute = (path, method) => {

  const match = routes.find(({ route } = {}) => {
    return route === path;
  });

  if (match) {
    return match;
  }

  // route has params
  return routes.find(({ route, httpMethod } = {}) => {
    // check method
    if (httpMethod && method.toLowerCase() === httpMethod.toLowerCase()) {
      return checkRouteParamsPath(route, path);
    }

    return false;
  });
};

module.exports = (req, res, next) => {
  const { delay = 0 } = findRoute(req.url, req.method) || {};

  if (delay > 0) {
    return setTimeout(next, delay);
  }

  next();
};
