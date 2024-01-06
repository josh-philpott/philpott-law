module.exports = function () {
  console.log("parsed config");
  return {
    isDev: process.env.MY_ENVIRONMENT !== "production",
    apiBaseUrl:
      process.env.MY_ENVIRONMENT === "production"
        ? "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-51c2f016-7a45-4af9-907f-235f5b6e0175"
        : "http://localhost:3000",
    siteUrl:
      process.env.MY_ENVIRONMENT === "production"
        ? "https://philpott-law.com"
        : "http://localhost:8080",
  };
};
