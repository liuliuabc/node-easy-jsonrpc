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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const MethodType_1 = __importDefault(require("../bean/MethodType"));
const RpcError_1 = __importDefault(require("../bean/RpcError"));
class RpcController {
    static init(paths) {
        //放在上面会造成互相引用导致问题
        if (!(paths instanceof Array)) {
            paths = [paths];
        }
        for (const controllerPath of paths) {
            const fileNames = fs_1.default.readdirSync(controllerPath);
            for (const fileName of fileNames) {
                const filePath = path_1.default.join(controllerPath, fileName);
                const file = fs_1.default.statSync(filePath);
                if (file.isDirectory()) {
                    this.init(filePath);
                }
                else if (fileName.endsWith(".ts") || fileName.endsWith(".js")) {
                    const clazz = require(filePath).default;
                    if (clazz.contollerName) {
                        this.controllers.set(clazz.contollerName, new clazz());
                    }
                }
            }
        }
    }
    static requestAction(method, params, methodType = MethodType_1.default.All, user) {
        if (!method) {
            throw RpcError_1.default.MethodNotFound;
        }
        method = method.toLowerCase();
        if (method[0] === "/") {
            method = method.substring(1);
        }
        if (method[method.length - 1] === "/") {
            method = method.substring(0, method.length - 1);
        }
        // user/login  user->module login->method
        // user/auth/login  user/auth->module login->method
        let controllerName = "";
        let methodName = "";
        if (method.indexOf("/") >= 0) {
            controllerName = method.substring(0, method.lastIndexOf("/"));
            methodName = method.substring(method.lastIndexOf("/") + 1);
        }
        else {
            controllerName = method;
        }
        const controller = this.controllers.get(controllerName);
        if (controller) {
            return this.executeAction(controller, methodName ? methodName : "/", params, methodType, user);
        }
        else {
            throw RpcError_1.default.MethodNotFound;
        }
    }
    static executeAction(controller, methodName, params, methodType = MethodType_1.default.All, user) {
        if (!methodName || methodName === "/") {
            methodName = "index";
        }
        if (!controller.actions) {
            throw RpcError_1.default.MethodNotFound;
        }
        let method = controller.actions.get(methodName);
        if (!method) {
            method = controller.actions.get("default");
        }
        if (!method) {
            throw RpcError_1.default.MethodNotFound;
        }
        else {
            const methodTypes = method.methodTypes ? method.methodTypes : controller.methodTypes;
            if (methodTypes.indexOf(MethodType_1.default.All) >= 0
                || methodTypes.indexOf(methodType) >= 0) {
                return this.invokeMethod(controller, method, params, user);
            }
            else {
                throw RpcError_1.default.MethodNotFound;
            }
        }
    }
    static bindArr(arr1 = [], arr2 = []) {
        const result = [];
        for (const item of arr1) {
            if (result.indexOf(item) < 0) {
                result.push(item);
            }
        }
        for (const item of arr2) {
            if (result.indexOf(item) < 0) {
                result.push(item);
            }
        }
        return result;
    }
    static delArr(arrOrigin = [], arrDel = []) {
        const result = [];
        for (const item of arrOrigin) {
            if (arrDel.indexOf(item) < 0) {
                result.push(item);
            }
        }
        return result;
    }
    static invokeMethod(thiz, method, params, user, isRule = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isRule) {
                if (!method.allRules) {
                    const addRules = this.bindArr(method.addRules, thiz.addRules);
                    const offRules = method.offRules;
                    const addPublicRules = this.bindArr(method.addPublicRules, thiz.addPublicRules);
                    const offPublicRules = method.offPublicRules;
                    method.allRules = this.bindArr(this.delArr(addRules, offRules), this.delArr(addPublicRules, offPublicRules));
                }
                for (const ruleName of method.allRules) {
                    let ruleMethod;
                    if (ruleName.startsWith("public-")) {
                        ruleMethod = RpcController.publicRules.get(ruleName);
                    }
                    else if (thiz.rules) {
                        ruleMethod = thiz.rules.get(ruleName);
                    }
                    if (ruleMethod) {
                        yield this.invokeMethod(thiz, ruleMethod, params, user, true);
                    }
                    else {
                        throw RpcError_1.default.InternalError;
                    }
                }
            }
            if (!method.paramNames) {
                const mstr = method.toString();
                method.paramNames = mstr.substring(mstr.indexOf("(") + 1, mstr.indexOf(")")).replace(/ /g, "").split(",");
            }
            const paramValues = [];
            for (let i = 0; i < method.paramNames.length; i++) {
                const paramName = method.paramNames[i];
                let value = null;
                if (paramName === "params") {
                    value = params;
                }
                else if (paramName === "user") {
                    value = user;
                }
                else {
                    value = params ? (params[paramName] ? params[paramName] : null) : null;
                }
                const canNull = method["canNull-" + i] === undefined ?
                    (method.canNull === undefined ? thiz.canNull : method.canNull) : method["canNull-" + i];
                if (!canNull && !value) {
                    throw RpcError_1.default.InvalidParams;
                }
                const type = method["type-" + i];
                if (value && type && type !== "any" && paramName !== "user") {
                    if (type === "array") {
                        if (!(value instanceof Array)) {
                            throw RpcError_1.default.InvalidParams;
                        }
                    }
                    else if (typeof value !== type) {
                        throw RpcError_1.default.InvalidParams;
                    }
                }
                paramValues.push(value);
            }
            return method.apply(thiz, paramValues);
        });
    }
}
RpcController.controllers = new Map();
RpcController.publicRules = new Map();
exports.default = RpcController;
