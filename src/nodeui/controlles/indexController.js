"use strict";

import IndexModle from "../modules/indexModule";

class IndexController{
    constructor (){

    }
    indexAction(){
        return async (ctx,next) => {
            // ctx.body = "hello 时光";
            // ctx.body = await ctx.render("index");
            const IdxModule = new IndexModle();
            const result = await IdxModule.getDate();
            ctx.body = await ctx.render("index",{
                data:result
            })
        }
    }
}

export default IndexController;

