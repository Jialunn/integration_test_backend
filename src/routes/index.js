const router = require('koa-router')()

/**
 * @swagger
 * /:
 *   get:
 *     description:  Endpoint for everything
 */
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

/**
 * @swagger
 * /string:
 *   get:
 *     description:  test response
 */
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
