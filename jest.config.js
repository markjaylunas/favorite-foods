// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["ts", "js", "tsx", "jsx"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@api/(.*)$": "<rootDir>/api/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
