import RpcResponse from "./RpcResponse";
import RpcRequest from "./RpcRequest";
import RpcInfo from "./RpcInfo";
import ActionController from "../ActionController";
import RpcNotice from "./RpcNotice";
import RpcError from "./RpcError";
export default class RpcUser {
  public rpcRequest?: RpcRequest | RpcNotice;
  private sendFun: (res: RpcResponse) => any;
  private responsed: boolean = false;
  constructor(sendFun: (res: RpcResponse) => any) {
    this.sendFun = sendFun;
  }
  public send(rpcResponse: RpcResponse) {
    if (this.rpcRequest instanceof RpcRequest && !this.responsed) {
      this.responsed = true;
      if (!rpcResponse.id) {
        rpcResponse.id = this.rpcRequest.id;
      }
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
  public  parseMessage(msg: any) {
      const id=msg.id;
      const method=msg.method;
      const params=msg.params;
      if(id){

      }else{

      }

  }
  public async on(msg: any) {
    try {
     const id=msg.id;
     const method=msg.method;
     const params=msg.params;
     if(id){

     }
    }catch (e){
    }
  }
  public async call(rpcRequest: RpcRequest) {
    try {
      this.rpcRequest = rpcRequest;
      const result = await ActionController.requestAction(rpcRequest.method, rpcRequest.params, this);
      if (result){
        this.success(result);
      } else {
        this.error(RpcInfo.NoResponse);
      }
    } catch (e) {
      if (e instanceof RpcError) {
        this.error(e);
      } else {
        this.error();
      }
    }
  }
  public async notify(rpcNotice: RpcNotice) {
    try {
      this.rpcRequest = rpcNotice;
      await ActionController.requestAction(rpcNotice.method, rpcNotice.params, this);
    } catch (e) {
    }
  }
}
