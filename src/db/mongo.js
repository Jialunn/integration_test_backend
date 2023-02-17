const { MongoClient } = require('mongodb') 
const { MONGO_CONF } = require('../conf/db')

const url = MONGO_CONF.host
const port = MONGO_CONF.port
const name = MONGO_CONF.name
const passwd = MONGO_CONF.passwd


let mongodb_url = 'mongodb://' + url + ':' + port
if(name !== ''){
    mongodb_url = 'mongodb://' + name + ':' + passwd + '@' + url + ':' + port
}
const mongo_client = new MongoClient(mongodb_url);

module.exports = mongo_client
