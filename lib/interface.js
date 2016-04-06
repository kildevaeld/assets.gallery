"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utilities_1 = require('utilities');
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
})(exports.HttpMethod || (exports.HttpMethod = {}));
var HttpMethod = exports.HttpMethod;
var AssetsError = (function (_super) {
    __extends(AssetsError, _super);
    function AssetsError(status, message) {
        if (utilities_1.isString(status)) {
            message = status;
            status = 200;
        }
        else if (arguments.length === 1) {
            message = "";
        }
        _super.call(this, message);
        this.message = message;
        this.status = status;
    }
    AssetsError.prototype.toJSON = function () {
        var out = {
            status: this.status,
            message: this.message
        };
        if (this.name)
            out.name = this.name;
        return out;
    };
    return AssetsError;
}(Error));
exports.AssetsError = AssetsError;
var HttpError = (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        _super.apply(this, arguments);
    }
    return HttpError;
}(AssetsError));
exports.HttpError = HttpError;
