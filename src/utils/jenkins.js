const Jenkins = require('jenkins')

const {JenkinsUsername, JenkinsPasswd} = require('../conf/constant')
const {da, te} = require("date-fns/locale");
const jenkins = new Jenkins({
    baseUrl: "http://" + JenkinsUsername + ":" + JenkinsPasswd + "@ci.pjlab.org.cn"
})

const JENKINS_JOB_MAP = {
    'org.jenkinsci.plugins.workflow.job.WorkflowJob': 'pipeline',
    'com.cloudbees.hudson.plugins.folder.Folder': 'folder',
    'hudson.model.FreeStyleProject': 'freestyle',
    'org.jenkinsci.plugins.workflow.multibranch.WorkflowMultiBranchProject': 'multibranch(not support yet)'
}

async function get_jobs(job_name) {
    return await jenkins.job.get(job_name)
}
async function build_with_no_param(feishu_command) {
    const info = await get_jobs(feishu_command.job_name)
    if(!(info._class in JENKINS_JOB_MAP)){
        throw Error('Jenkins Job type not support yet !')
    }
    return await jenkins.job.build(feishu_command.job_name)
}

async function build_with_param(feishu_command) {
    const info = await get_jobs(feishu_command.job_name)
    if(!(info._class in JENKINS_JOB_MAP)){
        throw Error('Jenkins Job type not support yet !')
    }
    return await jenkins.job.build({
        name: feishu_command.job_name,
        parameters: feishu_command.params,
    })
}

function job_list_to_str(list_data){
    let job_list = []
    for(let i in list_data){
        let job_type = list_data[i]._class
        if(list_data[i]._class in JENKINS_JOB_MAP){
            job_type = JENKINS_JOB_MAP[list_data[i]._class]
        }
        job_list.push('[' + list_data[i].name + '](' + list_data[i].url + '): ' + job_type)
    }
    return job_list
}

function check_param(property) {
    for (let i in property) {
        if (property[i]._class === 'hudson.model.ParametersDefinitionProperty') {
            return property[i].parameterDefinitions
        }
    }
    return undefined
}

async function get_job_list(){
    const list_data = await jenkins.job.list()
    return job_list_to_str(list_data)
}

async function get_job_info(job_name){
    // 如果是dir就返回job+类型
    // 如果是job就返回params + 描述 + 默认值
    let temp = {
        job_name: '',
        job_type: '',
        content_type: '',
        job_contents: []
    }
    if (job_name === 'root_help'){
        temp.job_name = 'root_help'
        return temp
    }
    if (job_name === 'job'){
        temp.job_name = 'job'
        temp.content_type = 'jobs(folders)'
        temp.job_contents = await get_job_list()
        return temp
    }
    let data = await jenkins.job.get(job_name)
    temp.job_name = data.name
    temp.job_type = data._class
    temp.content_type = 'params'
    if(data._class in JENKINS_JOB_MAP){
        temp.job_type = JENKINS_JOB_MAP[data._class]
    }
    if(temp.job_type === 'folder') {
        temp.content_type = 'jobs(folders)'
        temp.job_contents = job_list_to_str(data.jobs)
        return temp
    }

    const params = check_param(data.property)
    if (typeof(params) === "undefined"){
        temp.job_contents = ['这是一个没有参数的job，不需要填写参数']
    }

    for (let i in params) {
        let d = params[i]
        temp.job_contents.push('**' + d.name + '**: ' + d.type + '\ndescription： ' + d.description + '\n')
    }

    return temp
}

async function get_buildings() {
    // 获取正在构建的项目（以及正在排队的项目）
    // 获取名字、第几次构建、已进行多久
}

module.exports = {
    build_with_no_param,
    build_with_param,
    get_job_info,
    get_job_list
}
