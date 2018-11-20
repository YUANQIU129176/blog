const db = require("../lib/db");
exports.commentPost = function(req, res) {
    // 构造参数
    let data = {
        uid: req.session.user.id,
        name: req.session.user.name,
        content: req.body.content,
        // 怎么获取postid
        postid: req.params.pid
    }
    db.insertComment(data, function(results) {
        // 评论的条数
        db.commentNum(req.params.pid, function() {
            // console.log(data);
            res.redirect("back");
        })

    })
}