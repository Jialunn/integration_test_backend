const Jenkins = require('jenkins')

const {JenkinsUsername, JenkinsPasswd} = require('../conf/constant')
const jenkins = new Jenkins({
    baseUrl: "http://" + JenkinsUsername + ":" + JenkinsPasswd + "@ci.pjlab.org.cn"
})

async function build_with_no_param(feishu_command) {
    return await jenkins.job.build(feishu_command.job_name)
}

async function build_with_param(feishu_command) {
    return await jenkins.job.build({
        name: feishu_command.job_name,
        parameters: feishu_command.params,
    })
}

module.exports = {
    build_with_no_param,
    build_with_param
}
