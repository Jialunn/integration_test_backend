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


test("test jenkins create with param", async () => {
    const result = await jenkins.job.build({
        name: "mmcv/test_with_param",
        parameters: { ECHO_PARAM: "special" },
    })
    expect(typeof (result)).toBe("number")
})
