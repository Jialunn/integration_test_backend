const koaJwt = require('koa-jwt')
const { JWT_PRIVATE_KEY } = require('../conf/constant')

const jwtAuth = koaJwt({
    secret: JWT_PRIVATE_KEY
}).unless({
    path: [
        '/',
        '/cuBNiqVwMC.txt',
        '/vue-element-admin/user/login',
        '/vue-element-admin/user/info',
        '/images/1.jpg',
        '/img/device.xlsx',
        '/weixin/device/cuBNiqVwMC.txt',
        '/api/customer/pay',
	    '/api/customer/storeInfo',
        '/api/store/order/week',
        '/api/store/flow/week',
        '/api/store/order/month',
        '/api/store/flow/month',
        '/api/store/order/day',
        '/api/store/flow/day',
        '/api/store/order/total',
        '/api/store/flow/total',
        '/api/store/password',
        '/api/store/info',
        '/api/store/ownerID',
        '/api/device/getMac',
        '/api/device_count/change',
        '/api/cash_out',
	    '/statistic/list',
	    '/statistic',
        '/api/store/cash'
    ],
})

module.exports = jwtAuth
