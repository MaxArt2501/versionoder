const gulp = require("gulp");

gulp.task("stylus", () => {
    const stylus = require("gulp-stylus");

    gulp.src("styles/*.styl")
        .pipe(stylus())
        .pipe(gulp.dest("styles"));
});

gulp.task("watch", () => {
    const watch = require("gulp-watch");

    watch("styles/**/*.styl", () => {
        gulp.start("stylus");
    });
});
