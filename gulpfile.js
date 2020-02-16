const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const uglifycss = require("gulp-uglifycss");
function minifyTask(cb) {
  gulp
    .src("dashboard/src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dashboard/static/js"));
  cb();
}
function minifyCssTask(cb) {
  gulp
    .src("dashboard/src/css/*.css")
    .pipe(
      uglifycss({
        maxLineLen: 80,
        uglyComments: true
      })
    )
    .pipe(gulp.dest("dashboard/static/css"));
  cb();
}
exports.minify = minifyTask;
exports.css = minifyCssTask;
