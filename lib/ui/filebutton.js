"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const fileuploader_1 = require('../fileuploader');
const views_1 = require('views');
const utils = require('utilities');
let defaults = { maxSize: 2048, mimeType: '*', autoUpload: false };
class MessageView extends views_1.View {
    show() { this.el.style.display = 'block'; }
    hide() { this.el.style.display = 'none'; }
    setMessage(msg) {
        this.el.textContent = msg;
    }
}
class ProgressView extends views_1.View {
    show() { this.el.style.display = 'block'; }
    hide() { this.el.style.display = 'none'; }
    setProgress(progress, total, percent) {
        percent = Math.floor(percent * 100) / 100;
        this.el.textContent = `${percent}/100`;
    }
}
function createButton(options) {
    let progressView = new ProgressView();
    let errorView = new MessageView();
    options.progressView = progressView;
    options.errorView = errorView;
    let uploadButton = new UploadButton(options);
    let div = document.createElement('div');
    div.appendChild(uploadButton.el);
    progressView.appendTo(div);
    errorView.appendTo(div);
    return div;
}
exports.createButton = createButton;
let UploadButton = class UploadButton extends views_1.View {
    constructor(options) {
        options = utils.extend({}, defaults, options);
        super(options);
        utils.extend(this, utils.pick(options, ['errorView', 'progressView']));
        this.uploader = options.uploader || new fileuploader_1.FileUploader(options);
        this.options = options;
    }
    set url(url) {
        this.uploader.options.url = url;
    }
    get url() {
        return this.uploader.options.url;
    }
    onRender() {
        if (this.options.mimeType) {
            let mime;
            if (Array.isArray(this.options.mimeType)) {
                mime = this.options.mimeType.join(',');
            }
            else {
                mime = this.options.mimeType;
            }
            this.el.setAttribute('accept', mime);
        }
    }
    _onChange(e) {
        this.hideErrorView();
        let files = this.el.files;
        if (files.length === 0)
            return;
        let file = files[0];
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
    }
    upload(file) {
        let pv = this.progressView;
        if (pv != null) {
            pv.show();
        }
        return this.uploader.upload(file, (progress, total) => {
            this.trigger('progress', { progress: progress, total: total });
            this.showProgress(progress, total);
        }).then((result) => {
            this.trigger('upload', result);
            if (pv != null)
                pv.hide();
            this.clear();
        }).catch((e) => {
            this.trigger('error', e);
            this.showErrorMessage(e);
            this.clear();
            if (pv != null)
                pv.hide();
        });
    }
    clear() {
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
    }
    showErrorMessage(error) {
        if (this.errorView != null) {
            this.errorView.setMessage(error.message);
            this.errorView.show();
        }
    }
    hideErrorView() {
        if (this.errorView) {
            this.errorView.hide();
        }
    }
    showProgress(progress, total) {
        if (this.progressView != null) {
            let percent = (progress / total) * 100;
            this.progressView.setProgress(progress, total, percent);
        }
    }
};
UploadButton = __decorate([
    views_1.attributes({
        tagName: 'input',
        attributes: { type: 'file' },
        events: {
            change: '_onChange'
        }
    }), 
    __metadata('design:paramtypes', [Object])
], UploadButton);
exports.UploadButton = UploadButton;
