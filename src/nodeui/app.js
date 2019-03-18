import Koa from "koa";
import router from "koa-simple-router";
import config from "./config";
import controllerInit from "./controlles";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";

const app = new Koa();

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: false, // memory or false
    ext: 'html',
    varControls:["[[","]]"]   //  跟vue语法起冲突处理
  }));

controllerInit(app,router);

app.use(serve(config.staticDir));

app.listen(config.port,()=>{
    console.log(`服务之node、gulp架构strated，listening on ${config.port}`);
})
