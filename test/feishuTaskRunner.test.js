const {HelpRunner} = require('../src/utils/feishuTaskRunner')
const {FeishuCommand} = require("../src/utils/feishuTokenizer")


test('test help runner', async () => {
    const cmd_list = [
        "job help",
        "job mmyolo/test help",
        "job mmyolo/daily_test_v2 help",
        "job mmyolo help",
        "help",
        // "job help>李佳伦的机器人小屋",
        // "job mmyolo/test help>李佳伦的机器人小屋",
        // "job mmyolo help>李佳伦的机器人小屋",
        // "help>李佳伦的机器人小屋"
    ]

    for (let index in cmd_list) {
        const cmd = cmd_list[index]
        const feishu_cmd = new FeishuCommand(cmd)
        const runner = new HelpRunner(feishu_cmd)
        await runner.run()
    }
})


