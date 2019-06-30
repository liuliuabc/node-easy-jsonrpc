"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SetParamType_1 = __importDefault(require("../util/SetParamType"));
function Rule(value) {
    return function (target, methodName, descriptor) {
        if (!target.rules) {
            target.rules = new Map();
        }
        const name = value ? value : methodName;
        target.rules.set(name, descriptor.value);
        SetParamType_1.default(target, methodName);
    };
}
exports.default = Rule;
