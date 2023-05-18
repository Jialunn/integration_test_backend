const {createClient} = require('redis')

const {REDIS_CONF} = require('../conf/db')
const {MQ_LIST} = require('../conf/mq')
const {th} = require("date-fns/locale");


const redisCreateClient = async (config) => {
    try {
        const client = createClient({
            url: `redis://${config.host}:${config.port}`,
        });
        await client.connect();
        await client.select(config.db);
        console.log("redis connect success");
        return client;
    } catch (err) {
        console.log("redis connect error");
        throw err;
    }
}

class RedisMQ{
    constructor() {
        this.mq = redisCreateClient(REDIS_CONF)
        this.waiting_q = 'SHQA_task_waiting_q'
        this.running_q = 'SHQA_task_running_q'
    }


    put_task(q_name) {

    }

    run_task() {

    }

    finish_task(q_name) {

    }

    _put(q_name, task) {

    }

    _pop(q_name) {

    }

    get_len(q_name) {

    }

    get_all() {

    }

    clear() {

    }
}

module.exports = {
    redisCreateClient,
    RedisMQ
}
