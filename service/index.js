function service() {
    const Koa = require('koa');
    const bodyParser = require('koa-bodyparser');
    const router = require('./router/model');
    const app = new Koa();

    app
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods());


    app.listen(8089, () => {
        console.log('开启8089端口')
    });
}

module.exports = service;