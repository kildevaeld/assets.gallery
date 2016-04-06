"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventsjs_1 = require('eventsjs');
var utilities_1 = require('utilities');
var models_1 = require('./models');
var utilities_2 = require('./utilities');
var interface_1 = require('./interface');
var AssetsClient = (function (_super) {
    __extends(AssetsClient, _super);
    function AssetsClient(options) {
        if (options === void 0) { options = {}; }
        _super.call(this);
        this.__options = utilities_1.extend({}, options);
        if (!options.url || options.url === '') {
            this.__options.url = '/';
        }
    }
    AssetsClient.prototype.toModel = function (attr) {
        return new models_1.AssetsModel(attr, {
            url: this.url
        });
    };
    Object.defineProperty(AssetsClient.prototype, "options", {
        get: function () {
            return utilities_1.extend({}, this.__options);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetsClient.prototype, "url", {
        get: function () {
            return this.__options.url;
        },
        set: function (url) {
            if (this.url === url)
                return;
            this.__options.url = url;
            this.trigger('change:url', url);
        },
        enumerable: true,
        configurable: true
    });
    AssetsClient.prototype.getCollection = function () {
        return new models_1.AssetsCollection(this);
    };
    AssetsClient.prototype.getById = function (id) {
        var _this = this;
        return utilities_1.request.get(this.url)
            .params({
            id: id
        }).json().then(function (value) {
            return new models_1.AssetsModel(value, {
                url: _this.url
            });
        });
    };
    AssetsClient.prototype.getByPath = function (path) {
        var _this = this;
        if (path == null || path === '' || path === '/') {
            return utilities_1.Promise.reject(new interface_1.HttpError(500, ""));
        }
        var url = utilities_2.normalizeURL(this.url, path);
        return utilities_1.request.get(url)
            .json().then(function (value) {
            return new models_1.AssetsModel(value, {
                url: _this.url
            });
        });
    };
    return AssetsClient;
}(eventsjs_1.EventEmitter));
exports.AssetsClient = AssetsClient;
