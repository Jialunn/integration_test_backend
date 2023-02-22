const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const { koaSwagger } = require('koa2-swagger-ui')

const swagger = require('./utils/swagger')
const index = require('./routes/index')
const admin = require('./routes/admin')
const benchmarkTest = require('./routes/benchmarkTest')

const jwtAuth = require('./middleWare/jwtAuth')

const { isProd } = require('./utils/env')
const { el } = require('date-fns/locale')

// cors
app.use(cors())

// 401 error
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = new ErrorModel({
        error: 300,
        data: {
          msg: 'token验证失败'
        }
      });
    } else {
      throw err
    }
  })
})

// error handler
onerror(app)

// middlewares
if (!isProd) {
  app.use(koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/doc/swagger.json',
    },
  }))
} else {
  app.use(jwtAuth)
}
// app.use(jwtAuth)
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(benchmarkTest.routes(), benchmarkTest.allowedMethods())
app.use(swagger.routes(), swagger.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
