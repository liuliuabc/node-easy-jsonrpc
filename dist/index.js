"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RpcController_1 = __importDefault(require("./model/RpcController"));
const RpcUser_1 = __importDefault(require("./model/RpcUser"));
const RpcError_1 = __importDefault(require("./model/RpcError"));
const RpcRequest_1 = __importDefault(require("./model/RpcRequest"));
const RpcResponse_1 = __importDefault(require("./model/RpcResponse"));
const RpcNotice_1 = __importDefault(require("./model/RpcNotice"));
exports.default = RpcController_1.default;
class RpcUser extends RpcUser_1.default {
}
exports.RpcUser = RpcUser;
class RpcError extends RpcError_1.default {
}
exports.RpcError = RpcError;
class RpcRequest extends RpcRequest_1.default {
}
exports.RpcRequest = RpcRequest;
class RpcResponse extends RpcResponse_1.default {
}
exports.RpcResponse = RpcResponse;
class RpcNotice extends RpcNotice_1.default {
}
exports.RpcNotice = RpcNotice;
