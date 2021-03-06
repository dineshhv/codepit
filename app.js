var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cons = require('consolidate');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27018,localhost:27017,localhost:27019/codepit');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018,localhost:27017,localhost:27019/codepit');
var mongoosedb = mongoose.connection;


var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var board = require('./routes/board');

var app = express();

// view engine setup
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'CodepitFramework',
  cookie: { secure: true },
  cookie:{maxAge:6000000}
}))

app.use(function(req,res,next){
    //req.db = db;
    req.db = db;
    // req.mongoosedb = mongoosedb;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/users/adduser', users);
app.use('/users/all', users);
app.use('/users/session', users);
app.use('/users/id', users);
app.use('/users/profile', posts);
app.use('/users/login', users);
app.use('/posts', posts);
app.use('/posts/addPost', posts);
app.use('/posts/addPost2', posts);
// app.use('/posts/all', posts);
app.use('/posts/id', posts);
app.use('/posts/view/alias', posts);
app.use('/posts/viewby/postid', posts);
app.use('/posts/search/query', posts);
app.use('/posts/postid/related/tags/', posts);
app.use('/posts/id/after/dt', posts);
app.use('/posts/id/before/dt', posts);
app.use('/board', board);
app.use('/board/info', board);
app.use('/board/profileImage/update', board);

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