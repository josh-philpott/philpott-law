const purge = require("./purge");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig, options = {}) {
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("docs");

  eleventyConfig.on("afterBuild", () => purge(options));
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      input: "src",
      data: "_data",
    }
  };
};
