export default function Type(value:any) {
  return function (target: any, name: string, index: number) {
    target[name]["type-"+index]=value;
  };
}
