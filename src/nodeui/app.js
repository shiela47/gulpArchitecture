import Koa from "koa";
import router from "koa-simple-router";
import config from "./config";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";
import errorHandler from "./middlewares/errorHandler";
import log4js from "log4js";
import { asClass, asValue, createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa"; 

log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname+'/logs/sxerror.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

const app = new Koa();

// 创建IOC容器
const container = createContainer();
  // 每一次请求都创建一个独立的作用域(相当于new一次类)
  // 实现所有的service用切面的方式自动注入到controller
app.use(scopePerRequest(container));
// 装载service
container.loadModules([__dirname+'/service/*.js'],{
    formatName:"camelCase",   // 将第一个字母转为小写
    resolverOptions: {
      lifetime: Lifetime.SCOPED   // 生命周期
    }
});

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // memory or false
    ext: 'html',
    varControls:["[[","]]"],   //  跟vue语法起冲突处理
    writeBody:false
  }));

errorHandler.error(app,logger);    //  容错处理

// 自动注册所有的路由
app.use(loadControllers('controlles/*.js', { cwd: __dirname }))

app.use(serve(config.staticDir));

app.listen(config.port,()=>{
    console.log(`服务之node、gulp架构启动，listening on ${config.port}`);
})
