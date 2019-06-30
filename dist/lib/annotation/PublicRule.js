"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RpcController_1 = __importDefault(require("../controller/RpcController"));
const SetParamType_1 = __importDefault(require("../util/SetParamType"));
function PublicRule(value) {
    return function (target, methodName, descriptor) {
        const name = value ? value : methodName;
        RpcController_1.default.publicRules.set("public-" + name, descriptor.value);
        SetParamType_1.default(target, methodName);
    };
}
exports.default = PublicRule;
