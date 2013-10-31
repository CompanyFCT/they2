  //FIXME => CSRF protection!

var express = require('express')
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

// app.use(express.cookieParser(uuid.v1()));
// app.use(express.session({ secret: uuid.v1() }));
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(locals);
app.use(app.router);  
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// admin's routes
// app.get('/admin', controllers.index);
// app.get('/admin/main', checkAuth, controllers.main);
// app.get('/admin/logout', checkAuth, controllers.logout);
// app.post('/admin/login', controllers.login);
// app.delete('/admin/users', checkAuth, controllers.delUser);

//main routes
app.get('/', controllers._);
app.post('/', controllers._);//facebook needs..
// app.post('/plan', controllers.plan);
// app.get('/plans', controllers.plans);

// function checkAuth(req, res, next) {
//   !req.session.user_id ? res.render('admin/index', {error:false}) : next();
// }

// //register and config mongo
// var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost/planovida';
// mongoose.connect(mongoURI, function (err, res) {
//   if (err) { 
//     console.log ('ERROR connecting to: ' + mongoURI + '. ' + err);
//   } else {
//     console.log ('Succeeded connected to: ' + mongoURI);
//   }
// });

// server listening
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
