const fs = require("fs-extra");
const path = require("path");

const getConfig = async () => {
  return await fs.readJson(path.resolve(__dirname, "../../configuration/routes.json"));
};

const writeConfig = async config => {
  fs.writeJson(path.resolve(__dirname, "../../configuration/routes.json"), config, {
    spaces: 4
  });
};

module.exports = {
  getConfig,
  writeConfig
};
