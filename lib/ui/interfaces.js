"use strict";
var previewHandlers = {};
function setPreviewHandler(mime, view) {
    if (!Array.isArray(mime)) {
        mime = [mime];
    }
    mime.forEach(function (m) {
        previewHandlers[m] = view;
    });
}
function getPreviewHandler(mime) {
    let reg, k;
    for (k in previewHandlers) {
        if ((new RegExp(k)).test(mime))
            return previewHandlers[k];
    }
    return null;
}
exports.getPreviewHandler = getPreviewHandler;
function preview(...mimetypes) {
    return function (target) {
        setPreviewHandler(mimetypes, target);
    };
}
exports.preview = preview;
