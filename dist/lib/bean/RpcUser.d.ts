import RpcResponse from "./RpcResponse";
import RpcRequest from "./RpcRequest";
import RpcNotice from "./RpcNotice";
export default class RpcUser {
    request?: RpcRequest;
    notice?: RpcNotice;
    isNotice?: boolean;
    private send?;
    private responsed;
    constructor(send?: (res: RpcResponse) => any);
    doSend(rpcResponse: RpcResponse): void;
    success(result?: any): RpcResponse;
    error(error?: any): RpcResponse;
    redirect(method: string, params?: any): Promise<any>;
    call(request: RpcRequest): Promise<void>;
    notify(notice: RpcNotice): Promise<void>;
}
