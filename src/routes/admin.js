const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { getAdminByUsername } = require('../services/adminService')
const { md5 } = require('../utils/md5')
const { JWT_PRIVATE_KEY, JWT_EXPIRE_TIME, CRYPTO_SECRET_KEY } = require('../conf/constant')
const { SuccessModel, ErrorModel } = require('../model/ResModel')


router.prefix('/user')

router.post('/login', async function (ctx, next) {
  if (ctx.request.body.username === '' || ctx.request.body.password === '') {
    ctx.body = '用户名和密码不能为空'
  }
  const username = ctx.request.body.username
  const passwd = md5(`${ctx.request.body.password}${CRYPTO_SECRET_KEY}`)
  const result = await login(username, passwd)
  console.log(result.code)
  ctx.body = result
})

router.get('/info', async function (ctx, next) {
  const token = ctx.request.query.token
  const userInfo = await jwt.verify(
    token,
    JWT_PRIVATE_KEY
  )
  const result = await getAdminByUsername(userInfo.username)
  if (user !== null) {
    ctx.body = new SuccessModel({
      msg: '登陆成功',
      roles: [result.role],
      avatar: result.avatar
    })
  } else {
    ctx.body = new ErrorModel({
      error: 401,
      data: {
        msg: '登陆失败'
      }
    })
  }
  
})

async function login(username, password) {
  let user = await getAdminByUsername(username)
  console.log(user)
  if (user === null) {
    return new ErrorModel({
      error: 400,
      data: {
        msg: '无该用户'
      }
    })
  }
  const token = await jwt.sign(
    { username },
    JWT_PRIVATE_KEY,
    { expiresIn: JWT_EXPIRE_TIME }
  )
  if (user.password === password) {
    return new SuccessModel({
      msg: '登陆成功',
      token: token
    })
  }
  else {
    return new ErrorModel({
      error: 500,
      data: {
        msg: '密码错误'
      }
    })
  }
}

module.exports = router