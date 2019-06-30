export default function AddPublicRule(value: string) {
  return function (target: any, methodName?: string, descriptor?: PropertyDescriptor) {
    if(!descriptor){
      target=target.prototype;
    }else{
      target=descriptor.value;
    }
    if(!target.addPublicRules){
      target.addPublicRules=[];
    }
    const ruleName="public-"+value;
    if(target.addPublicRules.indexOf(ruleName)<0){
      target.addPublicRules.push(ruleName);
    }
  };
}
