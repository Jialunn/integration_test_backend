const { Admin } = require('../db/model/index')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

async function getAdminByID(ID) {
    const result = await Admin.findOne({
        where: {
            id: ID
        }
    })
    if (result !== null) {
        return result.dataValues  // 未取出每个数组元素的dataValues
    } else {
        return 'null'
    }
    // for(let i in result){
    //     console.log(result[i].dataValues)
    // }
}

async function getAllAdmin(limit, offset) {
    const result = await Admin.findAll({
        limit: limit,
        offset: offset,
        order: [
            ['id', 'asc']
        ]
    })
    if (result !== null) {
        return result.map(log => log.dataValues)  // 未取出每个数组元素的dataValues
    } else {
        return 'null'
    }
}

async function addAdmin(username, password, role, avatar, note) {
    const result = await Admin.create({
        username: username,
        password: password,
        role: role,
        avatar: avatar,
        note: note
    })
    if (result !== null) {
        return new SuccessModel({
            msg: '管理员添加成功'
        })
    } else {
        return 'null'
    }
}

async function editAdmin(id, username, password, role, avatar, note) {
    const result = await Admin.update({
        username: username,
        password: password,
        role: role,
        avatar: 'http://127.0.0.1:3000/images/1.jpg',
        note: note
    }, {
        where: {
            id: id
        }
    })
    if (result !== null) {
        return new SuccessModel({
            msg: '管理员添加成功'
        })
    } else {
        return 'null'
    }
}

async function delAdmin(id) {
    const result = await Admin.destroy({
        where: {
            id: id
        }
    })
    if (result !== null) {
        return new SuccessModel({
            msg: '管理员删除成功'
        })
    } else {
        return 'null'
    }
}

async function countAdmin() {
    const result = await Admin.count()
    if (result !== null) {
        return new SuccessModel({
            // msg: 'ok',
            count: result
        })
    } else {
        return 'null'
    }
}

module.exports = {
    getAdminByID,
    getAllAdmin,
    addAdmin,
    delAdmin,
    countAdmin,
    editAdmin
}
