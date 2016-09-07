"use strict";
const eventsjs_1 = require('eventsjs');
const orange_1 = require('orange');
const request = require('orange.request');
const index_1 = require('./models/index');
const utilities_1 = require('./utilities');
const interface_1 = require('./interface');
class AssetsClient extends eventsjs_1.EventEmitter {
    constructor(options = {}) {
        super();
        this.__options = orange_1.extend({}, options);
        if (!options.url || options.url === '') {
            this.__options.url = '/';
        }
    }
    toModel(attr) {
        return new index_1.AssetsModel(attr, {
            url: this.url
        });
    }
    get options() {
        return orange_1.extend({}, this.__options);
    }
    get url() {
        return this.__options.url;
    }
    set url(url) {
        if (this.url === url)
            return;
        this.__options.url = url;
        this.trigger('change:url', url);
    }
    getCollection() {
        return new index_1.AssetsCollection(this);
    }
    getById(id) {
        return request.get(this.url)
            .params({
            id: id
        }).json(null, true).then(value => {
            return new index_1.AssetsModel(value, {
                url: this.url
            });
        });
    }
    getByPath(path) {
        if (path == null || path === '' || path === '/') {
            return orange_1.Promise.reject(new interface_1.HttpError(500, ""));
        }
        let url = utilities_1.normalizeURL(this.url, path);
        return request.get(url)
            .json(null, true).then(value => {
            return new index_1.AssetsModel(value, {
                url: this.url
            });
        });
    }
}
exports.AssetsClient = AssetsClient;
