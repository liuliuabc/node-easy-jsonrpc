export default function AddRule(value: string) {
  return function (target: any, methodName?: string, descriptor?: PropertyDescriptor) {
    if(!descriptor){
      target=target.prototype;
    }else{
      target=descriptor.value;
    }
    if(!target.addRules){
      target.addRules=[];
    }
    if(target.addRules.indexOf(value)<0){
      target.addRules.push(value);
    }
  };
}
