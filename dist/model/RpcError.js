"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RpcInfo_1 = __importDefault(require("./RpcInfo"));
class RpcError extends Error {
    constructor(messageOrObj, code) {
        if (typeof messageOrObj === "object") {
            super(messageOrObj.message);
            this.message = messageOrObj.message;
            this.code = messageOrObj.code;
        }
        else {
            super(messageOrObj);
            this.message = messageOrObj;
            this.code = code;
        }
    }
    toJSON() {
        return {
            code: this.code,
            message: this.message
        };
    }
}
RpcError.InternalError = new RpcError(RpcInfo_1.default.InternalError);
RpcError.InvalidParams = new RpcError(RpcInfo_1.default.InvalidParams);
RpcError.InvalidRequest = new RpcError(RpcInfo_1.default.InvalidRequest);
RpcError.MethodNotFound = new RpcError(RpcInfo_1.default.MethodNotFound);
RpcError.ParseError = new RpcError(RpcInfo_1.default.ParseError);
RpcError.RequestTimeout = new RpcError(RpcInfo_1.default.RequestTimeout);
exports.default = RpcError;
