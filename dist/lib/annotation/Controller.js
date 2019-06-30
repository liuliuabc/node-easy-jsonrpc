"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import RpcController from "../controller/RpcController";
//export const targets = new Map();
function Controller(value) {
    return function (target) {
        target.contollerName = (value ? value : target.name).toLowerCase();
        /*let targetInstance = targets.get(target);
        const name = value ? value : target.name;
        if (!targetInstance) {
          targetInstance = new target();
          targetInstance.actions=new Map();
          targetInstance.rules=new Map();
        }
        RpcController.controllers.set(name, targetInstance);*/
    };
}
exports.default = Controller;
