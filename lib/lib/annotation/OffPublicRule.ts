export default function OffPublicRule(value: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const action=descriptor.value;
    if(!action.offPublicRules){
      action.offPublicRules=[];
    }
    const ruleName="public-"+value;
    if(action.offPublicRules.indexOf(ruleName)<0){
      action.offPublicRules.push(ruleName);
    }
  };
}
