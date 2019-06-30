export default function CanNull(value: boolean=true) {
  return function (target: any, name?: string, descriptor?: any) {
    if(descriptor===undefined){
      target.prototype.canNull=value;
    }else{
      if(name&&typeof descriptor==="number"){
        target[name]["canNull-"+descriptor]=value;
      }else{
        descriptor.value.canNull=value;
      }
    }
  };
}
