//import RpcController from "../controller/RpcController";
//export const targets = new Map();
export default function Controller(value?: string) {
  return function (target: any) {
    target.contollerName=(value ? value : target.name).toLowerCase();
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
