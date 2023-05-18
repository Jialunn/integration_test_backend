const {FeishuCommand} = require("../src/utils/feishuTokenizer")
const {DEBUG_GROUP} = require("../src/conf/constant")

test("test feishu cmd parse", () => {
    const cmd = [
        "job mmyolo/test",
        "job mmyolo/daily_test_v2 default",
        "job mmyolo/daily_test_v2 TEST_GIT_BRANCH=2.x;MMENGINE_BRANCH=main;MMENGINE_BRANCH_2=main",
        "job aide_slurm env=slurm_staging",
        "job help",
        "job mmyolo/test help",
        "job mmyolo help",
        "help"
    ]

    const out = [
        ['job', "mmyolo/test", null],
        ['job', "mmyolo/daily_test_v2", {}],
        ['job', "mmyolo/daily_test_v2", {TEST_GIT_BRANCH: "2.x", MMENGINE_BRANCH: "main", MMENGINE_BRANCH_2: "main"}],
        ['job', "aide_slurm", {env: "slurm_staging"}],
        ['help', 'help', {params: ['job']}],
        ['help', 'help', {params: ['job', 'mmyolo/test']}],
        ['help', 'help', {params: ['job', 'mmyolo']}],
        ['help', 'help', {params: []}],
    ]
    for (let i in cmd) {
        const feishu_cmd = new FeishuCommand(cmd[i])
        expect(feishu_cmd.type).toBe(out[i][0])
        expect(feishu_cmd.job_name).toBe(out[i][1])
        if(feishu_cmd.params === null) {
            expect(feishu_cmd.params).toBe(out[i][2])
        } else {
            expect(JSON.stringify(feishu_cmd.params)).toBe(JSON.stringify(out[i][2]))
        }
        expect(feishu_cmd.group_name).toBe(DEBUG_GROUP)
    }
})