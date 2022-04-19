const purge = require("./purge");

module.exports = function (eleventyConfig, options = {}) {

    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("scripts");

    eleventyConfig.on("afterBuild", () => purge(options));

    return {
        dir: {
            input: "src",
        }
    }
};