"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RpcNotice {
    constructor(method, params = {}, methodType) {
        this.jsonrpc = "2.0";
        this.method = method;
        this.params = params;
        this.methodType = methodType;
    }
}
exports.default = RpcNotice;
