"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AddPublicRule(value) {
    return function (target, methodName, descriptor) {
        if (!descriptor) {
            target = target.prototype;
        }
        else {
            target = descriptor.value;
        }
        if (!target.addPublicRules) {
            target.addPublicRules = [];
        }
        const ruleName = "public-" + value;
        if (target.addPublicRules.indexOf(ruleName) < 0) {
            target.addPublicRules.push(ruleName);
        }
    };
}
exports.default = AddPublicRule;
