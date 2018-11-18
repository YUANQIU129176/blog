// 引入数据库
const db = require("../lib/db");
exports.indexView = function(req, res) {
    // 1 h获取session用户
    let user = req.session.user;
    // 2 判断如果用户不存在则存入空对象
    if (!req.session.user) {
        user = {};
    }

    // 3 让添加的文章页在首页上显示
    // 3.1 引入函数
    db.dumpIndex(function(results) {
        console.log(results);
        res.render("index", {
            user: user,
            posts: results
        });
    })

}