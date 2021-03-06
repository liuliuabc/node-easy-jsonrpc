export default class RpcResponse {
  public jsonrpc: string = "2.0";
  public id: any;
  public result?: any;
  public error?: any;
  constructor(id?: any, result?: any, error?: any) {
    this.id = id;
    this.result = result;
    this.error = error;
  }
}
