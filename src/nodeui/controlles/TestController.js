import {
    route,
    GET
} from "awilix-koa";

export default
@route("/test")
class TestController {
    @GET()
    async indexAction(ctx) {
        ctx.body = "this is testController...."
    }
}