"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RpcRequest {
    constructor(id, method, params) {
        this.jsonrpc = "2.0";
        this.id = id;
        this.method = method;
        this.params = params;
    }
}
exports.default = RpcRequest;
