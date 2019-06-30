"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MethodType_1 = __importDefault(require("../bean/MethodType"));
function Method(value = MethodType_1.default.All) {
    return function (target, methodName, descriptor) {
        if (!descriptor) {
            target = target.prototype;
            if (!target.methodTypes) {
                target.methodTypes = [];
            }
            target.methodTypes.push(value);
        }
        else {
            target = descriptor.value;
            if (!target.methodTypes) {
                target.methodTypes = [];
            }
            target.methodTypes.push(value);
        }
    };
}
exports.default = Method;
