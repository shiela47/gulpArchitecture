"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexModule = require("../modules/indexModule");

var _indexModule2 = _interopRequireDefault(_indexModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexController {
  constructor() {}

  indexAction() {
    return async (ctx, next) => {
      // ctx.body = "hello 时光";
      // ctx.body = await ctx.render("index");
      const IdxModule = new _indexModule2.default();
      const result = await IdxModule.getDate();
      ctx.body = await ctx.render("index", {
        data: result
      });
    };
  }

}

exports.default = IndexController;