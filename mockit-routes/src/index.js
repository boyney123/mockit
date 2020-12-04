const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const cors = require('cors');
const querystring = require('querystring');

const port = process.env.PORT || 3000;

const delayMiddleware = require('./middlewares/delay');
const chaosMonkeyMiddleware = require('./middlewares/chaos-monkey');
const basicAuth = require('./middlewares/basic-auth');

const data = fs.readJsonSync(
  path.resolve(__dirname, '../configuration/routes.json')
);
const {
  routes,
  settings: { features: { cors: corsFeature } = {} } = {}
} = data;

app.use(basicAuth);
app.use(delayMiddleware);
app.use(chaosMonkeyMiddleware);

if (corsFeature) {
  app.use(cors());
}

app.disable('x-powered-by');

routes.forEach((route) => {
  const {
    route: path,
    statusCode,
    payload,
    disabled = false,
    httpMethod = 'GET',
    headers = []
  } = route;

  const method = httpMethod.toLowerCase();

  if (!disabled) {
    let param = null, pathURL = path;
    let paths = path.split("?");
    if (Object.keys(paths).length > 1) {
      pathURL = paths[0];
      param = paths[1];
    }

    app[method](pathURL, (req, res) => {
      let code = statusCode;
      let body = payload;

      if (param != null) {
        let params = param.split("&");
        if (Object.keys(req.query).length != params.length) {
          code = 404;
          body = `Cannot ${method.toUpperCase()} ${pathURL}?${querystring.stringify(req.query)}`;
        }

        params.forEach((p) => {
          let q = p.split("=");
          if (req.query[q[0]] != q[1]) {
            code = 404;
            body = `Cannot ${method.toUpperCase()} ${pathURL}?${querystring.stringify(req.query)}`;
            return;
          }
        });
      }

      headers.forEach(({ header, value } = {}) => {
        res.set(header, value);
      });
      res.status(code).send(body);
    });
  }
});

if (process.env.ENV !== 'test') {
  server = app.listen(port, () =>
    console.log(`MockIt app listening on port ${port}!`)
  );
}

module.exports = app;
