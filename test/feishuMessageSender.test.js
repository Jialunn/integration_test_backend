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

test("test feishu help message(no param)", async () => {
    const group_name = "小金的一天"
    const msg = {
        job_name: "mmyolo/test",
        job_type: "job", // maybe job, then content type should be params
        content_type: 'params',
        job_contents: [
            '不需要填写参数'
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
        job_type: "job", // maybe job, then content type should be params
        content_type: 'jobs(dirs)',
        job_contents: [
            '[aide_aliyun_dev](http://ci.pjlab.org.cn/job/aide_aliyun_dev/): freestyle',
            '[aide_aliyun_staging](http://ci.pjlab.org.cn/job/aide_aliyun_staging/): freestyle',
            '[aide_slurm_dev](http://ci.pjlab.org.cn/job/aide_slurm_dev/): freestyle',
            '[aide_slurm_prod](http://ci.pjlab.org.cn/job/aide_slurm_prod/): freestyle',
            '[aide_slurm_staging](http://ci.pjlab.org.cn/job/aide_slurm_staging/): freestyle',
            '[jmeter-test](http://ci.pjlab.org.cn/job/jmeter-test/): freestyle',
            '[llama-service-perf-test](http://ci.pjlab.org.cn/job/llama-service-perf-test/): freestyle',
            '[llama-service-perf-test-all](http://ci.pjlab.org.cn/job/llama-service-perf-test-all/): folder',
            '[mmaction2](http://ci.pjlab.org.cn/job/mmaction2/): folder',
            '[mmagic](http://ci.pjlab.org.cn/job/mmagic/): folder',
            '[mmcv](http://ci.pjlab.org.cn/job/mmcv/): folder',
            '[mmdeploy](http://ci.pjlab.org.cn/job/mmdeploy/): multibranch(not support yet)',
            '[mmdeploy_test_win](http://ci.pjlab.org.cn/job/mmdeploy_test_win/): folder',
            '[mmdeploy_win](http://ci.pjlab.org.cn/job/mmdeploy_win/): multibranch(not support yet)',
            '[mmdeploy_win_test](http://ci.pjlab.org.cn/job/mmdeploy_win_test/): multibranch(not support yet)',
            '[mmdetection](http://ci.pjlab.org.cn/job/mmdetection/): folder',
            '[mmdetection3d](http://ci.pjlab.org.cn/job/mmdetection3d/): folder',
            '[mmengine](http://ci.pjlab.org.cn/job/mmengine/): folder',
            '[mmfewshot](http://ci.pjlab.org.cn/job/mmfewshot/): folder',
            '[mmflow](http://ci.pjlab.org.cn/job/mmflow/): folder',
            '[mmgeneration](http://ci.pjlab.org.cn/job/mmgeneration/): folder',
            '[mmhuman3d](http://ci.pjlab.org.cn/job/mmhuman3d/): folder',
            '[mmocr](http://ci.pjlab.org.cn/job/mmocr/): folder',
            '[mmpose](http://ci.pjlab.org.cn/job/mmpose/): folder',
            '[mmpretrain](http://ci.pjlab.org.cn/job/mmpretrain/): folder',
            '[mmrazor](http://ci.pjlab.org.cn/job/mmrazor/): folder',
            '[mmrotate](http://ci.pjlab.org.cn/job/mmrotate/): folder',
            '[mmsegmentation](http://ci.pjlab.org.cn/job/mmsegmentation/): folder',
            '[mmselfsup](http://ci.pjlab.org.cn/job/mmselfsup/): folder',
            '[mmtracking](http://ci.pjlab.org.cn/job/mmtracking/): folder',
            '[mmyolo](http://ci.pjlab.org.cn/job/mmyolo/): folder',
            '[opendatalab_apitest](http://ci.pjlab.org.cn/job/opendatalab_apitest/): freestyle',
            '[opendatalab_ui](http://ci.pjlab.org.cn/job/opendatalab_ui/): freestyle',
            '[pytestEnv_on_lab_cluster_qa](http://ci.pjlab.org.cn/job/pytestEnv_on_lab_cluster_qa/): freestyle',
            '[regression_test](http://ci.pjlab.org.cn/job/regression_test/): folder',
            '[schedule](http://ci.pjlab.org.cn/job/schedule/): folder',
            '[sso_apitest](http://ci.pjlab.org.cn/job/sso_apitest/): freestyle',
            '[usercenter_uitest](http://ci.pjlab.org.cn/job/usercenter_uitest/): freestyle'
        ]
    }

    const ms = new HelpMessageSender(group_name, msg)

    res = await ms.send_msg()

    expect(res.status).toBe(200)
})


test("test feishu get jobs message 2", async () => {
    const group_name = "小金的一天"
    const msg = {
        job_name: 'mmcv',
        job_type: 'folder',
        content_type: 'jobs(folders)',
        job_contents: [
            '[2.0_mmcv_conda_env_build](http://ci.pjlab.org.cn/job/mmcv/job/2.0_mmcv_conda_env_build/): pipeline',
            '[mmcv2-build](http://ci.pjlab.org.cn/job/mmcv/job/mmcv2-build/): pipeline',
            '[mmcv_2_image_build](http://ci.pjlab.org.cn/job/mmcv/job/mmcv_2_image_build/): pipeline',
            '[mmcv_2_windows_build](http://ci.pjlab.org.cn/job/mmcv/job/mmcv_2_windows_build/): pipeline',
            '[mmcv_image_build](http://ci.pjlab.org.cn/job/mmcv/job/mmcv_image_build/): pipeline',
            '[mmcv_op_benchmark](http://ci.pjlab.org.cn/job/mmcv/job/mmcv_op_benchmark/): pipeline',
            '[mmcv_windows_build](http://ci.pjlab.org.cn/job/mmcv/job/mmcv_windows_build/): pipeline',
            '[test_no_param](http://ci.pjlab.org.cn/job/mmcv/job/test_no_param/): freestyle',
            '[test_with_param](http://ci.pjlab.org.cn/job/mmcv/job/test_with_param/): freestyle',
            '[windows-conda-base](http://ci.pjlab.org.cn/job/mmcv/job/windows-conda-base/): pipeline'
        ]
    }
    const ms = new HelpMessageSender(group_name, msg)

    res = await ms.send_msg()

    expect(res.status).toBe(200)
})

test("test feishu get jobs message 3", async () => {
    const group_name = "小金的一天"
    const msg = {
        job_name: 'test_with_param',
        job_type: 'freestyle',
        content_type: 'params',
        job_contents: [
            '**ECHO_PARAM**: StringParameterDefinition\ndescription： echo param\n'
        ]
    }
    const ms = new HelpMessageSender(group_name, msg)

    res = await ms.send_msg()

    expect(res.status).toBe(200)
})

test("test feishu get jobs message 4", async () => {
    const group_name = "小金的一天"
    const msg = {
        job_name: 'test_no_param',
        job_type: 'freestyle',
        content_type: 'params',
        job_contents: [ '这是一个没有参数的job，不需要填写参数' ]
    }
    const ms = new HelpMessageSender(group_name, msg)

    res = await ms.send_msg()

    expect(res.status).toBe(200)
})

