import IndexController from "./indexController";
const idxc = new IndexController();
// 路由集散中心
export default (app,router) => {
    app.use(router(_ => {
        _.get('/',idxc.indexAction());
    }))
}