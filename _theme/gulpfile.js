var gulp = require('gulp');

var sass = require('gulp-sass');
var minifycss = require('gulp-csso');
var postcss = require('gulp-postcss');

sass.compiler = require('node-sass');

gulp.task('css', function () {
    return gulp.src('scss/theme.scss')
        .pipe(sass())
        .pipe(postcss())
        .pipe(minifycss())
        .pipe(gulp.dest('../css'))
});

gulp.task('default', gulp.series('css'));