const db = require("../lib/db");
let returnUrl;
exports.render = function(req, res) {
    // 获取url的returnUrl参数
    returnUrl = req.query.returnUrl;
    res.render("login", {});
}

// 登录页面
exports.submit = function(req, res) {
    // 发送提交的数据
    const data = req.body;
    // 引入登录的函数方法
    db.findUser(data, function(results) {
        // console.log(results);
        if (results.length > 0) {
            // 把session数据写入
            req.session.user = results[0];
            // 如果url上存在returnUrl， 那就跳转到该页面
            if (returnUrl) {
                res.redirect(returnUrl);
            } else {
                res.redirect("/");
            }
        } else {
            res.send("用户名不存在或没注册");
        }
    })
}

// 退出功能
exports.loginOut = function(req, res) {
    // 1 当点退出时 删除session信息 
    req.session.destroy(function(err) {
            if (err) throw err;
        })
        // 2 跳转到首页
    res.redirect("/");
}