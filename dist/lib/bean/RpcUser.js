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
const RpcController_1 = __importDefault(require("../controller/RpcController"));
const RpcError_1 = __importDefault(require("./RpcError"));
class RpcUser {
    constructor(send) {
        this.responsed = false;
        this.send = send;
    }
    doSend(rpcResponse) {
        if (!this.isNotice && this.send && !this.responsed) {
            this.responsed = true;
            rpcResponse.id = this.request.id;
            this.send(rpcResponse);
        }
    }
    success(result = true) {
        const response = new RpcResponse_1.default();
        response.result = result;
        this.doSend(response);
        return response;
    }
    error(error = RpcInfo_1.default.InternalError) {
        const response = new RpcResponse_1.default();
        response.error = error;
        this.doSend(response);
        return response;
    }
    redirect(method, params = this.isNotice ? this.notice.params : this.request.params) {
        const methodType = this.isNotice ? this.notice.methodType : this.request.methodType;
        return RpcController_1.default.requestAction(method, params, methodType, this);
    }
    call(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isNotice = false;
            try {
                this.request = request;
                const result = yield RpcController_1.default.requestAction(request.method, request.params, request.methodType, this);
                this.success(result);
            }
            catch (e) {
                console.log(e);
                if (e instanceof RpcError_1.default) {
                    this.error(e);
                }
                else {
                    this.error();
                }
            }
        });
    }
    notify(notice) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isNotice = true;
            try {
                this.notice = notice;
                yield RpcController_1.default.requestAction(notice.method, notice.params, notice.methodType, this);
            }
            catch (e) {
            }
        });
    }
}
exports.default = RpcUser;
