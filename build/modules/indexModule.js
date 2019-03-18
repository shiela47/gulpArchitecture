"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// import { resolve } from "dns";
// import {resolve,reject} from "any-promise";

/**
 * @fileoverview 实现index数据模型
 * @author 1020044879@qq.com
 */

/**
 * IndexModule类，生成一段异步数据
 * @class
 */
class IndexModle {
  /**
   * @constructor
   * @param {string} app koa2上下文
   */
  constructor(app) {}
  /**
       * 获取具体数据的API接口
       * @returns {Promise} 返回异步数据
       * @example
       * return new Promise
       * getDate()
       */


  getDate() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve("IndexAction异步数据，（by indexModule.js）");
      }, 2000);
    });
  }

}

exports.default = IndexModle;