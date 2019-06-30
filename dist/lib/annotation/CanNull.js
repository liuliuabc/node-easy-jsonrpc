"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CanNull(value = true) {
    return function (target, name, descriptor) {
        if (descriptor === undefined) {
            target.prototype.canNull = value;
        }
        else {
            if (name && typeof descriptor === "number") {
                target[name]["canNull-" + descriptor] = value;
            }
            else {
                descriptor.value.canNull = value;
            }
        }
    };
}
exports.default = CanNull;
