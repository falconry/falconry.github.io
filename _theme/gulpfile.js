var gulp = require('gulp');

var scss = require('gulp-scss');
var minifycss = require('gulp-csso');
var postcss = require('gulp-postcss');


gulp.task('css', function () {
    return gulp.src('scss/theme.scss')
        .pipe(scss())
        .pipe(postcss())
        .pipe(minifycss())
        .pipe(gulp.dest('../css'))
});

gulp.task('default', ['css']);