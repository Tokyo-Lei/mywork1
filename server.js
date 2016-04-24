/**
 * Created by wjs on 2016/4/22.
 */
var express = require ('express');
var bodyParser = require('body-parser');
var low = require('lowdb');
var storage = require('lowdb/file-sync');
var db = low('db.json',{ storage: storage });
var app = express();



// app.use(express.static('public'));   // 开发环境
app.use(express.static('dist'));    // 线上环境
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res) {
    res.sendFile(__dirname+ "/public/" + "login.html");
});

app.post('/register',function (req,res) {
    if (req.body.password !== req.body.again_password) {
        res.send({status:0,msg:'两次密码不一致'});
        return;
    }
    var user = db('users').find({account:req.body.account});
    if (user) {
        res.send({status: 0,msg:'该用户名已被用过'});
        return;
    }

    delete req.body.again_password;
    db('users').push(req.body);
    var user = db('users').find({account:req.body.account,password:req.body.password});
    if (user) {
        res.send({status: 1,msg:'注册成功',data:user});
    }
    else {
        res.send({status:0,msg:'注册失败'});
    }
    res.end();
});
app.post('/login',function (req, res) {
    var user = db('users').find({account:req.body.account,password:req.body.password});
    if (user) {
        res.send({status: 1, msg: '登陆成功！'});
    } else {
        user = db('users').find({account:req.body.account});
        if (user) {
            res.send({status: 0, msg: '密码错误！'});
        } else {
            res.send({status: -1, msg: '该用户不存在！'});
        }
    }
    res.end();
});

app.listen(8081,function () {
    console.log('服务器已在启动！端口： 8081');
});