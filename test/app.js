var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/readfile', (req, response) => {
    // fs.readFile('C:/Users/yiqiu.guan/Desktop/huifu/各种网址(1).txt', 'utf8', function(err, data) {
    fs.readFile(req.query.url, 'utf8', function(err, data) {
        if (err) {
            console.log('err0', err)
        } else {
            // response.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
            //str=fs.readFileSync('json.txt');//读取文件内容
            console.log('data', data)
            response.send(data);
            response.end();
        }
    })
    // 追加文件， 写入文件会直接覆盖原文件,使用\n换行（\r回车）
    // fs.appendFile(req.query.url, 'HelloWorld\nHelloWorld2', function(err) {
    //     if (err) {
    //         throw err;
    //     }
    // })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
