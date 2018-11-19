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

let comment =
    `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     uid VARCHAR(40) NOT NULL COMMENT '用户id',
     name VARCHAR(100) NOT NULL COMMENT '用户名称',
     content TEXT(0) NOT NULL COMMENT '评论内容',
     moment TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '评论时间',
     postid VARCHAR(40) NOT NULL COMMENT '文章id',
     PRIMARY KEY(id) 
    );`

// 创建用户表
query(users);
query(posts);
query(comment);

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


// 分页逻辑
/* 
    page:第几页
    start：从第几页开始分页
    size：每页有多少条数据
    关系为 start = （page-1）* size
    limit语法为select * from posts limit m,n
    其中m是指记录开始的index，从0开始，表示第一条记录 
    m为从第几页开始 n 为每页有多少条数据

*/
exports.findPostByPage = (page = 1, cb) => {
    connection.query(`select * from posts limit ${(page-1)*5},5;`, function(err, results) {
        if (err) throw err;
        cb(results);
    })
}

// 实现页面信息的总条数
exports.PostsCount = function(cb) {
    connection.query(`select count(*) as count from posts`, function(err, results) {
        if (err) throw err;
        cb(results);
    })

}

// 详情页查询数据库
exports.PostsDetailId = function(id, cb) {
    connection.query(`select * from posts where id=${id}`, function(err, results) {
        if (err) throw err;
        cb(results);
    })

}

// 编辑页面
exports.postEdit = function(id, cb) {
        connection.query(`select * from posts where id = '${id}'`, (err, results) => {
            if (err) throw err;
            cb(results);
        })
    }
    // 编辑提交时更新数据库的数据
exports.updateEdit = function(data, cb) {
    connection.query(`update posts set title='${data.title}',content='${data.content}' where id=${data.id}`, (err, results) => {
        if (err) throw error;
        cb(results);
    })
}

// 删除数据
exports.deletePostById = (id, cb) => {
    connection.query(
        `delete from posts where id=${id}`,
        function(err, results) {
            if (err) throw err;
            cb(results);
        }
    )
}

//添加数据（拼论）
exports.insertComment = function(data, cb) {
    // 添加sql语句
    connection.query(
        `insert into comment set uid='${data.uid}',name='${data.name}',content='${data.content}',postid='${data.postid}'`,
        function(err, results) {
            if (err) throw err;
            cb(results)
        }
    )
}

// 根据传递过来的id值查询相对应的数据
exports.postCommentId = function(id, cb) {
    connection.query(`select * from comment where postid='${id}'`, function(err, results) {
        if (err) throw err;
        cb(results);
    })
}