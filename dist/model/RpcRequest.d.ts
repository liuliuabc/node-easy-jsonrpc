export default class RpcRequest {
    jsonrpc: string;
    params: any;
    method: any;
    id: any;
    constructor(id: any, method: string, params: any);
}
