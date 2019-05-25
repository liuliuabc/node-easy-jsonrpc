"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RpcResponse_1 = __importDefault(require("./RpcResponse"));
var RpcInfo_1 = __importDefault(require("./RpcInfo"));
var RpcController_1 = __importDefault(require("./RpcController"));
var RpcError_1 = __importDefault(require("./RpcError"));
var RpcUser = /** @class */ (function () {
    function RpcUser() {
        this.requestMethod = "";
        this.responsed = false;
    }
    RpcUser.prototype.send = function (rpcResponse) {
        if (this.sendFun && !this.responsed) {
            this.responsed = true;
            rpcResponse.id = this.requestId;
            this.sendFun(rpcResponse);
        }
    };
    RpcUser.prototype.success = function (result) {
        if (result === void 0) { result = true; }
        var response = new RpcResponse_1.default();
        response.result = result;
        this.send(response);
    };
    RpcUser.prototype.error = function (error) {
        if (error === void 0) { error = RpcInfo_1.default.InternalError; }
        var response = new RpcResponse_1.default();
        response.error = error;
        this.send(response);
    };
    RpcUser.prototype.call = function (rpcRequest, send) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.sendFun = send;
                        this.requestMethod = rpcRequest.method;
                        this.requestParams = rpcRequest.params;
                        this.requestId = rpcRequest.id;
                        return [4 /*yield*/, RpcController_1.default.requestAction(rpcRequest.method, rpcRequest.params, this)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.success(result);
                        }
                        else {
                            this.error(RpcInfo_1.default.NoResponse);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof RpcError_1.default) {
                            this.error(e_1);
                        }
                        else {
                            this.error();
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RpcUser.prototype.notify = function (rpcNotice) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.requestMethod = rpcNotice.method;
                        this.requestParams = rpcNotice.params;
                        return [4 /*yield*/, RpcController_1.default.requestAction(rpcNotice.method, rpcNotice.params, this)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RpcUser;
}());
exports.default = RpcUser;
