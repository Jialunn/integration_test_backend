const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
const { MongoClient } = require('mongodb') 
const { MONGO_CONF } = require('../conf/db')

const url = MONGO_CONF.host
const port = MONGO_CONF.port
const name = MONGO_CONF.name
const passwd = MONGO_CONF.passwd

// db.collection.find({query}).sort({name:1}).skip(N).limit(50)
// db.collection.find({query}).sort({name:1}).limit(50)
let mongodb_url = 'mongodb://' + url + ':' + port
if(name !== ''){
    mongodb_url = 'mongodb://' + name + ':' + passwd + '@' + url + ':' + port
}
const mongo_client = new MongoClient(mongodb_url);

module.exports = mongo_client
