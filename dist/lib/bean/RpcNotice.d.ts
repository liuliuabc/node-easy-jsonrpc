export default class RpcNotice {
    jsonrpc: string;
    method: string;
    params: any;
    methodType?: string;
    constructor(method: string, params?: object, methodType?: string);
}
