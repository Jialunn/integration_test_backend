const schedule = require('node-schedule')
const axios = require("axios")
const {v4: uuidv4} = require('uuid')

const {FeishuCommand} = require("../utils/feishuTokenizer")
const {HelpRunner, TaskRunner} = require("../utils/feishuTaskRunner")
const {JobStartErrorMessageSender} = require('../utils/feishuMessageSender')
const {logger} = require("../utils/logger")

const {BotURL, DEBUG_GROUP} = require('../conf/constant')

// node-schedule
// =====================================================================
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

class Scheduler {
    constructor() {
        this._poller = new Poller(BotURL)
        this.daily = undefined
        this.poller = undefined
    }

    startDaily() {
        if (typeof (this.daily) === "undefined") {
            this.daily = schedule.scheduleJob('0 0 22 * *', function () {
                console.log('daily')
            })
        }
    }

    stopDaily() {
        if (typeof (this.daily) !== "undefined") {
            this.daily.cancel()
            this.daily = undefined
        }
    }

    startPoller(qr = '5') {
        if (typeof (this.poller) === "undefined") {
            this.poller = schedule.scheduleJob('*/' + qr + ' * * * *', function () {
                try {
                    // check db if on
                    console.log('polling')
                } catch (e) {
                    new JobStartErrorMessageSender(DEBUG_GROUP, 'Poller 自己', String(e))
                    // TODO cancel itself
                }
            })
        }
    }

    stopPoller() {
        if (typeof (this.poller) !== "undefined") {
            this.poller.cancel()
            this.poller = undefined
        }
    }
}

class Poller {
    constructor(BotURL = BotURL) {
        this.BotURL = BotURL
    }

    task_selector(feishu_cmd) {
        const type = feishu_cmd.type
        switch (type) {
            case 'job': {
                return TaskRunner
            }
            case 'help': {
                return HelpRunner
            }
        }
        logger.error("Wrong task type")
        throw Error("Wrong task type")
    }

    async handler(cmd) {
        try {
            let feishu_cmd = new FeishuCommand(cmd)
            let Runner = this.task_selector(feishu_cmd)
            // add group_name to runner to send back message
            if (feishu_cmd.type !== 'help') {
                feishu_cmd.params.GROUP_NAME = feishu_cmd.group_name
            }
            await new Runner(feishu_cmd).run()
        } catch (e) {
            logger.error(e)
            // TODO Add error handler
            // TODO send error msg to group
        }
    }

    async poll() {
        const request_body = {
            "header": {"event_id": uuidv4(), "event_type": "MQ"},
            "event": {"ops": "receive", "mq_type": "jenkins", "data": ""}
        }

        try {
            let res = await axios.post(this.BotURL)
            // TODO 调用handler

        } catch (e) {
            logger.error(e)
            // TODO Add error handler
            // TODO send error msg to DEBUG_GROUP
            throw Error('poller 拉不到消息了，可能线上服务器挂了')
        }
    }
}
