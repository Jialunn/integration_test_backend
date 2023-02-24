/**
 * 基础模块
 */
class BaseModel {
    constructor({code, data, msg}) {
        this.code = code
        if (data) {
            this.data = data
        }
        if (msg) {
            this.msg = msg
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
 * 成功的数据模型
 */
class PageSuccessModel extends BaseModel {
    constructor(data = {}, pageSize, pageNum) {
        super({ code: 0, data })
        this.pageSize = pageSize
        this.pageNum = pageNum
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({ code = -1, data = {}, msg = '' }) {
        super({
            data, msg
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel,
    PageSuccessModel
}
