const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

//Scss File

function scssTask() {
  return gulp
    .src("src/assets/sass/**/*.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))

    .pipe(gulp.dest("src/assets/css", { sourcemaps: "." }))
    .pipe(browserSync.stream());
}

//Browser Sync

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./src/assets/sass/**/*.scss", scssTask);
  gulp.watch("./**/*.html").on("change", () => browserSync.reload());
  gulp.watch("./**/*.js").on("chnage", () => browserSync.reload());
}

//Reload
exports.default = gulp.series(scssTask, watch);
