// 建立访问时的日志中间件
const fs = require("fs");

// 时间模块
const moment = require("moment");

// 暴露属性
module.exports = function(req, res, next) {
    // 添加文件 和内容
    fs.appendFile(__dirname + `../../../logs/logs_${moment().format("YYYY-MM-DD")}.txt`, `访问的时间：${moment().format("YYYY-MM-DD hh:mm:ss")}\r\n`, (err) => {
        if (err) {
            throw err;
        }
        next();
    })

}