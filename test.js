'use strict';
const vinyl = require('vinyl-fs'),
    es = require('event-stream'),
    Path = require('path'),
    fs = require('fs');

const reg = /^[a-z]+-x-[a-z]+$/
const reg2  = /^x-[a-z]+/



vinyl.src('./src/mimetypes/*', {follow: false, buffer: false})
.pipe(es.map((data, cb) => {
    let filename = Path.basename(data.path, Path.extname(data.path));
    let out = {};
    if (filename.match(reg)) {
        out[filename.replace('-x', '')] = 'mime-' + filename; 
    } 
    out[filename] = 'mime-' + filename;
    cb(null, out)
})).pipe(es.writeArray((err, body) => {
    
    let out = {};
    
    for (let i = 0, ii = body.length; i<ii;i++) {
        for (let k in body[i]) {
            out[k] = body[i][k];
        }
    }
    
    
    
    let str = `const MimeTypes = ${JSON.stringify(out, null, '  ')};\n`;
    
    str += `
export function getMimeIcon(mime:string): string {
    if (MimeTypes[mime]) {
        return MimeTypes[mime];
    }
    return MimeTypes['unknown'];
};`
    
    fs.writeFileSync('src/scripts/mime-types.ts', str);
}))