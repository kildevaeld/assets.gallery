"use strict";
const eventsjs_1 = require('eventsjs');
const utilities_1 = require('utilities');
const index_1 = require('./models/index');
const utilities_2 = require('./utilities');
const interface_1 = require('./interface');
class AssetsClient extends eventsjs_1.EventEmitter {
    constructor(options = {}) {
        super();
        this.__options = utilities_1.extend({}, options);
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
        return utilities_1.extend({}, this.__options);
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
        return utilities_1.request.get(this.url)
            .params({
            id: id
        }).json().then(value => {
            if (!value.isValid)
                return null;
            return new index_1.AssetsModel(value.body, {
                url: this.url
            });
        });
    }
    getByPath(path) {
        if (path == null || path === '' || path === '/') {
            return utilities_1.Promise.reject(new interface_1.HttpError(500, ""));
        }
        let url = utilities_2.normalizeURL(this.url, path);
        return utilities_1.request.get(url)
            .json().then(value => {
            if (!value.isValid)
                return null;
            return new index_1.AssetsModel(value.body, {
                url: this.url
            });
        });
    }
}
exports.AssetsClient = AssetsClient;
