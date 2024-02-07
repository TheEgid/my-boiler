import type { Config } from "jest";

const config: Config = {
    detectOpenHandles: true,
    silent: false,
    forceExit: true,
    verbose: true,
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
        ".+\\.(css|styl|less|sass|scss|xml)$": "jest-css-modules-transform",
    },
    rootDir: ".",
    modulePaths: ["<rootDir>"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    testEnvironment: "node",
    testPathIgnorePatterns: ["/e2e/"],
};

export default config;
