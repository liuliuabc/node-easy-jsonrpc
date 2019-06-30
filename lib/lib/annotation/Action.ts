import SetParamType from "../util/SetParamType";
export default function Action(value?: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    if (!target.actions) {
      target.actions = new Map();
    }
    const name = value ? value : methodName;
    target.actions.set(name.toLowerCase(), descriptor.value);
    SetParamType(target,methodName);
  };
}
