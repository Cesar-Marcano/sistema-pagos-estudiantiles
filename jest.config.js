const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  moduleFileExtensions: ["ts", "js", "json"],
  testRegex: ".*\\.spec\\.ts$",
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/helpers/"],
};
