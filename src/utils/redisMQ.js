const {createClient} = require('redis')

const {REDIS_CONF} = require('../conf/db')
const {MQ_LIST} = require('../conf/mq')


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
    }

    put() {

    }

    pop() {

    }

    get_len() {

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
