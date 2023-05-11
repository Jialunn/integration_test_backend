const axios = require('axios')
const {v4} = require('uuid')
const {MSG_SENDER_BASE_URL} = require('../conf/constant')


class BaseMessageSender {
    constructor(group_name) {
        this.msg_content = this.content_gen()
        this.group_name = group_name
    }

    async send_msg(bot_url = MSG_SENDER_BASE_URL) {
        const msg = this.send_msg_template()
        return await axios.post(bot_url, msg, {headers: {'Content-Type': 'application/json'}})
    }

    send_msg_template() {
        return {
            "header": {"event_id": v4(), "event_type": "jenkins"},
            "event": {"message": {"message_type": "interactive", "content": JSON.stringify(this.msg_content)}},
            "groupname": this.group_name
        }
    }

    content_gen(self) {
        return null
    }
}


class DailyTestErrorMessageSender extends BaseMessageSender {
    constructor(group_name, build_url, repo_name) {
        super(group_name)
        this.build_url = build_url + "/console"
        this.repo_name = repo_name
    }

    content_gen() {
        return {
            "config": {"wide_screen_mode": true, "enable_forward": true},
            "elements": [{
                "actions": [
                    {
                        "tag": "button", "text": {"content": "详情链接", "tag": "lark_md"}, "url": this.build_url,
                        "type": "default", "value": {}
                    }], "tag": "action"
            }],
            "header": {"title": {"content": this.repo_name + " 在执行 集成测试 时报错", "tag": "plain_text"}}
        }
    }

}


class JobStartedMessageSender extends BaseMessageSender {
    constructor(group_name, job_name) {
        super(group_name)
        job_name = job_name.split('/')
        let sub_path = ''
        for (let i in job_name) {
            sub_path += '/job/' + i
        }
        this.job_url = 'http://ci.pjlab.org.cn' + sub_path
    }

    content_gen() {
        return {
            "config": {"wide_screen_mode": true, "enable_forward": true},
            "elements": [{
                "actions": [
                    {
                        "tag": "button", "text": {"content": "详情链接", "tag": "lark_md"}, "url": this.job_url,
                        "type": "default", "value": {}
                    }], "tag": "action"
            }],
            "header": {"template": "green", "title": {"content": "您的任务已启动", "tag": "plain_text"}}
        }
    }

}


class JobStartErrorMessageSender extends BaseMessageSender {
    constructor(group_name, job_name, content) {
        super(group_name)
        this.job_name = job_name
        this.content = content
    }

    content_gen(self) {
        return {
            "config": {"wide_screen_mode": true, "enable_forward": true},
            "elements": [
                {"tag": "markdown", "content": self.content, "href": {}},
                {"tag": "hr"},
                {
                    "tag": "markdown",
                    "content": '*可联系管理员，或到<a href=\"http://ci.pjlab.org.cn\">CI</a>查看是否有该任务*',
                    "href": {}
                }
            ],
            "header": {
                "template": "red", "title": {"content": "任务启动错误", "tag": "plain_text"}
            }
        }
    }

}


class TaskStartedMessageSender extends BaseMessageSender {
    constructor(group_name) {
        super(group_name)
        this.ci_url = 'http://ci.pjlab.org.cn'
    }

    content_gen() {
        return {
            "config": {"wide_screen_mode": true, "enable_forward": true},
            "elements": [{
                "actions": [
                    {
                        "tag": "button", "text": {"content": "CI 链接", "tag": "lark_md"}, "url": this.ci_url,
                        "type": "default", "value": {}
                    }], "tag": "action"
            }],
            "header": {"template": "green", "title": {"content": "您的任务已启动", "tag": "plain_text"}}
        }
    }
}


class HelpMessageSender extends BaseMessageSender {
    constructor(group_name, msg = {job_name: "root_help"}) {
        super(group_name)
        this.job_name = msg.job_name
        this.msg = msg
    }

    content_gen() {
        let content
        switch (this.job_name) {
            case "root_help":
                content = "**启动无参数的Jenkins Job**\n" +
                    "@bot jenkins job [job_name]\n" +
                    "**启动有参数，但使用默认参数的Jenkins Job**\n" +
                    "@bot jenkins job [job_name] default\n" +
                    "**启动有参数的Jenkins Job(参数名不能有空格)**\n" +
                    "@bot jenkins job [job_name] param1=p1;param2=p2\n" +
                    "\n" +
                    "可以通过 **@bot jenkins job help** 查看可以构建哪些job\n" +
                    "可以通过 **@bot jenkins job [job_name] help** 查看构建需要的参数(或者目录下的job列表)\n" +
                    "\n" +
                    "**祝您用的开心**"
                break
            default:
                let msg_content
                for(let i in this.msg['job_contents']) {
                    msg_content += this.msg['job_contents'][i] + '\n'
                }
                content = "**" + this.job_name + " 是一个" + this.msg['job_type'] + "**\n" +
                     "它包含了以下" + this.msg['content_type'] + "\n" + msg_content
        }

        return {
            "config": {"wide_screen_mode": true, "enable_forward": true},
            "elements": [
                {"tag": "markdown", "content": content, "href": {}},
                {"tag": "hr"},
                {"tag": "markdown", "content": "*可定制批量启动命令，如有需求，可联系QA*", "href": {}}
            ],
            "header": {
                "template": "blue", "title": {"content": "帮助文档", "tag": "plain_text"}
            }
        }
    }
}


module.exports = {
    DailyTestErrorMessageSender,
    JobStartedMessageSender,
    JobStartErrorMessageSender,
    TaskStartedMessageSender,
    HelpMessageSender
}
