export default class RpcNotice {
  public jsonrpc: string = "2.0";
  public method: string;
  public params: any;
  constructor(method: string, params: object={}) {
    this.method = method;
    this.params = params;
  }
}
