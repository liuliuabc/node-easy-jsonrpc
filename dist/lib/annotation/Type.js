"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Type(value) {
    return function (target, name, index) {
        target[name]["type-" + index] = value;
    };
}
exports.default = Type;
