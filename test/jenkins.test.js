const {build_with_no_param, get_job_list, get_job_info, build_with_param} = require('../src/utils/jenkins')
const {FeishuCommand} = require("../src/utils/feishuTokenizer")

test("test jenkins(module) get list", async () => {
    const result = await get_job_list()
    console.log(result)
})

test("test jenkins(module) get job info 1", async () => {
    const result = await get_job_info("mmcv")
    console.log(result)
})

test("test jenkins(module) get job info 2", async () => {
    const result = await get_job_info("mmyolo/daily_test_v2")
    console.log(result)
})

test("test jenkins(module) get job info 3", async () => {
    const result = await get_job_info("mmcv/test_with_param")
    console.log(result)
})

test("test jenkins(module) get job info 4", async () => {
    const result = await get_job_info("mmcv/test_no_param")
    console.log(result)
})

test("test jenkins(module) build", async () => {
    const cmd = "job mmcv/test_no_param"
    const fc = new FeishuCommand(cmd)
    const result = await build_with_no_param(fc)
    console.log(result)
})

test("test jenkins(module) build 2", async () => {
    const cmd = "job mmcv/test_with_param default"
    const fc = new FeishuCommand(cmd)
    const result = await build_with_param(fc)
    console.log(result)
})

test("test jenkins(module) build 3", async () => {
    const cmd = "job mmcv/test_with_param ECHO_PARAM=666"
    const fc = new FeishuCommand(cmd)
    const result = await build_with_param(fc)
    console.log(result)
})

