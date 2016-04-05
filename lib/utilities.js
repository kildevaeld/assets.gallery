"use strict";
function ajax() {
    var e;
    if (window.hasOwnProperty('XMLHttpRequest')) {
        return new XMLHttpRequest();
    }
    try {
        return new ActiveXObject('msxml2.xmlhttp.6.0');
    }
    catch (_error) {
        e = _error;
    }
    try {
        return new ActiveXObject('msxml2.xmlhttp.3.0');
    }
    catch (_error) {
        e = _error;
    }
    try {
        return new ActiveXObject('msxml2.xmlhttp');
    }
    catch (_error) {
        e = _error;
    }
    return e;
}
exports.ajax = ajax;
;
function truncate(str, length) {
    var n = str.substring(0, Math.min(length, str.length));
    return n + (n.length == str.length ? '' : '...');
}
exports.truncate = truncate;
function humanFileSize(bytes, si) {
    if (si === void 0) { si = false; }
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}
exports.humanFileSize = humanFileSize;
function normalizeURL(url) {
    var segments = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        segments[_i - 1] = arguments[_i];
    }
    var i, p = "";
    if ((i = url.indexOf('?')) >= 0) {
        p = url.substr(i);
        url = url.substr(0, i);
    }
    if (url[url.length - 1] !== '/')
        url += '/';
    for (var i_1 = 0, ii = segments.length; i_1 < ii; i_1++) {
        var s = segments[i_1];
        if (s === '/')
            continue;
        if (s[0] === '/')
            s = s.substr(1);
        if (s[s.length - 1] !== '/')
            s += '/';
        url += s;
    }
    if (url[url.length - 1] === '/')
        url = url.substr(0, url.length - 1);
    return url + p;
}
exports.normalizeURL = normalizeURL;
