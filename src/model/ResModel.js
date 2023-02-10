/**
 * 基础模块
 */
class BaseModel {
    constructor({code, data, error}) {
        this.code = code
        if (data) {
            this.data = data
        }
        if(error) {
            this.error = error
        }
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({code: 0, data})
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({ code = -1, data = {}, error = 500 }) {
        super({
            data
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
