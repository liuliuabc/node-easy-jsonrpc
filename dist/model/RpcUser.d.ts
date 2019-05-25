import RpcResponse from "./RpcResponse";
import RpcRequest from "./RpcRequest";
import RpcNotice from "./RpcNotice";
export default class RpcUser {
    rpcRequest?: RpcRequest | RpcNotice;
    private sendFun;
    private responsed;
    constructor(sendFun: (res: RpcResponse) => any);
    send(rpcResponse: RpcResponse): void;
    success(result?: any): void;
    error(error?: any): void;
    parseMessage(msg: any): void;
    on(msg: any): Promise<void>;
    call(rpcRequest: RpcRequest): Promise<void>;
    notify(rpcNotice: RpcNotice): Promise<void>;
}
