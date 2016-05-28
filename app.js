var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new RedisStore(),
  secret: 'sunfeng love panpan', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 20*60 * 1000 }
})).use(check)



app.use('/', routes);
app.use('/users', users);

function check(req,res,next){
  var user=req.session.user
  res.locals.checkUser=user?1:0
  res.locals.user=user
  //console.log(res.locals.checkUser)
  next()
}

function setCookie(req,res){
   if (req.cookies.isVisit) {
      console.log(req.cookies);
      console.log(req.signedCookies);
      res.send("再次欢迎访问");
    } else {
      res.cookie('isVisit', 1, {maxAge: 60 * 1000,httpOnly:true});
      res.send("欢迎第一次访问");
    }
}
function setSession(req,res){
  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if(req.session.isVisit) {
    req.session.isVisit++;
    //console.log(req.session)
    res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
    console.log(req.session);

    
  } else {
    req.session.isVisit = 1;
    req.session.name='孙峰'
    req.session.password='sf123'
    res.send("欢迎第一次来这里");
    console.log(req.session);

  }
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
