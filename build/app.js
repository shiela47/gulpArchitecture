"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _controlles = require("./controlles");

var _controlles2 = _interopRequireDefault(_controlles);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: false,
  // memory or false
  ext: 'html',
  varControls: ["[[", "]]"] //  vue起冲突处理

}));
(0, _controlles2.default)(app, _koaSimpleRouter2.default);
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port, () => {
  console.log(`服务之node、gulp架构strated，listening on ${_config2.default.port}`);
});