const purge = require("./purge");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");


module.exports = function (eleventyConfig, options = {}) {
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(UpgradeHelper);

  eleventyConfig.on("afterBuild", () => purge(options));

  return {
    dir: {
      input: "src",
      data: "_data",
    }
  };
};
