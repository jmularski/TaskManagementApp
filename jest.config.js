module.exports = {
  preset: "react-native",
  testResultsProcessor: "jest-junit",
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!((jest-)?react-native|@react-native-community/async-storage|react-clone-referenced-element|react-navigation-redux-helpers|react-test-renderer|static-container|react-navigation|@?react-navigation|react-navigation-redux-helpers|sentry-expo|native-base))",
  ],
  testPathIgnorePatterns: [
    "e2e",
    "node_modules"
  ],
};