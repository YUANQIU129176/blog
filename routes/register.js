// 引入数据库的文件
const db = require("../lib/db")
exports.render = function(req, res) {
    // 渲染页面 移入模版
    res.render("register", {})
}

// 提交数据的post
exports.submit = function(req, res) {
    // console.log(req.body);
    const data = req.body;
    // 判断用户名是否重复 如果重复则提示 否则输入
    db.userNameLike(data.username, function(results) {
        // console.log(results);
        if (results.length > 0) {
            res.send("用户名重复");
        } else {
            // 写入数据库
            db.insertUser(data);
            // res.send("写入数据成功");
            // 跳转到登录页面
            res.redirect("/login");
        }
    })


}

// 暴露一个变量出去 以方便调用
// module.exports = register;