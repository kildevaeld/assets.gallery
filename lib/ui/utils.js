"use strict";
const templates_1 = require('./templates');
function template(name) {
    return function (target) {
        let t;
        if (!(t = templates_1.default[name])) {
            throw new Error('could not find template: ' + name);
        }
        target.prototype.template = t;
    };
}
exports.template = template;
function getImageSize(image) {
    const load = () => {
        return new Promise((resolve, reject) => {
            let i = new Image();
            i.onload = () => {
                resolve({
                    width: i.naturalWidth || i.width,
                    height: i.naturalHeight || i.height
                });
            };
            i.onerror = reject;
            i.src = image.src;
        });
    };
    if (image.naturalHeight === undefined) {
        return load();
    }
    else if (image.naturalHeight === 0) {
        return new Promise((resolve, reject) => {
            var time = setTimeout(() => {
                time = null;
                load().then(resolve, reject);
            }, 200);
            image.onload = () => {
                if (time !== null) {
                    clearTimeout(time);
                }
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight
                });
            };
        });
    }
    else {
        return Promise.resolve({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
    }
}
exports.getImageSize = getImageSize;
function getCropping(size, ratio) {
    let width = size.width, height = size.height;
    let nh = height, nw = width;
    if (width > height) {
        nh = width / ratio;
    }
    else {
        nw = height * ratio;
    }
    return {
        x: 0,
        y: 0,
        width: nw,
        height: nh,
        rotate: 0,
        scaleX: 1,
        scaleY: 1
    };
}
exports.getCropping = getCropping;
