export default class RpcRequest {
  public jsonrpc: string = "2.0";
  public params: any;
  public method: any;
  public id: any;
  constructor(id: any, method: string, params: any) {
    this.id = id;
    this.method = method;
    this.params = params;
  }
}
