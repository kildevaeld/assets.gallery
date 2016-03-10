'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sprity = require('sprity');
 
// generate sprite.png and _sprite.scss 
gulp.task('sprites', function () {
  return sprity.src({
    src: './src/mimetypes/**/*.{png,jpg}',
    style: './dist/sprite.css',
    follow: true
    // ... other optional options 
    // for example if you want to generate scss instead of css 
    //processor: 'css', // make sure you have installed sprity-sass 
  })
  .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/css/')))
});