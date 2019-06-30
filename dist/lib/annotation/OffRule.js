"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function OffRule(value) {
    return function (target, methodName, descriptor) {
        const action = descriptor.value;
        if (!action.offRules) {
            action.offRules = [];
        }
        if (action.offRules.indexOf(value) < 0) {
            action.offRules.push(value);
        }
    };
}
exports.default = OffRule;
