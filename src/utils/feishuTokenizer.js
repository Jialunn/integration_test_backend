/**
 * Feishu Command Class, parse command to jenkins job
 *
 * Feishu Bot CMD Definition:
 *   1. job with no parameters
 *   2. job with parameters but use default parameters
 *   3. job with parameters and use custom parameters
 *   4. special job type ()
 */
class FeishuCommand {
    /**
     * Feishu Bot CMD Definition:
     *
     *         1. job with no parameters
     *
     *            'job [job_name]'
     *
     *         2. job with parameters but use default parameters
     *
     *            'job [job_name] default'
     *
     *         3. job with parameters and use custom parameters
     *
     *            'job [job_name] param1=s1;param2=s2'
     *
     *         4. special job type, custom (for example: daily)
     *
     *            'daily [job_name] [v1 or v2]'
     *
     *         5. WIP
     *
     *     PS: There may be spaces in [job_name] and param
     *         There should be no space in param_name
     * @param feishu_command
     */
    constructor(feishu_command) {
        this.feishu_command = feishu_command
        this.job_name = ''
        this.params = {}
        this.type = ''

        this.tokenize()
    }

    /**
     * tokenize feishu cmd to Object attr
     */
    tokenize() {
        let ir = self.cmd.split(' ')
        this.type = ir[0]
        ir = ir.slice(1, ir.length)
        this.job_name = ir[0]
        ir = ir.slice(1, ir.length)
        if (this.type === 'job') {
            // 1
            if (ir.length === 0) {
                return
            }

            // 2
            if (ir.length === 1 && ir[0] === "default") {
                this.params = {}
                return
            }

            // 3
            if (ir.length === 1 && ir[0].indexOf('=') !== -1) {
                const pa = ir.split(';')
                for(let j in pa){
                    const param_pair = j.split("=")
                    if(param_pair.length !== 2) {
                        throw Error("Syntax error! please send params in right way")
                    }
                    this.params[param_pair[0]] = param_pair[1]
                }
                return
            }
            throw Error("can not tokenize feishu cmd! please send params in right way")
        } else {
            // 4
            this.params = {'params': ir}
        }
    }
}

module.exports = {
    FeishuCommand
}
