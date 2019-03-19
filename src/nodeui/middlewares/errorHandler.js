const errorHandler = {
    error(app,logger){
        app.use(async(ctx,next)=>{
            try {
                await next();
            } catch (error) {
                // console.log("错误提示：");
                // console.log(error);
                logger.error(error);                       // 将错误日志记录到log4js指定的目录下
                ctx.status = ctx.status || 200;     // 出错时不设为500的原因是防止网站降权
                ctx.body = "后台出错了...";
            }
        });

        // 404容错处理
        app.use(async(ctx,next)=>{
            await next();
            if(ctx.status != 404) return;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>'
        });
    }
};
export default errorHandler;
