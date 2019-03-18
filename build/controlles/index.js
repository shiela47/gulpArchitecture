"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexController = require("./indexController");

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const idxc = new _indexController2.default(); // 路由集散中心

exports.default = (app, router) => {
  app.use(router(_ => {
    _.get('/', idxc.indexAction());
  }));
};