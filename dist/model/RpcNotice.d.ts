export default class RpcNotice {
    jsonrpc: string;
    method: string;
    params: any;
    constructor(method: string, params?: object);
}
