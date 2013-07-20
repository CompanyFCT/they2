//CSRF protection!

/**
 * Module dependencies.
 */


var express = require('express')
  , mongoose = require('mongoose')
  , controllers = require('./controllers/index')
  , locals = require('./base/locals').setLocals
  , path = require('path')
  , less = require('less-middleware')
  , app = express();

public_folder = __dirname + '/public';

// global variables
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view options', {});
app.set('view engine', 'jade');
app.set('facebook', {name: 'Plano de Vidas', app_id: '695841343765448', app_secret_id: '9c68237c30a7dbcf234a6055c55d5c86'});

//register middlewares
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.use(express.cookieParser('12345678'));
app.use(express.session({ secret: '123456' }));

app.use(express.methodOverride());
app.use(locals);
app.use(app.router);  
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));


// function checkAuth(req, res, next) {
//   if (!req.session.logged) {
//     res.send({status:404});
//   } else {
//     next();
//   }
// }

//register routes
app.get('/', controllers._);
app.get('/admin', controllers.admin);
app.get('/logout', controllers.logout);

app.post('/login', controllers.login);
app.post('/', controllers._);
app.post('/plan', controllers.plan);


// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
//   // mongoose.connect('mongodb://localhost/buyme');
//   // jbkpp#123
//   // mongoose.connect('mongodb://heroku_app15611687@ds029328.mongolab.com:29328/heroku_app15611687');
//   // mongoose.connect('mongodb://heroku_app15611687:jbkpp#123@ds029328.mongolab.com:29328/heroku_app15611687');
// } 
// else if ('production' == app.get('env')) {
//   mongoose.connect(process.env.MONGOLAB_URI);
// } 

//register and config mongo
var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost/planovida';
mongoose.connect(mongoURI, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + mongoURI + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + mongoURI);
  }
});

// server listening
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
