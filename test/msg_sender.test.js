const {HelpMessageSender} = require('../src/utils/feishuMessageSender')


test("test help message sender", async () => {
    const ms = new HelpMessageSender("小金的一天")
    const res = await ms.send_msg()
    console.log(res.status)
})
