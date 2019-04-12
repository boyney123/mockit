const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

const delayMiddleware = require("./middlewares/delay");
const chaosMonkeyMiddleware = require("./middlewares/chaos-monkey");

const data = fs.readJsonSync(path.resolve(__dirname, "../configuration/routes.json"));
const { routes, settings: { features: { cors: corsFeature } = {} } = {} } = data;

app.use(delayMiddleware);
app.use(chaosMonkeyMiddleware);

if (corsFeature) {
  app.use(cors());
}

// app.use((req, res, next) => {
//   const { delay = 0 } = findRoute(req.url) || {};

//   if (delay > 0) {
//     return setTimeout(next, delay);
//   }

//   next();
// });

routes.forEach(route => {
  const { route: path, statusCode, payload, disabled = false, httpMethod = "GET" } = route;

  const method = httpMethod.toLowerCase();

  if (!disabled) {
    app[method](path, (req, res) => {
      console.log("Request for route", route);
      res.status(statusCode).send(payload);
    });
  }
});

server = app.listen(port, () => console.log(`MockIt app listening on port ${port}!`));
