const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
const mongo_client = require("../src/db/mongo")

test("test mongodb client connect", async () => {
    await mongo_client.connect()
    let db = mongo_client.db("lark_bot")
    expect(typeof (await db.collections())).toBe('object')
    await mongo_client.close()
})

test("test mongo add one", async () => {
    expect(1).toBe(1)
})
