"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var RpcController_1 = __importDefault(require("./model/RpcController"));
var RpcUser_1 = __importDefault(require("./model/RpcUser"));
var RpcError_1 = __importDefault(require("./model/RpcError"));
var RpcRequest_1 = __importDefault(require("./model/RpcRequest"));
var RpcResponse_1 = __importDefault(require("./model/RpcResponse"));
var RpcNotice_1 = __importDefault(require("./model/RpcNotice"));
exports.default = RpcController_1.default;
var RpcUser = /** @class */ (function (_super) {
    __extends(RpcUser, _super);
    function RpcUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RpcUser;
}(RpcUser_1.default));
exports.RpcUser = RpcUser;
var RpcError = /** @class */ (function (_super) {
    __extends(RpcError, _super);
    function RpcError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RpcError;
}(RpcError_1.default));
exports.RpcError = RpcError;
var RpcRequest = /** @class */ (function (_super) {
    __extends(RpcRequest, _super);
    function RpcRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RpcRequest;
}(RpcRequest_1.default));
exports.RpcRequest = RpcRequest;
var RpcResponse = /** @class */ (function (_super) {
    __extends(RpcResponse, _super);
    function RpcResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RpcResponse;
}(RpcResponse_1.default));
exports.RpcResponse = RpcResponse;
var RpcNotice = /** @class */ (function (_super) {
    __extends(RpcNotice, _super);
    function RpcNotice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RpcNotice;
}(RpcNotice_1.default));
exports.RpcNotice = RpcNotice;
