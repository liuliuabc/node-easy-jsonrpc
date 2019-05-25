"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RpcNotice = /** @class */ (function () {
    function RpcNotice(method, params) {
        if (params === void 0) { params = {}; }
        this.jsonrpc = "2.0";
        this.method = method;
        this.params = params;
    }
    return RpcNotice;
}());
exports.default = RpcNotice;
