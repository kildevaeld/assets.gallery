"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventsjs_1 = require('eventsjs');
var utils = require('utilities');
var interface_1 = require('./interface');
var FileUploader = (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader(options) {
        _super.call(this);
        this.options = utils.extend({}, {
            parameter: 'file',
            method: interface_1.HttpMethod.POST,
            maxSize: 2048
        }, options);
    }
    FileUploader.prototype.upload = function (file, progressFn, attributes) {
        var _this = this;
        try {
            this.validateFile(file);
        }
        catch (e) {
            return utils.Promise.reject(e);
        }
        var formData = new FormData();
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
            .uploadProgress(function (event) {
            if (event.lengthComputable) {
                var progress = (event.loaded / event.total * 100 || 0);
                _this.trigger('progress', file, progress);
                if (progressFn != null) {
                    progressFn(event.loaded, event.total);
                }
            }
        })
            .end(file)
            .then(function (res) {
            return JSON.parse(res);
        });
    };
    FileUploader.prototype.validateFile = function (file) {
        var maxSize = this.options.maxSize * 1000;
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
            var mime = new RegExp(mimeTypes[i].replace('*', '.*'));
            if (mime.test(type))
                return;
            else
                throw new Error('Wrong mime type');
        }
    };
    return FileUploader;
}(eventsjs_1.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileUploader;
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
