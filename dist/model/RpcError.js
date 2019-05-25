"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RpcInfo_1 = __importDefault(require("./RpcInfo"));
var RpcError = /** @class */ (function (_super) {
    __extends(RpcError, _super);
    function RpcError(messageOrObj, code) {
        var _this = this;
        if (typeof messageOrObj === "object") {
            _this = _super.call(this, messageOrObj.message) || this;
            _this.message = messageOrObj.message;
            _this.code = messageOrObj.code;
        }
        else {
            _this = _super.call(this, messageOrObj) || this;
            _this.message = messageOrObj;
            _this.code = code;
        }
        return _this;
    }
    RpcError.prototype.toJSON = function () {
        return {
            code: this.code,
            message: this.message
        };
    };
    RpcError.InternalError = new RpcError(RpcInfo_1.default.InternalError);
    RpcError.InvalidParams = new RpcError(RpcInfo_1.default.InvalidParams);
    RpcError.InvalidRequest = new RpcError(RpcInfo_1.default.InvalidRequest);
    RpcError.MethodNotFound = new RpcError(RpcInfo_1.default.MethodNotFound);
    RpcError.ParseError = new RpcError(RpcInfo_1.default.ParseError);
    RpcError.RequestTimeout = new RpcError(RpcInfo_1.default.RequestTimeout);
    return RpcError;
}(Error));
exports.default = RpcError;
