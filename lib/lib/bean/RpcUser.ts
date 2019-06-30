import RpcResponse from "./RpcResponse";
import RpcRequest from "./RpcRequest";
import RpcInfo from "./RpcInfo";
import RpcController from "../controller/RpcController";
import RpcNotice from "./RpcNotice";
import RpcError from "./RpcError";
export default class RpcUser {
  public request?: RpcRequest;
  public notice?: RpcNotice;
  public isNotice?: boolean;
  private send?: (res: RpcResponse) => any;
  private responsed: boolean = false;
  constructor(send?: (res: RpcResponse) => any){
     this.send=send;
  }
  public doSend(rpcResponse: RpcResponse) {
    if (!this.isNotice&&this.send && !this.responsed) {
      this.responsed = true;
      rpcResponse.id = this.request!!.id;
      this.send(rpcResponse);
    }
  }
  public success(result: any = true) {
    const response = new RpcResponse();
    response.result = result;
    this.doSend(response);
    return response;
  }

  public error(error: any = RpcInfo.InternalError) {
    const response = new RpcResponse();
    response.error = error;
    this.doSend(response);
    return response;
  }

  public redirect(method: string, params: any=this.isNotice?this.notice!!.params:this.request!!.params) {
    const methodType=this.isNotice?this.notice!!.methodType:this.request!!.methodType;
    return RpcController.requestAction(method, params,methodType, this);
  }
  public async call(request: RpcRequest) {
    this.isNotice=false;
    try {
      this.request = request;
      const result = await RpcController.requestAction(request.method, request.params,request.methodType, this);
      this.success(result);
    } catch (e) {
      console.log(e);
      if (e instanceof RpcError) {
        this.error(e);
      } else {
        this.error();
      }
    }
  }
  public async notify(notice: RpcNotice) {
    this.isNotice=true;
    try {
      this.notice = notice;
      await RpcController.requestAction(notice.method, notice.params,notice.methodType, this);
    } catch (e) {
    }
  }
}
