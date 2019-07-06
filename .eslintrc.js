module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  parser: "babel-eslint",
  env: {
    jest: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": "off"
  },
  globals: {
    fetch: false
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  settings: {
    "import/resolver": {
      "babel-module": {}
    }
  }
};
