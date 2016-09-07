"use strict";
const orange_1 = require('orange');
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
})(exports.HttpMethod || (exports.HttpMethod = {}));
var HttpMethod = exports.HttpMethod;
class AssetsError extends Error {
    constructor(status, message) {
        if (orange_1.isString(status)) {
            message = status;
            status = 200;
        }
        else if (arguments.length === 1) {
            message = "";
        }
        super(message);
        this.message = message;
        this.status = status;
    }
    toJSON() {
        let out = {
            status: this.status,
            message: this.message
        };
        if (this.name)
            out.name = this.name;
        return out;
    }
}
exports.AssetsError = AssetsError;
class HttpError extends AssetsError {
}
exports.HttpError = HttpError;
