const router = require('koa-router')()
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Integration test API Doc',
        version: '0.0.1',
        description: 'API doc of integration test platform',
    },
    host: 'localhost:5158',
    basePath: '/'
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options)

// 通过路由获取生成的注解文件
router.get('/doc/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})

module.exports = router
