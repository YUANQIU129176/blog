// 引入数据库
const db = require("../lib/db");
exports.indexView = function(req, res) {
    // 1 h获取session用户
    let user = req.session.user;
    // 2 判断如果用户不存在则存入空对象
    if (!req.session.user) {
        user = {};
    }
    // 分页逻辑
    // 获取地址栏的page数据
    const page = req.query.page || 1;
    db.findPostByPage(page, function(results) {
        // console.log(results);
        db.PostsCount(function(count) {
            // console.log(count);
            let counts = count[0].count;
            res.render("index", {
                user: user,
                posts: results, //只有五条数据
                page: page,
                count: counts
            });
        })
    })
}