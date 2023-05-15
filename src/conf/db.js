const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
    db: 1,
    password: ""
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'apx103',
    password: 'oooo',
    port: '3306',
    database: 'integration_test'
}

let MONGO_CONF = {
    host: '10.140.52.25',
    port: '27017',
    name: 'root',
    passwd: 'password',
    database: 'benchmark_test'
}

if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 配置
        port: 6379,
        host: 'redis',
        password: "",
        db: 1
    }

    MYSQL_CONF = {
        // 线上的 mysql 配置
        host: 'mysql',
        user: 'root',
        password: 'oooo',
        port: '3306',
        database: 'integration_test'
    }

    MONGO_CONF = {
        host: '10.140.52.25',
        port: '27017',
        name: 'root',
        passwd: 'password',
        database: 'benchmark_test'
    }

}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF,
    MONGO_CONF
}
