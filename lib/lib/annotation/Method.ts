import MethodType from "../bean/MethodType";
export default function Method(value: string=MethodType.All) {
  return function (target: any, methodName?: string, descriptor?: PropertyDescriptor) {
    if(!descriptor){
      target=target.prototype;
      if(!target.methodTypes){
        target.methodTypes=[];
      }
      target.methodTypes.push(value);
    }else{
      target=descriptor.value;
      if(!target.methodTypes){
        target.methodTypes=[];
      }
      target.methodTypes.push(value);
    }
  };
}
