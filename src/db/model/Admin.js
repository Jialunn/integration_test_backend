const seq = require("../seq")
const { STRING } = require('../types')

const Admin = seq.define("admin", {
    username: {
        type: STRING,
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    role: {
        type: STRING,
        allowNull: false,
        comment: '用户类型'
    },
    note: {
        type: STRING,
        allowNull: true,
        comment: '备注'
    }
})

module.exports = Admin

