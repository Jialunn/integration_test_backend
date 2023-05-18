const {exec} = require('child_process')

const {logger} = require("../utils/logger")
const {build_with_param, build_with_no_param, get_job_info, get_job_list} = require('./jenkins') // TODO need try catch
const {HelpMessageSender} = require('./feishuMessageSender')

const {DEBUG_GROUP} = require('../conf/constant')

class TaskRunner {
    constructor(feishu_cmd, name = "TaskRunner") {
        logger.debug(name + " runner init")
        this.name = name
        this.feishu_cmd = feishu_cmd
        this.running = false
        this.build_id = -1
    }

    async run() {
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
    }

    async run() {
        const group_name = this.feishu_cmd.group_name
        const params = this.feishu_cmd.params.params
        let job_name = ''
        if (params.length === 0) {
            job_name = "root_help"
        } else {
            job_name = params[params.length - 1]
        }
        const content = await get_job_info(job_name)
        const sender = new HelpMessageSender(group_name, content)
        await sender.send_msg()
    }
}


module.exports = {
    TaskRunner,
    HelpRunner
}
