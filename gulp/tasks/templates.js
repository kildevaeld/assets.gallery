'use strict';

const gulp = require('gulp'),
    es = require('event-stream'),
    fs = require('fs');

gulp.task('build:templates', (done) => {
    
    var output = [];
    var templates = {};
    gulp.src('./src/templates/**/*.html')
    .pipe(es.map((file, callback) => {
        let rel = file.relative.substr(0, file.relative.lastIndexOf('.'));
        let str = file.contents.toString();
         
        let name = file.relative.substr(0, file.relative.lastIndexOf("."));
        
		    str = str.replace( /&apos;/g, "'" ).replace( /&amp;/g, "&" ).replace( /&gt;/g, ">" ).replace( /&lt;/g, "<" ).replace( /&quot;/g, '"' );
        
        templates[name] = str.replace(/\s{2,}/g, '  ');
        
        return callback(null, file);
    }))
    .pipe(es.wait(() => {
      output.push("export default " + JSON.stringify(templates, null, 2));
      return fs.writeFile('./src/scripts/templates.ts', output.join('\n'), done)
      
    }));
    
});

gulp.task('watch:templates', () => {
    return gulp.watch('./src/html/**/*.html', ['build:templates']);
})