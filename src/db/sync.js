const seq = require('./seq')

require('./model/index')

// INSERT INTO `admins` VALUES (1, 'admin', 'de086d1447f2bc5818d5d1047249920c', 'admin', '2020-08-01 17:57:05', '2020-08-01 17:57:07');
// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})
