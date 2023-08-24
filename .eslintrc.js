module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": "off",
    "linebreak-style": "off",
    quotes: "off",
    "no-unused-vars": "off",
    "no-console": "off",
  },
};
