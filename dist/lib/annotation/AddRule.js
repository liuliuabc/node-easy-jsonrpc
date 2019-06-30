"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AddRule(value) {
    return function (target, methodName, descriptor) {
        if (!descriptor) {
            target = target.prototype;
        }
        else {
            target = descriptor.value;
        }
        if (!target.addRules) {
            target.addRules = [];
        }
        if (target.addRules.indexOf(value) < 0) {
            target.addRules.push(value);
        }
    };
}
exports.default = AddRule;
