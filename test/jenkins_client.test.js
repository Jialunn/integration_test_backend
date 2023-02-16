const Jenkins = require('jenkins');
const jenkins = new Jenkins({
    baseUrl: "http://apx103:0000@ci.pjlab.org.cn"
})
// console.log(await jenkins.info())

test("test jenkins create with no prarm", async () => {
    const result = await jenkins.job.build("mmcv/test_no_param")
    console.log(typeof(result))
    expect(typeof(result)).toBe("number")
})


test("test jenkins create with default prarm", async () => {
    const result = await jenkins.job.build({
        name: "mmcv/test_with_param",
        parameters: {},
    })
    expect(typeof (result)).toBe("number")
})


test("test jenkins create with prarm", async () => {
    const result = await jenkins.job.build({
        name: "mmcv/test_with_param",
        parameters: { ECHO_PARAM: "special" },
    })
    expect(typeof (result)).toBe("number")
})
