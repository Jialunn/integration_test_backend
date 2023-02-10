
const { Sequelize }  = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL(9, 2),
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    DATE: Sequelize.DATEONLY
}
