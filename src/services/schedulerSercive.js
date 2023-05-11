const schedule = require('node-schedule')
const axios = require("axios")
const {v4: uuidv4} = require('uuid')

const {FeishuCommand} = require("../utils/feishuTokenizer")
const {HelpRunner, TaskRunner} = require("../utils/feishuTaskRunner")
const {logger} = require("../utils/logger")

const {BotURL, DEBUG_GROUP} = require('../conf/constant')
const {ca} = require("date-fns/locale");

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
                // check db if on
                console.log('polling')
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
    constructor() {
        this.BotURL = BotURL
    }

    parse_res(res){
        res = res["data"].replace("\\", "").split('>')
        if(res.length === 2){
            return res
        }
        return res.push(DEBUG_GROUP)
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

    async poll() {
        const request_body = {
            "header": {"event_id": uuidv4(), "event_type": "MQ"},
            "event": {"ops": "receive", "mq_type": "jenkins", "data": ""}
        }

        try{
            let res = await axios.post(this.BotURL)
            let [cmd, group_name] = this.parse_res(res)
            let feishu_cmd =  new FeishuCommand(cmd)

            let Runner = this.task_selector(feishu_cmd)


        } catch (e) {
            logger.error(e)
            // TODO Add error handler
            // TODO send msg
        }
    }
}
