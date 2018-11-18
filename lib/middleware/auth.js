module.exports = function(req, res, next) {
    // 获取来源地址
    const returnUrl = req.originalUrl;
    // 获取用户信息
    const user = req.session.user;
    // 判断用户是否登录了
    if (!user) {
        res.redirect("/login?returnUrl=" + returnUrl);
    } else {
        next();
    }

}