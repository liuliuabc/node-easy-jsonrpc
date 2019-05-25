"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RpcResponse = /** @class */ (function () {
    function RpcResponse(id, result, error) {
        this.jsonrpc = "2.0";
        this.id = id;
        this.result = result;
        this.error = error;
    }
    RpcResponse.prototype.safeResult = function (result) {
        if (result === void 0) { result = {}; }
        return this.result ? this.result : result;
    };
    RpcResponse.prototype.safeError = function (error) {
        if (error === void 0) { error = {}; }
        return this.error ? this.error : error;
    };
    return RpcResponse;
}());
exports.default = RpcResponse;
