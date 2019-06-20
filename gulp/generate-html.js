const {src, dest} = require(`gulp`);
const posthtml = require(`gulp-posthtml`);
const include = require(`posthtml-include`);
const expressions = require(`posthtml-expressions`);
const htmlmin = require("gulp-htmlmin");
const {SOURCE, TARGET} = require(`./config`);

const generateHtml = () => {
  return src(`${SOURCE.root}/*.html`)
  .pipe(posthtml([
    include(),
    expressions()
  ]))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest(`${TARGET.root}`));
};

module.exports = generateHtml;
