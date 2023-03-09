const router = require('koa-router')()
const mongo_client = require('../db/mongo')
const ObjectId = require('mongodb').ObjectId
const { MONGO_CONF } = require('../conf/db')
const { SuccessModel, ErrorModel, PageSuccessModel } = require('../model/ResModel')

router.prefix('/benchmark_test')


// 测试结果界面
// 1. 展示所有（单个测试）的测试结果，并添加两种筛选。如果要筛选，就必须验证筛选的所有参数必须填写
// 
// TODO 分页参数化

/**
 * @swagger
 * /benchmark_test/list:
 *   post:
 *     tags:
 *       - benchmark_test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               test_type:
 *                  type: string
 *                  default: test
 *               success:
 *                  type: boolean
 *                  default: true
 *               page:
 *                  type: number
 *                  default: 1
 *               page_size:
 *                  type: number
 *                  default: 10
 *             required:
 *                - test_type
 *                - page
 *                - page_size
 *     responses:
 *       '200':
 *          description: OK
 */
router.post('/list', async function (ctx, next) {
    // TODO Validation
    const type = ctx.request.body.test_type
    const page = ctx.request.body.page
    const page_size = ctx.request.body.page_size
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
    const result = await collection.find(query).skip((Number(page) - 1) * Number(page_size)).limit(10).toArray()
    const pageNo = await collection.countDocuments(query)
    await mongo_client.close()
    ctx.body = new PageSuccessModel(result, page_size, pageNo)
})

/**
 * @swagger
 * /benchmark_test/list_by_repo_and_version:
 *   post:
 *     tags:
 *       - benchmark_test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repo:
 *                 type: string
 *                 default: mmdetection
 *               test_type:
 *                  type: string
 *                  default: test
 *               version:
 *                  type: string
 *                  default: benchmark_mmdet_20230220
 *               success:
 *                  type: boolean
 *                  default: true
 *               page:
 *                  type: number
 *                  default: 1
 *               page_size:
 *                  type: number
 *                  default: 10
 *             required:
 *                - id
 *                - test_type
 *                - version
 *                - page
 *                - page_size
 *     responses:
 *       '200':
 *          description: OK
 */
router.post('/list_by_repo_and_version', async function (ctx, next) {
    // TODO Validation
    const repo = ctx.request.body.repo
    const type = ctx.request.body.test_type
    const version = ctx.request.body.version
    const success = ctx.request.body.success
    const page = ctx.request.body.page
    const page_size = ctx.request.body.page_size


    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    let query = {}
    if (String(success) === 'undefined') {
        query = { repo: repo, test_version: version }
    }else{
        query = { repo: repo, test_version: version, success: success }
    }
    const result = await collection.find(query).skip((Number(page) - 1) * Number(page_size)).limit(10).toArray()
    const pageNo = await collection.countDocuments(query)
    await mongo_client.close()
    ctx.body = new PageSuccessModel(result, page_size, pageNo)
})

/**
 * @swagger
 * /benchmark_test/list_by_repo_and_branch:
 *   post:
 *     tags:
 *       - benchmark_test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repo:
 *                 type: string
 *                 default: mmdetection
 *               test_type:
 *                  type: string
 *                  default: test
 *               branch:
 *                  type: string
 *                  default: 3.0.0rc5
 *               success:
 *                  type: boolean
 *                  default: true
 *               page:
 *                  type: number
 *                  default: 1
 *               page_size:
 *                  type: number
 *                  default: 10
 *             required:
 *                - id
 *                - test_type
 *                - branch
 *                - page
 *                - page_size
 *     responses:
 *       '200':
 *          description: OK
 */
router.post('/list_by_repo_and_branch', async function (ctx, next) {
    // TODO Validation
    const repo = ctx.request.body.repo
    const type = ctx.request.body.test_type
    const branch = ctx.request.body.branch
    const success = ctx.request.body.success
    const page = ctx.request.body.page
    const page_size = ctx.request.body.page_size


    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    let query = {}
    if (String(success) === 'undefined') {
        query = { repo: repo, branch: branch }
    } else {
        query = { repo: repo, branch: branch, success: success }
    }
    const result = await collection.find(query).skip((Number(page) - 1) * Number(page_size)).limit(10).toArray()
    const pageNo = await collection.countDocuments(query)
    await mongo_client.close()
    ctx.body = new PageSuccessModel(result, page_size, pageNo)
})


