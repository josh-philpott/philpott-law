module.exports = function () {
  console.log("parsed config");
  return {
    isDev: process.env.MY_ENVIRONMENT !== "production",
    apiBaseUrl:
      process.env.MY_ENVIRONMENT === "production"
        ? "https://api.philpott-law.com"
        : "http://localhost:3000",
    siteUrl:
      process.env.MY_ENVIRONMENT === "production"
        ? "https://philpott-law.com"
        : "http://localhost:8080",
  };
};
