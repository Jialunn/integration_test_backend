const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY } = require('../conf/constant')

async function decode(ctx) {
    const token = ctx.request.query.token
    const userInfo = await jwt.verify(
        token,
        JWT_PRIVATE_KEY
    )
    return userInfo.username
}

module.exports = decode
