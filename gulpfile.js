var gulp = require('gulp');
var babel = require('gulp-babel');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');



//Live reload
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('lintJS', function () {
    return gulp.src(['./src/**/*.js', './viewer/**/*.js'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('buildJS', ['lintJS'], function () {
    return gulp.src(['./src/*.js'])
        .pipe(plumber())
        .pipe(concat('four.js'))
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
	  runSeq(['buildJS']);
})


gulp.task('default', function () {

    gulp.start('build');

    gulp.watch('src/**', function () {
        runSeq('buildJS', 'reload');
    });

    gulp.watch('viewer/**', function () {
        runSeq('buildJS', 'reload');
    });

    livereload.listen();

});