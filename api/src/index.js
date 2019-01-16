const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

app.use(cors());

const config = fs.readJsonSync(path.resolve(__dirname, "../configuration/routes.json"));

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.put("/routes", (req, res) => {
  const payload = req.body;

  console.log(config);

  if (payload.id) {
    const routeToUpdateIndex = config.routes.findIndex(route => {
      console.log(payload.id, route.id);
      return route.id === payload.id;
    });

    //mutate for now....
    config.routes[routeToUpdateIndex] = payload;

    console.log(routeToUpdateIndex, config);

    fs.writeJsonSync(path.resolve(__dirname, "../configuration/routes.json"), config, {
      spaces: 4
    });
  } else {
    // missing id, invalid
    res.send(400);
  }

  res.send(201);
});

server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/**
 * Check if any of the routes already exist, if they do then return an error (400 or something with error message)
 *
 * Can I use GraphQL for this stuff? Not sure if its required.....
 *
 *
 * - End point to get all routes
 * - End point to remove a route
 * - end point to add a route
 *
 */
