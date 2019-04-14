const fs = require("fs-extra");
const path = require("path");
const auth = require("basic-auth");
const data = fs.readJsonSync(path.resolve(__dirname, "../../../configuration/routes.json"));
const { settings } = data;
const { features: { authentication } = {} } = settings;

const isAuthenticated = (name, pass) => {
  const { username, password } = authentication;
  return name === username && pass === password;
};

module.exports = (req, res, next) => {
  if (!authentication) {
    return next();
  }

  const { name, pass } = auth(req) || {};

  console.log("Auth check");
  if ((!name && !pass) || !isAuthenticated(name, pass)) {
    console.log("Auth yes");
    return res.status(401).send("Access denied");
  }

  next();
};
