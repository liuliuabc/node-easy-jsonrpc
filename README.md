# node-easy-jsonrpc

支持http和websocket的jsonrpc工具库

## 安装步骤：

### 安装
```bash
yarn add node-easy-jsonrpc  or npm install node-easy-jsonrpc
```

## 使用

### 初始化jsonrpc引擎
```javascript
//最好在你的web应用初始化时候调用该方法，将会遍历path下的路由文件
try {
  RpcController.init(path.join(__dirname, "./src/action"), {});
  //init 第一个参数传入路由文件目录  第二个参数：接受的params默认类型（参数校验）
} catch (e) {
  console.log(e);
}
```

### action文件编写
```javascript
import {Controller, CanNull, RpcUser, Action, Index, Default, RpcError} from "node-easy-jsonrpc";
//注解不传参数就以类名或方法名为标准
@Controller()
@CanNull(true)
export default class Pay {
  @Index
  public welcome(@CanNull()  name: string, age: number, user: RpcUser) {
    return "welcome to pay index";
  }

  @Default
  public defaultAction() {
    throw RpcError.MethodNotFound;
  }

  @Action("testabc")
  public async test(@CanNull(false) name: string, age: number, user: RpcUser) {
    return user.request;
  }

  @Action()
  public test2(name: string, age: number, user: RpcUser) {
    if (name !== "lll") {
      throw RpcError.InvalidRequest;
    }
  }
}


```

### 相关http/websocket请求转发到路由

```javascript
  //http使用,以express框架为示例
  import {NextFunction, Request, Response} from "express";
  import {RpcRequest,MethodType,RpcUser,RpcResponse} from "node-easy-jsonrpc";
  const express = require("express");
  const router = express.Router();
  router.all("/", (req: Request, res: Response, next: NextFunction) => {
    const body = Object.keys(req.query).length > 0 ? req.query : req.body;
    const requestType=req.method==="POST"?MethodType.Post:MethodType.Get;
    const request = new RpcRequest(body.id, body.method, body.params,requestType);
    new RpcUser((data: RpcResponse) => {
      res.json(data);
    }).call(request);
  });
  module.exports = router;


  //websocket,以ws框架为示例
  const server = new WebSocket.Server({port: 8080});
    server.on("connection", async (ws: WebSocket, req: IncomingMessage) => {
      ws.on("message", (msg: string) => {
         const msgJson=JSON.parse(msg);
         const request=new RpcRequest(msgJson.id,msgJson.method,msgJson.params,MethodType.Ws);
         new RpcUser((data: RpcResponse) => {
               ws.send(JSON.stringfy(res));
             }).call(request);
      });
    });


```