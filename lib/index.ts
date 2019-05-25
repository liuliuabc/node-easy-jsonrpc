import RpcController from "./model/RpcController";
import RpcUserClass from "./model/RpcUser";
import RpcErrorClass from "./model/RpcError";
import RpcRequestClass from "./model/RpcRequest";
import RpcResponseClass from "./model/RpcResponse";
import RpcNoticeClass from "./model/RpcNotice";
export default RpcController;
export class RpcUser extends RpcUserClass{}
export class RpcError extends RpcErrorClass{}
export class RpcRequest extends RpcRequestClass{}
export class RpcResponse extends RpcResponseClass{}
export class RpcNotice extends RpcNoticeClass{}
