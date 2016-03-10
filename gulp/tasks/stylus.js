'use strict';

const gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
    rename = require('gulp-rename');

gulp.task('build:copy', () => {
    return gulp.src('./src/images/*.{png,gif}')
    .pipe(gulp.dest('dist/images'));
})

gulp.task('build:stylus',  function () {
	return gulp.src('./src/stylus/client.styl')
	.pipe(stylus({
		use: nib(),
    url: {
      name: 'embedurl',
      paths: [process.cwd() + '/src/stylus'],
      limit: false
    }
	}))
    .pipe(rename('assets-gallery.css'))
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('watch:stylus', function () {
	gulp.watch('./src/stylus/*.styl', ['build:stylus', 'example']);
});
