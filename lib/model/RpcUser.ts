import RpcResponse from "./RpcResponse";
import RpcRequest from "./RpcRequest";
import RpcInfo from "./RpcInfo";
import RpcController from "./RpcController";
import RpcNotice from "./RpcNotice";
import RpcError from "./RpcError";
export default class RpcUser {
  public requestMethod: string="";
  public requestParams: any;
  private requestId: any;
  private sendFun?: (res: RpcResponse) => any;
  private responsed: boolean = false;
  public send(rpcResponse: RpcResponse) {
    if (this.sendFun&& !this.responsed) {
      this.responsed = true;
      rpcResponse.id = this.requestId;
      this.sendFun(rpcResponse);
    }
  }
  public success(result: any = true) {
    const response = new RpcResponse();
    response.result = result;
    this.send(response);
  }
  public error(error: any = RpcInfo.InternalError) {
    const response = new RpcResponse();
    response.error = error;
    this.send(response);
  }
  public async call(rpcRequest: RpcRequest,send:(data:RpcResponse)=>any) {
    try {
      this.sendFun = send;
      this.requestMethod = rpcRequest.method;
      this.requestParams = rpcRequest.params;
      this.requestId = rpcRequest.id;
      const result = await RpcController.requestAction(rpcRequest.method, rpcRequest.params, this);
      if (result){
        this.success(result);
      } else {
        this.error(RpcInfo.NoResponse);
      }
    } catch (e){
      if (e instanceof RpcError){
        this.error(e);
      } else {
        this.error();
      }
    }
  }
  public async notify(rpcNotice: RpcNotice) {
    try {
      this.requestMethod = rpcNotice.method;
      this.requestParams = rpcNotice.params;
      await RpcController.requestAction(rpcNotice.method, rpcNotice.params, this);
    } catch (e) {
    }
  }
}
