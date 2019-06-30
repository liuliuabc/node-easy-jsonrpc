import SetParamType from "../util/SetParamType";

export default function Rule(value?: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    if(!target.rules){
      target.rules=new Map();
    }
    const name = value ? value : methodName;
    target.rules.set(name,descriptor.value);
    SetParamType(target,methodName);
  };
}
