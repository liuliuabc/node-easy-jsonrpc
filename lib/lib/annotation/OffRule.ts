export default function OffRule(value: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor){
    const action=descriptor.value;
    if(!action.offRules){
      action.offRules=[];
    }
    if(action.offRules.indexOf(value)<0){
      action.offRules.push(value);
    }
  };
}
