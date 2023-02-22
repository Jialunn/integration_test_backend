const router = require('koa-router')()

/**
 * @swagger
 * /:
 *   get:
 *     tags: 
 *       - index
 *     description:  Endpoint for everything
 *     responses:
 *       '200':
 *          description: OK
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
 *     tags: 
 *       - index
 *     description:  test response
 *     responses:
 *       '200':
 *          description: OK
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
