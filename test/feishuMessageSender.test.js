const {HelpMessageSender} = require("../src/utils/feishuMessageSender")

test("test feishu help message", async () => {
    const group_name = "小金的一天"
    const msg = {
        job_name: "mmyolo",
        job_type: "dir", // maybe job, then content type should be params
        content_type: 'jobs(dirs)',
        job_contents: [
            'mmyolo/test: job',
            'mmyolo/daily_test_v2: job'
        ]
    }

    const ms = new HelpMessageSender(group_name, msg)

    res = await ms.send_msg()

    expect(res.status).toBe(200)
})

test("test feishu root message", async () => {
    const group_name = "小金的一天"
    const msg = {
        job_name: "root_help"
    }

    const ms = new HelpMessageSender(group_name, msg)

    res = await ms.send_msg()

    expect(res.status).toBe(200)
})

test("test feishu get jobs message", async () => {
    const group_name = "小金的一天"
    const msg = {
        job_name: "job",
        job_type: "dir", // maybe job, then content type should be params
        content_type: 'jobs(dirs)',
        job_contents: [
            'mmdet: dir',
            'mmyolo: dir'
        ]
    }

    const ms = new HelpMessageSender(group_name, msg)

    res = await ms.send_msg()

    expect(res.status).toBe(200)
})

