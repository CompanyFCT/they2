
/*
 * GET home page.
 */

var User = require('../models/user.js');

// var username='xtchamps';
// var pass='morloke!@1513#';

exports._ = function(req, res){
  res.render('index');
};

exports.plan = function(req, res){
  // validations
  var json = {
    name: req.body.name.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ').toUpperCase(), //fulltrim
    email: req.body.email,
    phone: req.body.phone
  };
  
  new User(json).save(function (errSave) {
    if (errSave){
      console.log ('Error on save!' + errSave); 
      res.send({code:500});
    }else{
      res.send({code:200});
    }
  });
};

exports.admin = function(req, res){
  if(req.session.logged){
    users(function(docs){
      res.render('admin', { response: docs, logged: true });
    });
  }else{
    res.render('admin');
  }
};

exports.login = function(req, res){
  if(req.body.user=='admin' && req.body.pass=='123456'){
    req.session.logged=true;
    res.send({});
  }else{
    res.send({status:404});
  }
};

//used like callback to retrieve user data
function users(cb){
  User.find(function(err,docs){ /* docs.length==0 => handle */
    if(err){ /* handle errors! */ }
    cb(docs);
  });
}