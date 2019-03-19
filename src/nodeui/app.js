import Koa from "koa";
import router from "koa-simple-router";
import config from "./config";
import controllerInit from "./controlles";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";
import errorHandler from "./middlewares/errorHandler";
import log4js from "log4js";

log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname+'/logs/sxerror.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

const app = new Koa();

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: false, // memory or false
    ext: 'html',
    varControls:["[[","]]"]   //  跟vue语法起冲突处理
  }));

errorHandler.error(app,logger);    //  容错处理

controllerInit(app,router);   // 路由初始化

app.use(serve(config.staticDir));

app.listen(config.port,()=>{
    console.log(`服务之node、gulp架构启动，listening on ${config.port}`);
})
