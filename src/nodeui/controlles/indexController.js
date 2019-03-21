import {
    route,
    GET
} from "awilix-koa";

export default
@route("/")
@route("/index.html")
class IndexController {
    constructor({dataService}) { 
        this.dataService = dataService;
    }
    @GET()
    async indexAction(ctx) {
        // ctx.query (ajax)、ctx.params.id ("test/:id")
        const result = await this.dataService.getDate();
        ctx.body = await ctx.render("index", {
            data: result
        })
    }
}