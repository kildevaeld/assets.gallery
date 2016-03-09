'use strict';

const gulp = require('gulp');



gulp.task('example', ['build'], () => {
  gulp.src('./dist/*')
  .pipe(gulp.dest('example/public'))
})

gulp.task('build', ['build:typescript', 'build:javascript', 'build:stylus', 'build:copy']);