// 引入框架模块
const express = require("express");

// 开启web服务
const app = express();

// 引入第三方模块
const bodyParser = require("body-parser");
// 配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 引入session
const session = require('express-session');
// 配置静态页中间件
app.use(express.static('public'));
// 配置session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// 引入自定义中间件 判断用户是否登录了
const next = require("./lib/middleware/auth");
// 配置模版ejs路由
app.set('view engine', 'ejs');

// 开启首页路由 
// 1 引入自定义模块
const index = require("./routes/index");
app.get("/", index.indexView)
    // 开其注册页路由 渲染的
    // 引入自定义模块
const register = require("./routes/register");
app.get("/register", register.render);
app.post('/register', register.submit);

// 登录页面的渲染
// 引入login.js自定义模块
const login = require("./routes/login");
app.get("/login", login.render);
app.post("/login", login.submit);

// 文章页
const post = require("./routes/post-add");
app.get("/post/add", next, post.postAdd);
app.post("/post/add", post.postSubmit);

// 退出按钮
app.get("/logout", login.loginOut);

// 详情页
app.get("/post/detail/:pid", post.postDetail);

// 编辑
app.get("/post/edit/:pid", next, post.postEdit);
app.post("/post/edit/:pid", post.postEditNew);

// 删除文章数据
app.get("/post/delete/:pid", next, post.postDel);
//开启服务器
app.listen("3010", () => {
    console.log('服务器开启成功');
})