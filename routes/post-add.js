// 引入数据库
const db = require("../lib/db");
const moment = require("moment");
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
    // 祥情页
exports.postDetail = function(req, res) {
    // 1 获取通过路由的方式传递的id值
    const pid = req.params.pid;

    // 1.1添加浏览量
    db.commentsReadNUm(pid, function() {

        // 1.2闲请页面的渲染
        db.PostsDetailId(pid, function(results) {

            // 返回来的数据
            const post = results[0];

            // 获取规范的时间
            post.moment = moment(post.moment).format('YYYY-MM-DD hh:mm:ss');

            // 评论的条数
            db.postCommentId(pid, function(comments) {
                res.render("detail-post", {
                    // 传递的数据
                    value: post,
                    user: req.session.user,
                    comments: comments
                })
            })
        })
    })

}

// 编辑页面的实现
/* 
    1.接收传递过来的pid 查询数据库 
    2.把数据返回来 同时渲染页面
*/
exports.postEdit = function(req, res) {
        const pid = req.params.pid;

        // 2调用写入数据库
        db.postEdit(pid, function(results) {
            // console.log(results);
            res.render("edit", {
                value: results[0]
            })
        })
    }
    // 确认修改的按钮 也就是提交修改
exports.postEditNew = function(req, res) {
    // 获取提交的数据
    const data = req.body;
    // console.log(data);
    // 2 添加传递过来的id值
    data.id = req.params.pid;
    // console.log(data);
    // 3 修改数据库中的数据
    db.updateEdit(data, function(results) {
        // 4完成后 跳转页面
        res.redirect("/");
    })
}

// 删除按钮的实现
exports.postDel = function(req, res) {
    // const pid = req.params.pid;  
    db.deletePostById(pid, function(results) {
        res.redirect("back");
    })
}