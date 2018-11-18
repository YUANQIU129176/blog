const mysql = require('mysql');

// 创建nodejs和mysql的连接， 返回一个连接对象
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});
connection.connect();

// 执行sql命令
let query = function(sql) {
    // connection.query执行sql命令
    connection.query(sql, function(error) {
        if (error) throw error;
    });
}

// 用户表结构
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NOT NULL COMMENT '头像',
     moment TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间', 
     PRIMARY KEY ( id )
    );`

// 创建文章页
let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '文章作者',
     title TEXT(0) NOT NULL COMMENT '题目',
     content TEXT(0) NOT NULL COMMENT '内容',
     uid VARCHAR(40) NOT NULL COMMENT '用户id',
     moment TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '发表时间',
     comments VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '文章评论数',
     pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
     PRIMARY KEY(id)
    );`

// 创建用户表
query(users);
query(posts);

// 写入用户的方法
exports.insertUser = (value) => {
        // 执行写入用户的sql
        connection.query(
            `insert into users set name='${value.username}',pass='${value.password}',avator="";`,
            (err, results) => {
                if (err) throw err;
            }
        )
    }
    // 判断用户名是否重复
    // 写入用户的方法 
exports.userNameLike = (name, cb) => {
    // 执行写入用户的sql
    connection.query(
        `select * from users where name='${name}'`,
        // results 为一个数组
        (err, results) => {
            if (err) throw err;
            // 回掉函数
            cb(results);
        }
    )
}


// 用户登录的页面 
exports.findUser = function(data, cb) {
    // 查找用户的用户名和密码
    connection.query(`select * from users where name='${data.username}'and pass='${data.password}'`, (err, results) => {
        if (err) throw err;
        cb(results);
    })
}

// 文章写入页
exports.addPost = function(data, cb) {
    connection.query(
        `insert into posts set name='${data.name}',title='${data.title}',content='${data.content}',uid='${data.uid}'`,
        function(err, results) {
            if (err) throw err;
            cb(results)
        }
    )
}

// 跳转到首页
exports.dumpIndex = function(cb) {
    connection.query(`select * from posts`, (err, results) => {
        if (err) throw err;
        cb(results);
    })
}