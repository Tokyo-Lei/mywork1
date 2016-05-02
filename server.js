var express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    storage = require('lowdb/file-sync'),
    low = require('lowdb'),
    db = low('db.json', {storage: storage});

var app = express();

// app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/" + "login.html");
});

app.post('/register', function (req, res) {
    if (req.body.password !== req.body.again_password) {
        res.send({status: 0, msg: '两次密码不一致'});
        return;
    }
    var user = db('users').find({account:req.body.account});
    if (user) {
        res.send({status:0,msg:'改用户名已存在'});
        return;
    }
    delete(req.body.again_password);
    db('users').push(req.body);
    var user = db('users').find({account:req.body.account,password:req.body.password});
    if (user) {
        res.send({status:1,msg:'注册成功'});
    }
    else {
        res.send({status:0,msg:'注册失败'});
    }
});

app.post('/login', function (req, res) {
    var user = db('users').find({account:req.body.account,password:req.body.password});
    if (user) {
        res.send({status:1,msg:'登陆成功'});
    }
    else {
        res.send({status:0,msg:'用户名或者密码错误'});
    }
});

app.get('/post',function (req, res) {
    var posts = db('posts').chain().sortBy('date').reverse().value();
    if(posts) {
        res.send({status:1,data:posts});
    }
    else {
        res.send({status:0,data:null});
    }
});

app.post('/blog',function (req, res) {
    db('posts').push({
        title : req.body.title,
        content: req.body.content,
        date: new Date(),
        comment:0
    });
    var post = db('posts').find(req.body);
    if (post) {
        res.send({status:1,msg:'发表成功',data:post});
    }
    else {
        res.send({status:0,msg:'发表失败'});
    }
});

var server = app.listen(8081, function () {
    console.log('服务器已在启动！端口： 8081');
});