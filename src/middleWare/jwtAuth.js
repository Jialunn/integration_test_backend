const koaJwt = require('koa-jwt')
const { JWT_PRIVATE_KEY } = require('../conf/constant')

const jwtAuth = koaJwt({
    secret: JWT_PRIVATE_KEY
}).unless({
    path: [
        '/',
        '/benchmark_test',
    ],
})

module.exports = jwtAuth
