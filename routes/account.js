// 引入上传文件模块
const formidable = require("formidable");
// 引入核心模块 路径
const path = require("path");

// 引入自定义模块 数据库
const db = require("../lib/db");
// console.log(formidable);
exports.accountUser = function(req, res) {
        // res.send("进来了");、
        // 1 获取用户信息
        const user = req.session.user
            // console.log(user);
            // 渲染页面
        res.render("account", {
            user: user
        })
    }
    /* 
        需求吧文件路径存储在public里的upload文件夹上
        然后在提交到数据库上更新
        1 获取提交的数据
    */
    //    提交更改个人信息
exports.accountSubmit = function(req, res) {

    // 2 引入模块 解析上传对象
    const form = new formidable.IncomingForm();

    // 2.1带上后缀
    form.keepExtensions = true;

    // 3 设置上传的路径
    form.uploadDir = "./public/upload";

    // 3.1监听解析对象
    form.parse(req, function(err, fields, files) {
        if (err) throw err;

        // 3.1 获取单纯的文件名和后缀
        const fileName = path.basename(files.avator.path);
        // 3.2 拼接传递的参数
        const data = {
                id: req.session.user.id,
                name: fields.username,
                pass: fields.password,
                avator: fileName
            }
            // console.log(data);
            // 4 连接数据库更新数据
        db.updateById(data, function() {
            // 重新更新数据
            db.findUserById(req.session.user.id, function(results) {
                req.session.user = results[0];
                res.redirect("/");

            })
        })

    })
}