module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      "module:metro-react-native-babel-preset",
      "module:react-native-dotenv"
    ],
    plugins: [
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      [
        "module-resolver",
        {
          alias: {
            "@root": "./src",
            "@store": "./src/store",
            "@services": "./src/services",
            "@utils": "./src/utils",
            "@helpers": "./src/helpers"
          }
        }
      ]
    ]
  };
};
