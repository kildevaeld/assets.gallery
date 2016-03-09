'use strict';

const gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    tsc = require('gulp-typescript'),
	merge = require('merge2');

const project = tsc.createProject('./tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('build:typescript', function () {

  let result = project.src()
  .pipe(tsc(project));

	return merge([
		result.js.pipe(gulp.dest('./lib')),
		result.dts.pipe(gulp.dest('./lib'))
	]);


});

gulp.task('build:javascript', ['build:typescript'], function () {
  return gulp.src('./lib/index.js')
  .pipe(webpack({
    output: {
      library: "Assets",
      libraryTarget: "umd",
      filename: 'assets.gallery.js'
    },
    externals: {
    	//views: 'views'
    }
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch:javascript', function () {
  gulp.watch('./src/*.ts', ['build:javascript', 'example'])
});
