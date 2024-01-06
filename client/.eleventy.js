const purge = require("./purge");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig, options = {}) {
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);


  eleventyConfig.on("afterBuild", () => purge(options));

  return {
    dir: {
      input: "src",
      data: "_data",
    }
  };
};
