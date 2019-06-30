try {
  require("reflect-metadata");
} catch (e) {
}
export default function Action(target: any, methodName: string) {
  try {
    // @ts-ignore
    const paramtypes = Reflect.getMetadata("design:paramtypes", target, methodName);
    /*const funStr=descriptor.value.toString();
     const paramNames = funStr.substring(funStr.indexOf("(") + 1,
     funStr.indexOf(")")).replace(/ /g, "").split(",");*/
    for (let i = 0; i < paramtypes.length; i++) {
      if(target[methodName]["type-" + i]){
        continue;
      }
      const paramtype = paramtypes[i].name;
      const lower = paramtype.toLowerCase();
      target[methodName]["type-" + i] = lower;
      /*
      if (lower === "object" || lower === "number" || lower === "boolean" || lower === "string"|| lower === "array") {
        descriptor.value["type-" + i] = lower;
      } else {
        descriptor.value["type-" + i] = paramtype;
      }*/
    }
  } catch (e) {
  }
}
