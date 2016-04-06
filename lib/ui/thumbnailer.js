"use strict";
var utilities_1 = require('utilities');
exports.MimeList = {
    'audio/mpeg': 'audio-generic',
    'audio/ogg': 'audio-generic',
    'application/pdf': 'application-pdf',
    'video/ogg': 'video-generic',
    'video/mp4': 'video-generic',
    'video/x-m4v': 'video-generic',
    'video/quicktime': 'video-generic'
};
var Thumbnailer = (function () {
    function Thumbnailer() {
    }
    Thumbnailer.request = function (asset) {
        var url = asset.getURL();
        return utilities_1.request.get(url).params({
            thumbnail: true,
            base64: false
        }).end().then(function () {
            return "";
        });
    };
    Thumbnailer.has = function (asset) {
        return utilities_1.request.get(asset.getURL()).params({
            thumbnail: true,
            check: true
        }).end().then(function (msg) {
            return asset.getURL() + "?thumbnail=true";
        }).catch(function () {
            return null;
        });
    };
    return Thumbnailer;
}());
exports.Thumbnailer = Thumbnailer;
