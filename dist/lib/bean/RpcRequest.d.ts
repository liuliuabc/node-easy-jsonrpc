export default class RpcRequest {
    jsonrpc: string;
    params: any;
    method: any;
    id: any;
    methodType?: string;
    constructor(id: any, method: string, params: any, methodType?: string);
}
