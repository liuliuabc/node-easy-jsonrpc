"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RpcResponse_1 = __importDefault(require("./RpcResponse"));
const RpcInfo_1 = __importDefault(require("./RpcInfo"));
const RpcController_1 = __importDefault(require("./RpcController"));
const RpcError_1 = __importDefault(require("./RpcError"));
class RpcUser {
    constructor() {
        this.requestMethod = "";
        this.responsed = false;
    }
    send(rpcResponse) {
        if (this.sendFun && !this.responsed) {
            this.responsed = true;
            rpcResponse.id = this.requestId;
            this.sendFun(rpcResponse);
        }
    }
    success(result = true) {
        const response = new RpcResponse_1.default();
        response.result = result;
        this.send(response);
    }
    error(error = RpcInfo_1.default.InternalError) {
        const response = new RpcResponse_1.default();
        response.error = error;
        this.send(response);
    }
    call(rpcRequest, send) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.sendFun = send;
                this.requestMethod = rpcRequest.method;
                this.requestParams = rpcRequest.params;
                this.requestId = rpcRequest.id;
                const result = yield RpcController_1.default.requestAction(rpcRequest.method, rpcRequest.params, this);
                if (result) {
                    this.success(result);
                }
                else {
                    this.error(RpcInfo_1.default.NoResponse);
                }
            }
            catch (e) {
                if (e instanceof RpcError_1.default) {
                    this.error(e);
                }
                else {
                    this.error();
                }
            }
        });
    }
    notify(rpcNotice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.requestMethod = rpcNotice.method;
                this.requestParams = rpcNotice.params;
                yield RpcController_1.default.requestAction(rpcNotice.method, rpcNotice.params, this);
            }
            catch (e) {
            }
        });
    }
}
exports.default = RpcUser;
