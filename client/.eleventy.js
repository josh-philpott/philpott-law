const purge = require("./purge");

module.exports = function (eleventyConfig, options = {}) {
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("docs");

  eleventyConfig.on("afterBuild", () => purge(options));

  return {
    dir: {
      input: "src",
      data: "_data",
    },
    pathPrefix:"/philpott-law/"
  };
};
