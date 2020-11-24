module.exports = {
  jest: function (config) {
    config.testMatch.push('<rootDir>/src/**/{spec,test}.{js,jsx,ts,tsx}');
    return config;
  }
};
