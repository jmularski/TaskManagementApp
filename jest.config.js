module.exports = {
  preset: 'jest-expo',
  transform: {
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!((jest-)?react-native|react-clone-referenced-element|react-test-renderer|static-container|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|sentry-expo|native-base))",
  ],
  testPathIgnorePatterns: [
    "e2e",
    "node_modules"
  ],
};