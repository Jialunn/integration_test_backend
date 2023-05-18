const Jenkins = require('jenkins');
const jenkins = new Jenkins({
    baseUrl: "http://apx103:0000@ci.pjlab.org.cn"
})
// console.log(await jenkins.info())

test("test jenkins create with no param", async () => {
    const result = await jenkins.job.build("mmcv/test_no_param")
    expect(typeof(result)).toBe("number")
})


// //Error: jenkins: job.build: internal server error
// test("test jenkins create with no param 2", async () => {
//     const result = await jenkins.job.build({
//         name: "mmcv/test_no_param",
//         parameters: {},
//     })
//     expect(typeof(result)).toBe("number")
// })

test("test jenkins get logs", async () => {
    const data = await jenkins.build.log("mmcv/test_no_param", 10)
    console.log('log', data);
})

test("test jenkins create with default param", async () => {
    const result = await jenkins.job.build({
        name: "mmcv/test_with_param",
        parameters: {},
    })
    expect(typeof (result)).toBe("number")
})


test("test jenkins create with other param", async () => {
    const result = await jenkins.job.build({
        name: "mmcv/test_with_param",
        parameters: {group_name: '小金的一天'},
    })
    expect(typeof (result)).toBe("number")
})

test("test jenkins create with param", async () => {
    const result = await jenkins.job.build({
        name: "mmcv/test_with_param",
        parameters: { ECHO_PARAM: "special" },
    })
    expect(typeof (result)).toBe("number")
})

test("test jenkins get list", async () => {
    const data = await jenkins.job.list()
    console.log('jobs', data)
})

test("test jenkins get job(dir)", async () => {
    const data = await jenkins.job.get("mmaction2")
    console.log('jobs', data)
    console.log('jobs', data.jobs)
})

test("test jenkins get job(dir) 2", async () => {
    const data = await jenkins.job.get("mmcv/test_no_param")
    console.log('jobs', data)
})

test("test jenkins get job(dir) params", async () => {
    const data = await jenkins.job.get("mmcv/test_with_param")
    console.log('plugin', data.actions[0])
    console.log('param', data.actions[0].parameterDefinitions)
    console.log('param default value', data.actions[0].parameterDefinitions[0].defaultParameterValue.value)
})

test("test jenkins get job(dir) params(no param)", async () => {
    const data = await jenkins.job.get("mmcv/test_no_param")
    console.log('plugin', data.actions[0])
    console.log('param', data.actions[0].parameterDefinitions)
    // console.log('param default value', data.actions[0].parameterDefinitions[0].defaultParameterValue.value)
})
