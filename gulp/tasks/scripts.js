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
  .pipe(gulp.dest('dist/js'));
});

var fs = require('fs');
var readdir = require('recursive-readdir');


gulp.task('addfiles', (done) => {
  var tsconfig = require(process.cwd() + '/tsconfig.json');
  readdir(process.cwd() + '/src/scripts', function (e, files) {
    tsconfig.files = files.filter(function (file) {
      var len = file.length
      return file.substr(len - 3) === '.ts' && file.substr(len - 5) !== ".d.ts";
    }).map(function (file) {
      return file.replace(process.cwd() +'/', '')
    });

    fs.writeFile('./tsconfig.json', JSON.stringify(tsconfig,null,2), function () {
      console.log('%s files added',tsconfig.files.length);
      done();
    });
  })
})

gulp.task('watch:javascript', function () {
  gulp.watch('./src/*.ts', ['build:javascript', 'example'])
});
