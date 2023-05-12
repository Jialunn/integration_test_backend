const {exec} = require('node:child_process')

const {logger} = require("../utils/logger")
const {build_with_param, build_with_no_param} = require('./jenkins')
const {HelpMessageSender} = require('./feishuMessageSender')


class TaskRunner {
    constructor(feishu_cmd, name = "HelpRunner") {
        logger.debug(name + " runner init")
        this.name = name
        this.feishu_cmd = feishu_cmd
        this.running = false
        this.build_id = -1
    }

    run() {
        logger.debug(this.name + ": Runner started")

    }

    stop() {
        logger.debug(this.name + ": Runner stopped")
    }

    send_start_msg() {
        logger.debug(this.name + ": Send runner start message")
    }

    send_error_msg() {
        logger.debug(this.name + ": Send runner error message")
    }

    gather_result() {
        logger.debug(this.name + ": Gathering results")
    }

    get_status() {

    }
}


class HelpRunner {
    constructor(feishu_cmd, name = "HelpRunner") {
        logger.debug(name + " runner init")
        this.name = name
        this.feishu_cmd = feishu_cmd
        this.running = false
    }


    // 根目录直接调用
    // job直接返回目录(标明每种任务的类型)
    // 任务的help根据任务类型返回 1. job返回是否有参数 2. 目录返回list 3. 记为TODO来跟踪新内容
    run() {
        const sender = new HelpMessageSender()
    }
}


module.exports = {
    TaskRunner,
    HelpRunner
}
