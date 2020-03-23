module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    "react"
  ],
  rules: {
    "react/prop-types": 1,
    "no-unused-vars": 1,
    "react/display-name": 1,
    "no-console": 1
  }
}