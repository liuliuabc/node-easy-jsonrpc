"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function OffPublicRule(value) {
    return function (target, methodName, descriptor) {
        const action = descriptor.value;
        if (!action.offPublicRules) {
            action.offPublicRules = [];
        }
        const ruleName = "public-" + value;
        if (action.offPublicRules.indexOf(ruleName) < 0) {
            action.offPublicRules.push(ruleName);
        }
    };
}
exports.default = OffPublicRule;
