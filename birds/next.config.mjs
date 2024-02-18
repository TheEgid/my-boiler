// eslint-disable-next-line import/no-anonymous-default-export
export default {
    experimental: { webpackBuildWorker: true },
    reactStrictMode: true,
    distDir: "build",
    onDemandEntries: { maxInactiveAge: 25 * 10000 },
    assetPrefix: process.platform === "linux" ? "/application1" : "",
};
