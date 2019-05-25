"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RpcRequest = /** @class */ (function () {
    function RpcRequest(id, method, params) {
        this.jsonrpc = "2.0";
        this.id = id;
        this.method = method;
        this.params = params;
    }
    return RpcRequest;
}());
exports.default = RpcRequest;
