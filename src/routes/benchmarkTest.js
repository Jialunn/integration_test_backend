const router = require('koa-router')()
const mongo_client = require('../db/mongo')
const { MONGO_CONF } = require('../conf/db')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

router.prefix('/benchmark_test')

// TODO 分页参数化
// TODO 写API文档
router.post('/list', async function (ctx, next) {
    // TODO Validation
    const type = ctx.request.body.test_type
    const page = ctx.request.body.page
    const success = ctx.request.body.success

    
    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    let query = {}
    if (String(success) === 'undefined') {
        query = {}
    } else {
        query = { success: success }
    }
    console.log(success)
    console.log(query)
    const result = await collection.find(query).skip(Number(page) * 10).limit(10).toArray()
    await mongo_client.close()
    ctx.body = new SuccessModel(result)
})

router.post('/list_by_repo_and_version', async function (ctx, next) {
    // TODO Validation
    const repo = ctx.request.body.repo
    const type = ctx.request.body.test_type
    const version = ctx.request.body.version
    const success = ctx.request.body.success
    const page = ctx.request.body.page


    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    let query = {}
    if (String(success) === 'undefined') {
        query = { repo: repo, test_version: version }
    }else{
        query = { repo: repo, test_version: version, success: success }
    }
    const result = await collection.find(query).skip(Number(page) * 10).limit(10).toArray()
    await mongo_client.close()
    ctx.body = new SuccessModel(result)
})

router.post('/list_by_repo_and_branch', async function (ctx, next) {
    // TODO Validation
    const repo = ctx.request.body.repo
    const type = ctx.request.body.test_type
    const branch = ctx.request.body.branch
    const success = ctx.request.body.success
    const page = ctx.request.body.page


    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    let query = {}
    if (String(success) === 'undefined') {
        query = { repo: repo, branch: branch }
    } else {
        query = { repo: repo, branch: branch, success: success }
    }
    const result = await collection.find(query).skip(Number(page) * 10).limit(10).toArray()
    await mongo_client.close()
    ctx.body = new SuccessModel(result)
})

// 似乎不太需要添加元素
router.post('/add_item', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

router.post('/delete_item_by_id', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

router.post('/update_item_by_id', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

// 1. 启动一种测试，调用jenkins，添加记录。可以设置是只做测试还是只训练还是都做。
// 2. 上面展示的是测试结果的总列表，其实有点鸡肋。
//    下面真正要展示的是从网页启动的测试的量。
//    需要计算本周内的进行的测试数量，成功率
// 3. 获取测试的进度，并且同一时间只能有一个测试在进行，剩下的都将排队。队列可操作
// 4. 


module.exports = router