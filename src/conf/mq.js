module.exports = {
    MQ_LIST: [
        {
            // 消息频道名称
            name: "REDIS_MQ",
            // 阻塞式取值超时配置
            brPopTimeout: 100,
            // 开启任务数 此配置需要 PM 启动生效
            instances: 1,
            // redis 配置key
            redis: "default",
        },
    ]
}