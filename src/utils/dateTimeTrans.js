const { format } = require('date-fns')

/**
 * 格式化时间，如 09.05 23:02
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
    return format(new Date(str), 'yyyy-MM-dd')
}

module.exports = {
    timeFormat
}