// 似乎不太需要添加元素
router.post('/add_item', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

/**
 * @swagger
 * /benchmark_test/delete_item_by_id:
 *   post:
 *     tags:
 *       - benchmark_test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: 63e1fc9c3d747ae0f419e2cb
 *               test_type:
 *                  type: string
 *                  default: test
 *             required:
 *                - id
 *                - test_type
 *     responses:
 *       '200':
 *          description: OK
 */
router.post('/delete_item_by_id', async function (ctx, next) {
    // TODO Validation
    const id = ctx.request.body.id
    const type = ctx.request.body.test_type

    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    const result = await collection.deleteMany({ _id: new ObjectId(id) })
    await mongo_client.close()
    ctx.body = new SuccessModel(result)
})


// TODO 需要设计一个前端页面，多行输入框类型，返回值可以看是否修改成功
/**
 * @swagger
 * /benchmark_test/update_item_by_id:
 *   post:
 *     tags:
 *       - benchmark_test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: 63e1fd7b3d747ae0f419e2cd
 *               test_type:
 *                  type: string
 *                  default: test
 *               data: 
 *                  type: object
 *                  default: {"success": true}
 *             required:
 *                - id
 *                - test_type
 *                - data
 *     responses:
 *       '200':
 *          description: OK
 */
router.post('/update_item_by_id', async function (ctx, next) {
    // TODO Validation
    const id = ctx.request.body.id
    const type = ctx.request.body.test_type
    const data = ctx.request.body.data

    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    console.log(data)
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
    await mongo_client.close()
    ctx.body = new SuccessModel(result)
})


/**
 * @swagger
 * /benchmark_test/get_model_history:
 *   post:
 *     tags:
 *       - benchmark_test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repo:
 *                 type: string
 *                 default: mmdetection
 *               config: 
 *                  type: string
 *                  default: configs/atss/atss_r50_fpn_1x_coco.py
 *               test_type:
 *                  type: string
 *                  default: test
 *               page: 
 *                  type: string
 *                  default: 1
 *               page_size: 
 *                  type: string
 *                  default: 10
 *             required:
 *                - name
 *                - config
 *                - test_type
 *                - page
 *                - page_size
 *     responses:
 *       '200':
 *          description: OK
 */
router.post('/get_model_history', async function (ctx, next) {
    // TODO Validation
    const type = ctx.request.body.test_type
    const model = ctx.request.body.model
    const repo = ctx.request.body.repo
    const page = ctx.request.body.page
    const page_size = ctx.request.body.page_size
    const success = ctx.request.body.success

    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection(type)
    let query = {}
    if (String(success) === 'undefined') {
        query = { repo: repo, case: model }
    } else {
        query = { repo: repo, case: model, success: success }
    }
    const result = await collection.find(query).skip((Number(page) - 1) * Number(page_size)).limit(Number(page_size)).toArray()
    const pageNo = await collection.countDocuments(query)
    await mongo_client.close()
    ctx.body = new PageSuccessModel(result, page_size, pageNo)
})


// 总测试界面
// 1. 启动一种测试，调用jenkins，添加记录。可以设置是只做测试还是只训练还是都做。
// 2. 上面展示的是测试结果的总列表，其实有点鸡肋。
//    下面真正要展示的是从网页启动的测试的量。
//    需要计算本周内的进行的测试数量，成功率
// 3. 获取测试的进度，并且同一时间只能有一个测试在进行，剩下的都将排队。队列可操作
// TODO 选择一种数据库，看是直接使用mongodb还是另外新增一个mysql。先试试前者

// 启动测试
// 将测试用例的参数列表放入队列中
// 暂时就直接转到jenkins算了，后续再看，大概率是没有做的必要
router.post('/start_a_test', async function (ctx, next) {
    ctx.body = new ErrorModel({}, 'WIP')
})

// 列表中新增一条测试，从测试框架直接调用
router.post('/add_group', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

/**
 * @swagger
 * /benchmark_test/list_group:
 *   post:
 *     tags:
 *       - benchmark_test
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               test_type:
 *                  type: string
 *                  default: test
 *               page:
 *                  type: number
 *                  default: 1
 *               page_size:
 *                  type: number
 *                  default: 10
 *             required:
 *                - page
 *                - page_size
 *     responses:
 *       '200':
 *          description: OK
 */
router.post('/list_group', async function (ctx, next) {
    // TODO Validation
    const type = ctx.request.body.test_type
    const page = ctx.request.body.page
    const page_size = ctx.request.body.page_size


    await mongo_client.connect()
    const db = mongo_client.db(MONGO_CONF.database)
    const collection = db.collection('list')
    let query = {}
    if (String(type) === 'undefined') {
        query = {}
    } else {
        query = { task_type: type }
    }
    const result = await collection.find(query).skip((Number(page) - 1) * Number(page_size)).limit(10).toArray()
    const pageNo = await collection.countDocuments(query)
    await mongo_client.close()
    ctx.body = new PageSuccessModel(result, page_size, pageNo)
})

router.post('/delete_group_by_id', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

router.post('/update_group_by_id', async function (ctx, next) {
    ctx.body = {
        benchmark_test: 'ok'
    }
})

// 是否要从管道中取任务出来执行
router.post('/test_enable_switch', async function (ctx, next) {
    ctx.body = {
        benchmark_test: new ErrorModel({}, 'WIP')
    }
})

router.get('/get_week_status', async function (ctx, next) {
    ctx.body = {
        benchmark_test: new ErrorModel({}, 'WIP')
    }
})

// 单个模型测试结果展示
// 1. 历史数据画图展示
//    baseline画红线，实际数据画折线
//    有几种结果就画几种数据，这个需要设计一下算法，空白就是0。理论上是先做一个桶把数据装进去了再倒出来排列
// 2. 展示单个模型的历史数据的列表（就是上面所展示的图的数据）


module.exports = router