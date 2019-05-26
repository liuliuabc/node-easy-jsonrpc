"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RpcResponse {
    constructor(id, result, error) {
        this.jsonrpc = "2.0";
        this.id = id;
        this.result = result;
        this.error = error;
    }
    safeResult(result = {}) {
        return this.result ? this.result : result;
    }
    safeError(error = {}) {
        return this.error ? this.error : error;
    }
}
exports.default = RpcResponse;
