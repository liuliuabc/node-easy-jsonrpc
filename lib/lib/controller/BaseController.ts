import Controller from "../annotation/Controller";
import Method from "../annotation/Method";
import CanNull from "../annotation/CanNull";
@Controller()
@CanNull(false)
@Method()
export default class BaseController {
  /*@Action("index")
  public onIndex(params: any, user: RpcUser) {
    user.success("welcome you");
  };
  @Action("default")
  public onDefault(params: any, user: RpcUser) {
    throw RpcError.MethodNotFound;
  };*/
}
