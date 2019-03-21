"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = class {
  getDate() {
    return new Promise(resolve => {
      setTimeout(function () {
        resolve("IndexAction异步数据，（by DataService.js）");
      }, 2000);
    });
  }

};