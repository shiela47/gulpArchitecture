"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: __dirname + '/logs/sxerror.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});

const logger = _log4js2.default.getLogger('cheese');

const app = new _koa2.default(); // 创建IOC容器

const container = (0, _awilix.createContainer)(); // 每一次请求都创建一个独立的作用域(相当于new一次类)
// 实现所有的service用切面的方式自动注入到controller

app.use((0, _awilixKoa.scopePerRequest)(container)); // 装载service

container.loadModules([__dirname + '/service/*.js'], {
  formatName: "camelCase",
  // 将第一个字母转为小写
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED // 生命周期

  }
});
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory',
  // memory or false
  ext: 'html',
  varControls: ["[[", "]]"],
  //  跟vue语法起冲突处理
  writeBody: false
}));

_errorHandler2.default.error(app, logger); //  容错处理
// 自动注册所有的路由


app.use((0, _awilixKoa.loadControllers)('controlles/*.js', {
  cwd: __dirname
}));
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port, () => {
  console.log(`服务之node、gulp架构启动，listening on ${_config2.default.port}`);
});