// 引入数据库
const db = require("../lib/db");
// 文章页
exports.postAdd = function(req, res) {
    // res.send("ddd")
    // 渲染页面
    res.render("post-add");
}

// 提交按钮的操作
/* 
    1 获取用户写的文章
    2 写入数据 需要构造参数 数据都存储在session中
    3 提交后跳转到首页
*/
exports.postSubmit = function(req, res) {
    // 1获取数据
    const data = req.body;
    // 2 构造参数 其为用户的id 和名称
    const user = req.session.user;
    data.name = user.name;
    data.uid = user.id;
    // 添加到数据库中
    db.addPost(data, function(results) {
        // 跳转页面
        res.redirect("/");
    })
}