const router = require('koa-router')()

router.prefix('/integration_test')

router.get('/list', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

router.get('/list', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

router.get('/list', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

router.get('/list', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

router.get('/list', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

module.exports = router