const router = require('koa-router')()

router.prefix('/scheduler')

router.get('/statusList', async function (ctx, next) {

    ctx.body = {
        scheduler: 'ok'
    }
})

router.get('/enableDaily', async function (ctx, next) {
    ctx.body = {
        scheduler: 'ok'
    }
})

router.get('/enablePoller', async function (ctx, next) {
    ctx.body = {
        scheduler: 'ok'
    }
})

router.get('/disableDaily', async function (ctx, next) {
    ctx.body = {
        scheduler: 'ok'
    }
})

router.get('/disablePoller', async function (ctx, next) {
    ctx.body = {
        scheduler: 'ok'
    }
})

module.exports = router