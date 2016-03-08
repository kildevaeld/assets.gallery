'use strict';

const gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
    rename = require('gulp-rename');


gulp.task('build:stylus',  function () {
	return gulp.src('./src/stylus/client.styl')
	.pipe(stylus({
		use: nib()
	}))
    .pipe(rename('assets.gallery.css'))
	.pipe(gulp.dest('./dist/'));
});

gulp.task('watch:stylus', function () {
	gulp.watch('./src/stylus/*.styl', ['build:stylus']);
});
