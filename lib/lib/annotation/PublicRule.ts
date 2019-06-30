import RpcController from "../controller/RpcController";
import SetParamType from "../util/SetParamType";
export default function PublicRule(value?: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const name = value ? value : methodName;
    RpcController.publicRules.set("public-"+name,descriptor.value);
    SetParamType(target,methodName);
  };
}
