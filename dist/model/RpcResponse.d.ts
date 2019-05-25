export default class RpcResponse {
    jsonrpc: string;
    id: any;
    result?: any;
    error?: any;
    constructor(id?: any, result?: any, error?: any);
    safeResult(result?: any): any;
    safeError(error?: any): any;
}
