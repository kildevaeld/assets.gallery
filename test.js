
const vinyl = require('vinyl-fs'),
    es = require('event-stream');

vinyl.src('./src/mimetypes/*', {follow: false, buffer: true})
.pipe(es.map((data, cb) => {
    console.log(data.path);
    cb(null, data)
}))