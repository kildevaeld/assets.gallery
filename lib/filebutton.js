"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var fileuploader_1 = require('./fileuploader');
var views_1 = require('views');
var utils = require('utilities');
var defaults = { maxSize: 2048, mimeType: '*', autoUpload: false };
var MessageView = (function (_super) {
    __extends(MessageView, _super);
    function MessageView() {
        _super.apply(this, arguments);
    }
    MessageView.prototype.show = function () { this.el.style.display = 'block'; };
    MessageView.prototype.hide = function () { this.el.style.display = 'none'; };
    MessageView.prototype.setMessage = function (msg) {
        this.el.innerText = msg;
    };
    return MessageView;
}(views_1.View));
var ProgressView = (function (_super) {
    __extends(ProgressView, _super);
    function ProgressView() {
        _super.apply(this, arguments);
    }
    ProgressView.prototype.show = function () { this.el.style.display = 'block'; };
    ProgressView.prototype.hide = function () { this.el.style.display = 'none'; };
    ProgressView.prototype.setProgress = function (progress, total, percent) {
        percent = Math.floor(percent * 100) / 100;
        this.el.innerText = percent + "/100";
    };
    return ProgressView;
}(views_1.View));
function createButton(options) {
    var progressView = new ProgressView();
    var errorView = new MessageView();
    options.progressView = progressView;
    options.errorView = errorView;
    var uploadButton = new UploadButton(options);
    var div = document.createElement('div');
    div.appendChild(uploadButton.el);
    progressView.appendTo(div);
    errorView.appendTo(div);
    return div;
}
exports.createButton = createButton;
var UploadButton = (function (_super) {
    __extends(UploadButton, _super);
    function UploadButton(options) {
        options = utils.extend({
            tagName: 'input',
            attributes: { type: 'file' },
            className: 'file-input-button'
        }, defaults, options);
        _super.call(this, options);
        utils.extend(this, utils.pick(options, ['errorView', 'progressView']));
        this.uploader = options.uploader || new fileuploader_1.default(options);
        this.options = options;
    }
    UploadButton.prototype._onChange = function (e) {
        this.hideErrorView();
        var files = this.el.files;
        if (files.length === 0)
            return;
        var file = files[0];
        this.trigger('change', file);
        if (this.options.autoUpload === true) {
            this.upload(file);
        }
        else {
            try {
                this.uploader.validateFile(file);
            }
            catch (e) {
                this.trigger('error', e);
            }
        }
    };
    UploadButton.prototype.upload = function (file) {
        var _this = this;
        var pv = this.progressView;
        if (pv != null) {
            pv.show();
        }
        this.uploader.upload(file, function (progress, total) {
            _this.trigger('progress', { progress: progress, total: total });
            _this.showProgress(progress, total);
        }).then(function (result) {
            _this.trigger('upload', result);
            if (pv != null)
                pv.hide();
            _this.clear();
        }).catch(function (e) {
            _this.trigger('error', e);
            _this.showErrorMessage(e);
            _this.clear();
            if (pv != null)
                pv.hide();
        });
    };
    UploadButton.prototype.clear = function () {
        try {
            this.el.value = '';
            if (this.el.value) {
                this.el.type = 'text';
                this.el.type = 'file';
            }
        }
        catch (e) {
            console.error('could not clear file-input');
        }
    };
    UploadButton.prototype.showErrorMessage = function (error) {
        if (this.errorView != null) {
            this.errorView.setMessage(error.message);
            this.errorView.show();
        }
    };
    UploadButton.prototype.hideErrorView = function () {
        if (this.errorView) {
            this.errorView.hide();
        }
    };
    UploadButton.prototype.showProgress = function (progress, total) {
        if (this.progressView != null) {
            var percent = (progress / total) * 100;
            this.progressView.setProgress(progress, total, percent);
        }
    };
    UploadButton = __decorate([
        views_1.events({
            change: '_onChange'
        }), 
        __metadata('design:paramtypes', [Object])
    ], UploadButton);
    return UploadButton;
}(views_1.View));
exports.UploadButton = UploadButton;
