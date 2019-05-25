import RpcResponse from "./RpcResponse";
import RpcRequest from "./RpcRequest";
import RpcNotice from "./RpcNotice";
export default class RpcUser {
    requestMethod: string;
    requestParams: any;
    private requestId;
    private sendFun?;
    private responsed;
    send(rpcResponse: RpcResponse): void;
    success(result?: any): void;
    error(error?: any): void;
    call(rpcRequest: RpcRequest, send: (data: RpcResponse) => any): Promise<void>;
    notify(rpcNotice: RpcNotice): Promise<void>;
}
