  //FIXME => CSRF protection!

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

//register routes
app.get('/', controllers._);
app.get('/admin', checkAuth, controllers.admin);
app.get('/logout', controllers.logout);
app.get('/plans', controllers.plans);

app.delete('/users', checkAuth, controllers.delUser);

app.post('/login', controllers.login);
app.post('/', controllers._);
app.post('/plan', controllers.plan);

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.render('admin/index');
  } else {
    next();
  }
}

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
