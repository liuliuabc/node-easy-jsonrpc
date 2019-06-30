export default class RpcNotice {
  public jsonrpc: string = "2.0";
  public method: string;
  public params: any;
  public methodType?: string;
  constructor(method: string, params: object={},methodType?:string) {
    this.method = method;
    this.params = params;
    this.methodType = methodType;
  }
}
