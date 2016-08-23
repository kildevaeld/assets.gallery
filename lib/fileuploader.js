"use strict";
const eventsjs_1 = require('eventsjs');
const utils = require('utilities');
const interface_1 = require('./interface');
class FileUploader extends eventsjs_1.EventEmitter {
    constructor(options) {
        super();
        this.options = utils.extend({}, {
            parameter: 'file',
            method: interface_1.HttpMethod.POST,
            maxSize: 2048
        }, options);
    }
    upload(file, progressFn, attributes) {
        try {
            this.validateFile(file);
        }
        catch (e) {
            return utils.Promise.reject(e);
        }
        let formData = new FormData();
        formData.append(this.options.parameter, file);
        attributes = attributes || {};
        Object.keys(attributes).forEach(function (key) {
            var value = attributes[key];
            formData.append(key, value);
        });
        return utils.request.post(this.options.url)
            .header({
            'Content-Type': file.type,
        })
            .params({ filename: file.name })
            .uploadProgress((event) => {
            if (event.lengthComputable) {
                let progress = (event.loaded / event.total * 100 || 0);
                this.trigger('progress', file, progress);
                if (progressFn != null) {
                    progressFn(event.loaded, event.total);
                }
            }
        })
            .end(file)
            .then((res) => {
            if (!res.isValid) {
                throw new utils.HttpError(res.status, res.statusText, res.body);
            }
            return JSON.parse(res.body);
        });
    }
    validateFile(file) {
        let maxSize = this.options.maxSize * 1000;
        if (maxSize !== 0 && file.size > maxSize) {
            throw new Error('file to big');
        }
        var type = file.type;
        var mimeTypes;
        if (typeof this.options.mimeType === 'string') {
            mimeTypes = [this.options.mimeType];
        }
        else {
            mimeTypes = this.options.mimeType;
        }
        if (!mimeTypes)
            return;
        for (var i = 0; i < mimeTypes.length; i++) {
            let mime = new RegExp(mimeTypes[i].replace('*', '.*'));
            if (mime.test(type))
                return;
            else
                throw new Error('Wrong mime type');
        }
    }
}
exports.FileUploader = FileUploader;
function formatResponse(response) {
    var ret = null;
    try {
        ret = JSON.parse(response);
    }
    catch (e) {
        ret = response;
    }
    return ret;
}
