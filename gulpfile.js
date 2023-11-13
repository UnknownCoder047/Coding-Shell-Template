const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

//Scss File

function scssTask() {
  return src("src/assets/sass/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(dest("src/assets/css", { sourcemaps: "." }))
    .pipe(browserSync.stream());
}

//Browser Sync

function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

//Reload

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch(["*.html"], browserSyncReload);
  watch(["/src/pages/**/*.html"], browserSyncReload);
  watch(["/src/assets/js/**/*.js"], browserSyncReload);
  //.on('change',browserSyncReload);
  watch(["/src/assets/sass/**/*.scss"], series(scssTask, browserSyncReload));
}

exports.default = series(scssTask, browserSyncServe, watchTask);
