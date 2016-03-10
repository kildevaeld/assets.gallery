'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var sprity = require('sprity');
 
// generate sprite.png and _sprite.scss 
gulp.task('sprites', function () {
  return sprity.src({
    src: './src/mimetypes/**/*.{png,jpg}',
    style: 'mimetypes.styl',
    prefix: 'mime',
    dimension: [{
        ratio: 1, dpi: 72
    }, {
        ratio: 2, dpi: 192
    }],
    name: 'assets-mimetypes'
    // ... other optional options 
    // for example if you want to generate scss instead of css 
    //processor: 'css', // make sure you have installed sprity-sass 
  })
  .pipe(gulpif('*.png', gulp.dest('./dist/images/'), gulp.dest('./src/stylus')))
});